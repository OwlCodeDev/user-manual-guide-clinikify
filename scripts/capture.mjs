#!/usr/bin/env node
/**
 * Captura automatizada dos prints do manual do Clinikify.
 *
 * Pré-requisitos (ver scripts/README.md):
 *   1. Stack do Clinikify no ar (docker + API em :3001 + web em :4200).
 *      A API precisa do storage real p/ thumbnails de exames:
 *      STORAGE_DRIVER=s3 S3_SSE=none AUDIT_S3_BUCKET=clinikify-audit-dev
 *   2. Tenants semeados:
 *      - Vitalis:      pnpm --filter @clinikify/api seed:demo:vitalis
 *      - clinica-demo: pnpm --filter @clinikify/api seed:demo   (fidelity)
 *      - demo-vet:     tenant veterinário com produtos vendáveis (PDV)
 *   3. Navegador instalado:   npm run install:browser   (dentro de scripts/)
 *
 * Uso:
 *   node capture.mjs                # tudo
 *   node capture.mjs estoque pdv    # só os grupos citados
 *
 * Grupos: publico vitalis agenda-faturar permissoes estoque assistente
 *         profissional pep comunicacao pdv portal signup
 *
 * Variáveis de ambiente (opcionais):
 *   WEB_URL      http://localhost:4200
 *   API_URL      http://localhost:3001
 *   MAILHOG_URL  http://localhost:8025
 *
 * Filosofia: cada print é independente. Se um falhar (modal mudou de
 * lugar, rota vazia etc.), registramos o erro e seguimos — o manual
 * simplesmente mostra "Print pendente" para aquele.
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.resolve(__dirname, '..', 'assets', 'images');

const WEB_URL = process.env.WEB_URL ?? 'http://localhost:4200';
const API_URL = process.env.API_URL ?? 'http://localhost:3001';
const MAILHOG_URL = process.env.MAILHOG_URL ?? 'http://localhost:8025';

/** Contas por tenant (senhas padrão dos seeds — dev only). */
const VITALIS = {
  admin: 'admin@vitalisdemo.com.br',
  doctor: 'dra.renata@vitalisdemo.com.br',
  password: 'SenhaForte#2026',
};
const DEMO = {
  doctor: 'dentista@demo.com.br',
  reception: 'recepcao@demo.com.br',
  password: 'ClinikifyDemo#2026!',
  slug: 'clinica-demo',
};
const VET = { admin: 'vet@demo.com.br', password: 'ClinikifyDemo#2026!' };

const VIEWPORT = { width: 1440, height: 900 };

const C = { ok: '\x1b[32m✓\x1b[0m', err: '\x1b[31m✗\x1b[0m', step: '\x1b[36m▸\x1b[0m' };
let okCount = 0;
let failCount = 0;

const ONLY = process.argv.slice(2);
function groupEnabled(name) {
  return ONLY.length === 0 || ONLY.includes(name);
}

