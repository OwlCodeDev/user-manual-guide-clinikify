#!/usr/bin/env node
/**
 * Captura automatizada dos prints do manual do Clinikify.
 *
 * Pré-requisitos (ver scripts/README.md):
 *   1. Stack do Clinikify no ar (docker + API em :3001 + web em :4200).
 *   2. Clínica demo semeada:  pnpm --filter @clinikify/api seed:demo:vitalis
 *   3. Navegador instalado:   npm run install:browser   (dentro de scripts/)
 *
 * Uso:
 *   node capture.mjs
 *
 * Variáveis de ambiente (opcionais):
 *   WEB_URL          http://localhost:4200
 *   ADMIN_EMAIL      admin@vitalisdemo.com.br
 *   DOCTOR_EMAIL     dra.renata@vitalisdemo.com.br
 *   PASSWORD         SenhaForte#2026
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
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@vitalisdemo.com.br';
const DOCTOR_EMAIL = process.env.DOCTOR_EMAIL ?? 'dra.renata@vitalisdemo.com.br';
const PASSWORD = process.env.PASSWORD ?? 'SenhaForte#2026';

const VIEWPORT = { width: 1440, height: 900 };

const C = { ok: '\x1b[32m✓\x1b[0m', err: '\x1b[31m✗\x1b[0m', step: '\x1b[36m▸\x1b[0m' };
let okCount = 0;
let failCount = 0;

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
    await page.goto(`${WEB_URL}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
    if (opts.before) await opts.before(page);
    await shoot(page, rel, opts);
    return true;
  } catch (e) {
    failCount++;
    console.log(`  ${C.err} ${rel}  (${route}) — ${e.message.split('\n')[0]}`);
    return false;
  }
}

async function login(page, email) {
  await page.goto(`${WEB_URL}/login`, { waitUntil: 'networkidle' });
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL('**/app/**', { timeout: 30000 }).catch(() => {}),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
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

async function main() {
  console.log(`\n  Clinikify · captura de prints`);
  console.log(`  WEB_URL=${WEB_URL}\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // prints nítidos (retina)
    locale: 'pt-BR',
  });
  const page = await context.newPage();

  // --- Telas públicas -----------------------------------------------------
  console.log(`${C.step} Telas públicas`);
  await capture(page, '/login', 'acesso/login.png');
  await capture(page, '/cadastro', 'acesso/cadastro-wizard.png');

  // --- Perfil ADMIN -------------------------------------------------------
  console.log(`${C.step} Login como ADMIN (${ADMIN_EMAIL})`);
  await login(page, ADMIN_EMAIL);

  await capture(page, '/app/agenda', 'acesso/dashboard-visao-geral.png');
  await capture(page, '/app/agenda', 'agenda/agenda-visao-geral.png');
  await capture(page, '/app/agenda', 'agenda/agenda-nova-consulta.png', {
    before: (p) => clickButtonByText(p, ['nova consulta', 'novo agendamento', 'agendar', 'adicionar']),
  });

  await capture(page, '/app/pacientes', 'pacientes/pacientes-lista.png');
  await capture(page, '/app/pacientes', 'pacientes/pacientes-novo.png', {
    before: (p) => clickButtonByText(p, ['novo paciente', 'adicionar paciente', 'novo', 'cadastrar']),
  });
  await capture(page, '/app/pacientes', 'pacientes/prontuario-visao.png', {
    before: (p) => clickFirstRow(p, ['table tbody tr', '[role="row"]', 'a[href*="/app/pacientes/"]', 'li button', '.lista-item']),
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
  await capture(page, '/app/configuracoes/profissionais', 'configuracoes/profissionais-lista.png');
  await capture(page, '/app/configuracoes/profissionais', 'configuracoes/profissional-detalhe.png', {
    before: (p) => clickFirstRow(p, ['table tbody tr', '[role="row"]', 'a[href*="/profissionais/"]', '.lista-item']),
  });
  await capture(page, '/app/configuracoes/convenios', 'configuracoes/convenios-lista.png');
  await capture(page, '/app/configuracoes/convenios', 'configuracoes/convenio-detalhe.png', {
    before: (p) => clickFirstRow(p, ['table tbody tr', '[role="row"]', 'a[href*="/convenios/"]', '.lista-item']),
  });

  // --- Perfil PROFISSIONAL ------------------------------------------------
  console.log(`${C.step} Login como PROFISSIONAL (${DOCTOR_EMAIL})`);
  // Limpa a sessão atual antes de logar com outra conta.
  await context.clearCookies();
  await login(page, DOCTOR_EMAIL);

  await capture(page, '/app/meus-repasses', 'profissional/meus-repasses.png');
  await capture(page, '/app/meu-certificado', 'profissional/meu-certificado.png');
  await capture(page, '/app/meus-documentos', 'profissional/meus-documentos.png');

  await browser.close();

  console.log(`\n  Concluído: ${okCount} prints OK, ${failCount} falharam.\n`);
  if (okCount === 0) process.exit(1);
}

main().catch((err) => {
  console.error(`\n${C.err} Erro fatal: ${err.message}\n`);
  process.exit(1);
});
