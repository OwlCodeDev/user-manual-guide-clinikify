# Captura de prints (Playwright)

Gera automaticamente os prints das telas do Clinikify e salva em
`../assets/images/<seção>/`, nos caminhos referenciados pelas páginas do
manual.

## 1. Suba a stack do Clinikify

No repositório do **Clinikify** (`OWLCode/Clinikify`):

```bash
# stack de apoio (Postgres, Redis, MailHog, MinIO, Adminer)
docker compose -f infra/docker/docker-compose.yml up -d

# migrations do schema público
set -a && source .env && set +a
pnpm --filter @clinikify/db migration:public:run

# API (:3001) — SEM o turbo (`pnpm dev`): o turbo 2 roda em strict env
# mode e engole o STORAGE_DRIVER, deixando a API no stub de storage
# (thumbnails de exame quebram). Suba a API direto:
STORAGE_DRIVER=s3 S3_SSE=none AUDIT_S3_BUCKET=clinikify-audit-dev \
  pnpm --filter @clinikify/api dev

# web (:4200), em outro terminal
pnpm --filter @clinikify/web dev
```

> O MinIO precisa dos buckets `clinikify-dev` e `clinikify-audit-dev`
> (crie com `mc` dentro do container se a base for nova).

## 2. Semeie os tenants de demonstração

Com a API no ar, em outro terminal (ainda no repo do Clinikify):

```bash
set -a && source .env && set +a
# Vitalis — base da maioria dos prints
pnpm --filter @clinikify/api seed:demo:vitalis
# clinica-demo — fidelity seed (prontuário rico: exames, anamnese,
# odontograma, planos assinados, portal do paciente)
pnpm --filter @clinikify/api seed:demo
```

A **Clínica Vitalis Demo** tem:

- Admin: `admin@vitalisdemo.com.br`
- Médicos: `dra.renata@vitalisdemo.com.br`, `dr.marco@vitalisdemo.com.br`
- Recepção: `beatriz@vitalisdemo.com.br`, `lucas@vitalisdemo.com.br`
- Senha de todas as contas: `SenhaForte#2026`
- 10 serviços, 30 pacientes e agenda de ~3 semanas.

O **clinica-demo** (fidelity) usa `dentista@demo.com.br` /
`recepcao@demo.com.br`, senha `ClinikifyDemo#2026!`. O PDV é capturado no
tenant veterinário **demo-vet** (`vet@demo.com.br`, mesma senha) — a Loja
não existe na vertical dental.

> Estoque da Vitalis: o seed não cria itens; o print de estoque espera
> itens com saldo (alguns abaixo do mínimo p/ mostrar alertas). Crie meia
> dúzia via API/UI antes de capturar, ou rode o grupo `estoque` no tenant
> que já os tenha.

## 3. Instale o Playwright e rode a captura

Neste diretório (`scripts/`):

```bash
npm install
npm run install:browser   # baixa o Chromium
npm run capture           # gera os prints (tudo)
node capture.mjs pep pdv  # ou só grupos específicos
```

Grupos: `publico vitalis agenda-faturar permissoes estoque assistente
profissional pep comunicacao pdv portal signup`.

Saída esperada: uma lista de `✓ seção/arquivo.png`. Prints que dependem de
modais/detalhes podem falhar (`✗`) se a UI mudou — nesse caso a página do
manual exibe "Print pendente" e você pode capturar manualmente.

Notas dos fluxos especiais:

- **`portal`** faz o login real do portal do paciente (CPF + nascimento →
  código OTP): o script busca o CPF da paciente-fixture via API e lê o
  código no MailHog (`http://localhost:8025`).
- **`signup`** percorre o wizard inteiro com um CNPJ sintético válido e
  fotografa os dois estados da tela `/cadastro/aguardando/:jobId`
  (provisionando → confirme seu e-mail). Cada execução cria um tenant
  novo `horizonte-<stamp>` no banco local — lixo inofensivo em dev.
- **`pep`** espera o exame da Maria Souza com thumbnail. Se a seção de
  exames estiver vazia, anexe uma imagem pelo próprio hub (o browser gera
  o thumbnail no upload) antes de rodar o grupo.

## Sobrescrever credenciais/URL

```bash
WEB_URL=http://localhost:4200 \
API_URL=http://localhost:3001 \
MAILHOG_URL=http://localhost:8025 \
npm run capture
```

## Mapa de prints → páginas

| Arquivo | Página do manual |
|---|---|
| `acesso/login.png` | Login e acesso |
| `acesso/cadastro-*.png` | Cadastro da clínica |
| `acesso/dashboard-visao-geral.png` | Visão geral |
| `agenda/agenda-*.png` | Agenda |
| `pacientes/*.png` | Pacientes e Prontuário |
| `retornos/*.png` | Retornos |
| `faturamento/*.png` | Faturamento / Repasses |
| `configuracoes/*.png` | Configurações (subseções) |
| `estoque/*.png` | Estoque e Loja/PDV |
| `portal-do-paciente/*.png` | Portal do paciente |
| `primeiros-passos/assistente-painel.png` | Assistente |
| `profissional/*.png` | Área do profissional |