function dest(rel) {
  const p = path.join(IMAGES_DIR, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  return p;
}

async function shoot(page, rel, { settle = 800 } = {}) {
  await page.waitForTimeout(settle);
  await page.screenshot({ path: dest(rel), fullPage: false });
  okCount++;
  console.log(`  ${C.ok} ${rel}`);
}

/** Navega para uma rota do app e tira o print. Retorna true se ok. */
async function capture(page, route, rel, opts = {}) {
  try {
    if (route) {
      await page.goto(`${WEB_URL}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
    }
    if (opts.before) await opts.before(page);
    await shoot(page, rel, opts);
    return true;
  } catch (e) {
    failCount++;
    console.log(`  ${C.err} ${rel}  (${route ?? 'fluxo'}) — ${e.message.split('\n')[0]}`);
    return false;
  }
}

async function login(page, email, password) {
  await page.goto(`${WEB_URL}/login`, { waitUntil: 'networkidle' });
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-submit').click();
  // Conta multi-clínica → picker de tenant.
  const picker = page.locator('[data-testid^="login-tenant-option-"]').first();
  await Promise.race([
    page.waitForURL('**/app/**', { timeout: 30000 }),
    picker.waitFor({ timeout: 30000 }).then(async () => {
      await picker.click();
      await page.waitForURL('**/app/**', { timeout: 30000 });
    }),
  ]).catch(() => {});
  await page.waitForTimeout(1500);
}

/** Encerra a sessão atual (cookies) antes de logar outra conta/tenant. */
async function resetSession(context, page) {
  await context.clearCookies();
  await page.goto(`${WEB_URL}/login`, { waitUntil: 'networkidle' }).catch(() => {});
}

/** Clica no primeiro item clicável de uma lista (linha de tabela/card). */
async function clickFirstRow(page, selectors) {
  for (const sel of selectors) {
    const el = page.locator(sel).first();
    if (await el.count()) {
      await el.click();
      await page.waitForTimeout(1200);
      return true;
    }
  }
  return false;
}

/** Tenta abrir um modal de "novo/criar" clicando num botão por texto. */
async function clickButtonByText(page, texts) {
  for (const t of texts) {
    const btn = page.getByRole('button', { name: new RegExp(t, 'i') }).first();
    if (await btn.count()) {
      await btn.click();
      await page.waitForTimeout(1000);
      return true;
    }
  }
  return false;
}

/**
 * Abre o hub de um paciente pela lista (busca por nome, clica na 1ª linha)
 * e espera o hub montar.
 */
async function openPatientHub(page, name) {
  await page.goto(`${WEB_URL}/app/pacientes`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.getByTestId('patients-search').fill(name);
  await page.waitForTimeout(900);
  await page.locator('[data-testid^="patient-row-"]').first().click();
  await page.waitForURL(/\/app\/pacientes\/[0-9a-f-]{36}/, { timeout: 15000 });
  await page.waitForTimeout(1200);
}

// ── API helpers (dados dinâmicos do seed) ────────────────────────────

async function api(method, route, { token, body } = {}) {
  const res = await fetch(`${API_URL}${route}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function apiLogin(email, password, tenantSlug) {
  const body = await api('POST', '/auth/login', { body: { email, password, tenantSlug } });
  if (!body.accessToken) throw new Error(`login API falhou p/ ${email}`);
  return body.accessToken;
}

/** CPF + nascimento da paciente-fixture (o seed gera CPFs aleatórios).
 *  A API não tem busca server-side — lista e filtra por nome aqui. */
async function patientIdentifiers(name) {
  const token = await apiLogin(DEMO.doctor, DEMO.password, DEMO.slug);
  const list = await api('GET', '/patients?limit=100', { token });
  const hit = (list.items ?? list).find((p) => p.fullName?.includes(name));
  if (!hit) throw new Error(`paciente "${name}" não encontrado no seed`);
  const full = await api('GET', `/patients/${hit.id}`, { token });
  return { cpf: full.cpf, birthDate: full.birthDate };
}

// ── MailHog ──────────────────────────────────────────────────────────

async function mailhogClear() {
  await fetch(`${MAILHOG_URL}/api/v1/messages`, { method: 'DELETE' }).catch(() => {});
}

/**
 * Última mensagem do MailHog para um destinatário (corpo decodificado do
 * quoted-printable — o suficiente p/ extrair códigos e links). Faz poll
 * por até `timeoutMs`.
 */
async function mailhogLatestBody(rcpt, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const res = await fetch(`${MAILHOG_URL}/api/v2/messages?limit=20`);
    const data = await res.json();
    for (const item of data.items ?? []) {
      const to = (item.To ?? []).map((t) => `${t.Mailbox}@${t.Domain}`).join(',');
      if (!rcpt || to.includes(rcpt)) {
        return (item.Content?.Body ?? '')
          .replace(/=\r?\n/g, '')
          .replace(/=([0-9A-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
      }
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return '';
}

async function main() {
  console.log(`\n  Clinikify · captura de prints`);
  console.log(`  WEB_URL=${WEB_URL}\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // prints nítidos (retina)
    locale: 'pt-BR',
  });
  // Pré-abre as seções acordeão do hub do paciente (estado em localStorage).
  await context.addInitScript(() => {
    try {
      localStorage.setItem('clinikify:pep-hub:section:exams', '1');
      localStorage.setItem('clinikify:pep-hub:section:plans', '1');
      localStorage.setItem('clinikify:pep-hub:section:recalls', '1');
    } catch {}
  });
  const page = await context.newPage();

  // --- Telas públicas -----------------------------------------------------
  if (groupEnabled('publico')) {
    console.log(`${C.step} Telas públicas`);
    await capture(page, '/login', 'acesso/login.png');
    await capture(page, '/cadastro', 'acesso/cadastro-wizard.png');
  }

  // --- Vitalis · ADMIN ----------------------------------------------------
  if (groupEnabled('vitalis')) {
    console.log(`${C.step} Login Vitalis ADMIN (${VITALIS.admin})`);
    await resetSession(context, page);
    await login(page, VITALIS.admin, VITALIS.password);

    await capture(page, '/app/inicio', 'acesso/dashboard-visao-geral.png');
    await capture(page, '/app/agenda', 'agenda/agenda-visao-geral.png');
    await capture(page, '/app/agenda', 'agenda/agenda-nova-consulta.png', {
      before: async (p) => {
        const fab = p.getByTestId('agenda-fab');
        if (await fab.count()) {
          await fab.click();
          await p.waitForTimeout(1000);
        } else {
          await clickButtonByText(p, ['nova consulta', 'novo agendamento', 'agendar', 'adicionar']);
        }
      },
    });

    await capture(page, '/app/pacientes', 'pacientes/pacientes-lista.png', {
      before: (p) => p.getByTestId('patients-search').waitFor({ timeout: 10000 }),
    });
    await capture(page, '/app/pacientes', 'pacientes/pacientes-novo.png', {
      before: (p) => clickButtonByText(p, ['novo paciente', 'adicionar paciente', 'novo', 'cadastrar']),
    });

    await capture(page, '/app/retornos', 'retornos/retornos-lista.png');

    await capture(page, '/app/faturamento', 'faturamento/faturamento-painel.png');
    await capture(page, '/app/faturamento/repasses', 'faturamento/repasses-lista.png');

    // Configurações
    await capture(page, '/app/configuracoes', 'configuracoes/configuracoes-visao.png');
    await capture(page, '/app/configuracoes/perfil', 'configuracoes/perfil-clinica.png');
    await capture(page, '/app/configuracoes/marca-da-clinica', 'configuracoes/marca-clinica.png');
    await capture(page, '/app/configuracoes/servicos', 'configuracoes/servicos-lista.png');
    await capture(page, '/app/configuracoes/servicos', 'configuracoes/servico-novo.png', {
      before: (p) => clickButtonByText(p, ['novo serviço', 'adicionar serviço', 'novo', 'adicionar']),
    });
    await capture(page, '/app/configuracoes/modelos-prontuario', 'configuracoes/modelos-prontuario.png');
    await capture(page, '/app/configuracoes/membros', 'configuracoes/membros-lista.png');
    await capture(page, '/app/configuracoes/membros', 'configuracoes/membro-convidar.png', {
      before: (p) => clickButtonByText(p, ['convidar', 'novo membro', 'adicionar']),
    });
    await capture(page, '/app/configuracoes/faturamento', 'configuracoes/faturamento-config.png');
    // Taxas de maquininha (card no fim da mesma página; Vitalis não tem
    // taxas semeadas, então o print sai do clinica-demo — grupo pep).
    await capture(page, '/app/configuracoes/profissionais', 'configuracoes/profissionais-lista.png');
    await capture(page, '/app/configuracoes/profissionais', 'configuracoes/profissional-detalhe.png', {
      before: (p) =>
        clickFirstRow(p, ['table tbody tr', '[role="row"]', 'a[href*="/profissionais/"]', 'li button', '.lista-item']),
    });
    await capture(page, '/app/configuracoes/convenios', 'configuracoes/convenios-lista.png');
    await capture(page, '/app/configuracoes/convenios', 'configuracoes/convenio-detalhe.png', {
      before: (p) =>
        clickFirstRow(p, ['table tbody tr', '[role="row"]', 'a[href*="/convenios/"]', 'li button', '.lista-item']),
    });
  }

  // --- Vitalis · agenda "Concluir e faturar" ------------------------------
  if (groupEnabled('agenda-faturar')) {
    console.log(`${C.step} Agenda → Concluir e faturar (Vitalis ADMIN)`);
    await resetSession(context, page);
    await login(page, VITALIS.admin, VITALIS.password);

    await capture(page, '/app/agenda', 'agenda/agenda-faturar.png', {
      before: async (p) => {
        // Só agendamentos `confirmed` mostram o botão Concluir; tenta os
        // primeiros cards da grade até achar um.
        const cards = p.locator('button.appointment-card, .appointment-card button, .appointment-card');
        await cards.first().waitFor({ timeout: 10000 });
        const n = Math.min(await cards.count(), 8);
        for (let i = 0; i < n; i++) {
          await cards.nth(i).click();
          const drawer = p.locator('clinikify-appointment-detail-drawer');
          await drawer.waitFor({ timeout: 8000 });
          await p.waitForTimeout(800); // body do drawer carrega async
          const concluir = drawer.locator('button:text-is("Concluir")');
          if (await concluir.count()) {
            await concluir.click();
            await p.locator('clinikify-invoicing-drawer').waitFor({ timeout: 10000 });
            await p.waitForTimeout(1200); // skeleton do billing-context
            return;
          }
          await p.keyboard.press('Escape');
          await drawer.waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
        }
        throw new Error('nenhum agendamento `confirmed` na grade visível');
      },
    });
  }

  // --- Vitalis · permissões ----------------------------------------------
  if (groupEnabled('permissoes')) {
    console.log(`${C.step} Permissões (Vitalis ADMIN)`);
    await resetSession(context, page);
    await login(page, VITALIS.admin, VITALIS.password);

    await capture(page, '/app/configuracoes/permissoes', 'configuracoes/permissoes-usuario.png', {
      before: async (p) => {
        const select = p.getByTestId('permissions-user-select');
        await select.waitFor({ timeout: 10000 });
        await select.selectOption({ index: 1 });
        await p.locator('[data-testid^="permissions-toggle-"]').first().waitFor({ timeout: 10000 });
        await p.waitForTimeout(400);
      },
    });
  }

  // --- Vitalis · estoque --------------------------------------------------
  if (groupEnabled('estoque')) {
    console.log(`${C.step} Estoque (Vitalis ADMIN)`);
    await resetSession(context, page);
    await login(page, VITALIS.admin, VITALIS.password);

    await capture(page, '/app/estoque', 'estoque/estoque-lista.png', {
      before: (p) => p.locator('[data-testid^="inventory-row-"]').first().waitFor({ timeout: 10000 }),
    });
    await capture(page, '/app/estoque', 'estoque/estoque-novo-item.png', {
      before: async (p) => {
        await p.getByTestId('inventory-create-button').click();
        await p.locator('clinikify-inventory-item-drawer').waitFor({ timeout: 10000 });
        await p.getByTestId('inventory-item-name-input').fill('Máscara cirúrgica PFF2');
        await p.getByTestId('inventory-item-barcode').fill('7891234500017');
        await p.waitForTimeout(400);
      },
    });
    await capture(page, '/app/estoque', 'estoque/estoque-movimentacao.png', {
      before: async (p) => {
        await p.getByTestId('inventory-new-movement-button').click();
        const drawer = p.locator('clinikify-inventory-movement-drawer');
        await drawer.waitFor({ timeout: 10000 });
        await p.getByTestId('inventory-movement-item-select').selectOption({ index: 1 });
        await p.getByTestId('inventory-movement-qty-input').fill('10').catch(() => {});
        await p.waitForTimeout(400);
      },
    });
  }

  // --- Vitalis · assistente + pontos de contato ---------------------------
  if (groupEnabled('assistente')) {
    console.log(`${C.step} Assistente + pontos de contato (Vitalis ADMIN)`);
    await resetSession(context, page);
    await login(page, VITALIS.admin, VITALIS.password);

    await capture(page, '/app/agenda', 'primeiros-passos/assistente-painel.png', {
      before: async (p) => {
        await p.getByTestId('topbar-assistant').click();
        await p.locator('clinikify-copilot-drawer').waitFor({ timeout: 10000 });
        await p.waitForTimeout(800);
      },
    });

    // "Pontos de contato do paciente" = cards de link + QR no Perfil.
    await capture(page, '/app/configuracoes/perfil', 'portal-do-paciente/portal-visao-geral.png', {
      before: async (p) => {
        const link = p.getByTestId('booking-link-url');
        await link.waitFor({ timeout: 10000 });
        await link.scrollIntoViewIfNeeded();
        await p.waitForTimeout(500);
      },
    });
  }

  // --- Vitalis · PROFISSIONAL --------------------------------------------
  if (groupEnabled('profissional')) {
    console.log(`${C.step} Login Vitalis PROFISSIONAL (${VITALIS.doctor})`);
    await resetSession(context, page);
    await login(page, VITALIS.doctor, VITALIS.password);

    await capture(page, '/app/meus-repasses', 'profissional/meus-repasses.png');
    await capture(page, '/app/meu-certificado', 'profissional/meu-certificado.png');
    await capture(page, '/app/meus-documentos', 'profissional/meus-documentos.png');
  }

  // --- clinica-demo · DOCTOR (prontuário rico) ----------------------------
  if (groupEnabled('pep')) {
    console.log(`${C.step} Login clinica-demo DOCTOR (${DEMO.doctor})`);
    await resetSession(context, page);
    await login(page, DEMO.doctor, DEMO.password);

    // Hub da Maria Souza: visão geral do prontuário.
    await capture(page, null, 'pacientes/prontuario-visao.png', {
      before: async (p) => {
        await openPatientHub(p, 'Maria');
      },
    });

    // Anamnese na linha do tempo (entrada com chip "Paciente").
    await capture(page, null, 'pacientes/anamnese-timeline.png', {
      before: async (p) => {
        await p.locator('[data-testid^="pep-timeline-intake-"]').first().click();
        await p.getByTestId('pep-intake-view-close').waitFor({ timeout: 10000 });
        await p.waitForTimeout(600);
      },
    });

    // Seção de exames com thumbnail.
    await capture(page, null, 'pacientes/exames-secao.png', {
      before: async (p) => {
        await openPatientHub(p, 'Maria');
        const thumb = p.locator('[data-testid^="patient-exam-thumb-"]').first();
        await thumb.scrollIntoViewIfNeeded();
        await thumb.waitFor({ timeout: 15000 });
      },
    });

    // Editor de evolução (SOAP preenchido, sem salvar).
    await capture(page, null, 'pacientes/nota-clinica-editor.png', {
      before: async (p) => {
        await openPatientHub(p, 'Maria');
        await p.getByRole('button', { name: 'Nova evolução' }).first().click();
        await p.locator('clinikify-pep-soap-form textarea').first().waitFor({ timeout: 10000 });
        const boxes = p.locator('clinikify-pep-soap-form textarea');
        const samples = [
          'Paciente relata sensibilidade ao frio no dente 26 há uma semana.',
          'Exame clínico: restauração antiga com infiltração na face oclusal do 26.',
          'Cárie secundária sob restauração — indicada substituição.',
          'Substituição da restauração agendada; orientada higiene com fio dental.',
        ];
        const n = Math.min(await boxes.count(), samples.length);
        for (let i = 0; i < n; i++) await boxes.nth(i).fill(samples[i]);
        await p.waitForTimeout(400);
      },
    });

    // Plano de tratamento (drawer do plano assinado da Maria).
    await capture(page, null, 'pacientes/plano-tratamento.png', {
      before: async (p) => {
        await openPatientHub(p, 'Maria');
        await p.getByRole('button', { name: /Plano assinado/ }).first().click();
        await p.locator('.clinikify-drawer-pane').waitFor({ timeout: 10000 });
        await p.waitForTimeout(1000);
      },
    });

    // Evidência da assinatura eletrônica (mesmo drawer, rolado até o card).
    await capture(page, null, 'portal-do-paciente/assinatura-evidencia.png', {
      before: async (p) => {
        const ev = p.getByTestId('signature-evidence');
        await ev.scrollIntoViewIfNeeded();
        await ev.waitFor({ timeout: 10000 });
        await p.waitForTimeout(400);
      },
    });

    // Odontograma central (área do paciente — Ana Costa): mapa + histórico.
    await capture(page, null, 'pacientes/odontograma.png', {
      before: async (p) => {
        await openPatientHub(p, 'Ana');
        await p.waitForURL(/\/app\/pacientes\/[0-9a-f-]{36}/, { timeout: 10000 });
        const url = new URL(p.url());
        await p.goto(`${url.origin}${url.pathname.replace(/\/$/, '')}/odontograma`, {
          waitUntil: 'networkidle',
        });
        await p.locator('clinikify-odontogram-panel .odontogram-svg svg').first().waitFor({ timeout: 15000 });
        await p.waitForTimeout(500);
      },
    });

    // Odontograma na evolução assinada: "Esta consulta" × "Boca completa".
    await capture(page, null, 'pacientes/odontograma-evolucao.png', {
      before: async (p) => {
        await openPatientHub(p, 'Ana');
        await p.locator('clinikify-pep-timeline li button:has-text("Template")').first().click();
        await p.waitForURL(/\/prontuario\/[0-9a-f-]{36}/, { timeout: 10000 });
        const scope = p.getByTestId('template-odontogram-scope');
        await scope.waitFor({ timeout: 15000 });
        await scope.scrollIntoViewIfNeeded();
        await p.waitForTimeout(500);
      },
    });

    // Gerar link de assinatura (plano em proposta da Ana Costa).
    await capture(page, null, 'portal-do-paciente/assinatura-gerar-link.png', {
      before: async (p) => {
        await openPatientHub(p, 'Ana');
        await p.getByRole('button', { name: /Plano em proposta/ }).first().click();
        await p.locator('.clinikify-drawer-pane').waitFor({ timeout: 10000 });
        const gen = p.getByTestId('signature-generate');
        await gen.scrollIntoViewIfNeeded();
        await gen.click();
        await p.getByTestId('signature-link').waitFor({ timeout: 15000 });
        await p.waitForTimeout(400);
      },
    });
  }

  // --- clinica-demo · ADMIN (comunicação) ---------------------------------
  // Admin (não recepção): a recepção não lê evoluções e o hub mostra um
  // banner de erro atrás do drawer, que sujaria o print.
  if (groupEnabled('comunicacao')) {
    console.log(`${C.step} Login clinica-demo ADMIN (admin@demo.com.br)`);
    await resetSession(context, page);
    await login(page, 'admin@demo.com.br', DEMO.password);
    // Taxas de maquininha (clinica-demo tem 5 faixas semeadas).
    await capture(page, '/app/configuracoes/faturamento', 'configuracoes/taxas-maquininha.png', {
      before: async (p) => {
        const card = p.getByTestId('card-fee-rules');
        await card.waitFor({ timeout: 15000 });
        await card.scrollIntoViewIfNeeded();
        await p.waitForTimeout(400);
      },
    });

    await capture(page, null, 'portal-do-paciente/comunicacao-status.png', {
      before: async (p) => {
        await openPatientHub(p, 'Maria');
        await p.getByTestId('patient-view-button').click();
        const section = p.getByTestId('patient-view-communication-section');
        await section.waitFor({ timeout: 10000 });
        await section.scrollIntoViewIfNeeded();
        await p.waitForTimeout(500);
      },
    });
  }

  // --- demo-vet · PDV -----------------------------------------------------
  if (groupEnabled('pdv')) {
    console.log(`${C.step} Login demo-vet (${VET.admin})`);
    await resetSession(context, page);
    await login(page, VET.admin, VET.password);

    await capture(page, '/app/loja/pdv', 'estoque/loja-pdv.png', {
      before: async (p) => {
        const scan = p.getByTestId('pos-scan-input');
        await scan.waitFor({ timeout: 10000 });
        for (const barcode of ['7899876543210', '7891234567895']) {
          await scan.fill(barcode);
          await scan.press('Enter');
          await p.waitForTimeout(800);
        }
        await p.locator('[data-testid^="pos-cart-line-"]').first().waitFor({ timeout: 10000 });
        await p.waitForTimeout(400);
      },
    });
  }

  // --- Portal público + portal autenticado do paciente --------------------
  if (groupEnabled('portal')) {
    console.log(`${C.step} Portal do paciente (público + autenticado)`);
    await resetSession(context, page);

    // Agendamento online público.
    await capture(page, `/agendar/${DEMO.slug}`, 'portal-do-paciente/agendamento-online.png', {
      before: async (p) => {
        const service = p.getByTestId('public-booking-service');
        await service.waitFor({ timeout: 15000 });
        await service.selectOption({ index: 1 }).catch(() => {});
        await p.waitForTimeout(800);
        await p
          .getByTestId('public-booking-professional')
          .selectOption({ index: 1 })
          .catch(() => {});
        await p.waitForTimeout(1200);
      },
    });

    // Portal autenticado: CPF + nascimento → código no MailHog → home.
    try {
      const maria = await patientIdentifiers('Maria Souza');
      await mailhogClear();
      await capture(page, null, 'portal-do-paciente/portal-autenticado-home.png', {
        before: async (p) => {
          await p.goto(`${WEB_URL}/portal/${DEMO.slug}/entrar`, { waitUntil: 'networkidle' });
          await p.getByTestId('portal-login-cpf').fill(maria.cpf);
          await p.getByTestId('portal-login-birthdate').fill(maria.birthDate);
          await p.getByTestId('portal-login-send').click();
          await p.getByTestId('portal-login-code-form').waitFor({ timeout: 10000 });
          const body = await mailhogLatestBody(null, 20000);
          const code = /\b(\d{6})\b/.exec(body)?.[1];
          if (!code) throw new Error('código OTP não chegou no MailHog');
          await p.getByTestId('portal-login-code').fill(code);
          await p.getByTestId('portal-login-verify').click();
          await p.getByTestId('portal-home-greeting').waitFor({ timeout: 15000 });
          await p.waitForTimeout(800);
        },
      });
    } catch (e) {
      failCount++;
      console.log(`  ${C.err} portal-do-paciente/portal-autenticado-home.png — ${e.message.split('\n')[0]}`);
    }
  }

  // --- Signup: provisionamento + confirme o e-mail ------------------------
  if (groupEnabled('signup')) {
    console.log(`${C.step} Signup (wizard completo → estados do aguardando)`);
    await resetSession(context, page);

    try {
      const stamp = Date.now().toString(36);
      await page.goto(`${WEB_URL}/cadastro`, { waitUntil: 'networkidle' });

      // Passo 1 — plano (vertical dental, plano free self-serve).
      await page.getByTestId('signup-vertical-dental').click();
      const planCard = page.locator('[data-testid^="signup-plan-"]').first();
      await planCard.waitFor({ timeout: 10000 });
      await planCard.click();
      await clickButtonByText(page, ['Continuar']);
      await page.locator('input[formControlName="legalName"]').waitFor({ timeout: 10000 });

      // Passo 2 — clínica (modo Pessoa Física: menos campos, sem CNPJ).
      await page.locator('input[formControlName="legalName"]').fill('Helena Prado');
      const cpfClinic = page.locator('input[formControlName="cpf"]');
      if (await cpfClinic.count()) await cpfClinic.fill('39053344705');
      await page.locator('input[formControlName="tenantSlug"]').fill(`horizonte-${stamp}`);
      await clickButtonByText(page, ['Continuar']);

      // Passo 3 — endereço.
      await page.locator('input[formControlName="postalCode"]').waitFor({ timeout: 10000 });
      await page.locator('input[formControlName="postalCode"]').fill('01310-100');
      await page.locator('input[formControlName="street"]').fill('Av. Paulista');
      await page.locator('input[formControlName="number"]').fill('1000');
      await page.locator('input[formControlName="neighborhood"]').fill('Bela Vista');
      await page.locator('input[formControlName="city"]').fill('São Paulo');
      await page.locator('input[formControlName="uf"]').fill('SP');
      await page.locator('input[formControlName="phone"]').fill('11987650000');
      await clickButtonByText(page, ['Continuar']);

      // Passo 4 — conta do admin.
      await page.locator('input[formControlName="fullName"]').fill('Helena Prado');
      await page.locator('input[formControlName="email"]').fill(`helena.${stamp}@horizonte-demo.com.br`);
      const adminCpf = page.locator('input[formControlName="adminCpf"]');
      if (await adminCpf.count()) await adminCpf.fill('52998224725');
      await page.locator('input[formControlName="password"]').fill('SenhaForte#2026');
      await page.locator('input[formControlName="passwordConfirm"]').fill('SenhaForte#2026');
      await clickButtonByText(page, ['Continuar']);

      // Passo 5 — cobrança (free → só Continuar).
      await clickButtonByText(page, ['Continuar']);

      // Passo 6 — revisão: aceite ToS/LGPD e cria a clínica.
      await page.locator('input[type="checkbox"]').first().check();
      await page.getByRole('button', { name: /Criar minha clínica/ }).click();
      await page.waitForURL(/\/cadastro\/aguardando\//, { timeout: 30000 });

      // Estado 1: provisionando (transiente — shot imediato).
      await shoot(page, 'acesso/cadastro-provisionando.png', { settle: 250 });

      // Estado 2: quase lá — confirme seu e-mail.
      await page.getByText('confirme seu e-mail', { exact: false }).waitFor({ timeout: 90000 });
      await shoot(page, 'acesso/cadastro-confirmar-email.png', { settle: 500 });
    } catch (e) {
      failCount++;
      console.log(`  ${C.err} signup — ${e.message.split('\n')[0]}`);
    }
  }

  await browser.close();

  console.log(`\n  Concluído: ${okCount} prints OK, ${failCount} falharam.\n`);
  if (okCount === 0) process.exit(1);
}

main().catch((err) => {
  console.error(`\n${C.err} Erro fatal: ${err.message}\n`);
  process.exit(1);
});
