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

# API (:3001) + web (:4200)
pnpm dev
```

## 2. Semeie a clínica de demonstração

Com a API no ar, em outro terminal (ainda no repo do Clinikify):

```bash
set -a && source .env && set +a
pnpm --filter @clinikify/api seed:demo:vitalis
```

Isso cria a **Clínica Vitalis Demo** com:

- Admin: `admin@vitalisdemo.com.br`
- Médicos: `dra.renata@vitalisdemo.com.br`, `dr.marco@vitalisdemo.com.br`
- Recepção: `beatriz@vitalisdemo.com.br`, `lucas@vitalisdemo.com.br`
- Senha de todas as contas: `SenhaForte#2026`
- 10 serviços, 30 pacientes e agenda de ~3 semanas.

## 3. Instale o Playwright e rode a captura

Neste diretório (`scripts/`):

```bash
npm install
npm run install:browser   # baixa o Chromium
npm run capture           # gera os prints
```

Saída esperada: uma lista de `✓ seção/arquivo.png`. Prints que dependem de
modais/detalhes podem falhar (`✗`) se a UI mudou — nesse caso a página do
manual exibe "Print pendente" e você pode capturar manualmente.

## Sobrescrever credenciais/URL

```bash
WEB_URL=http://localhost:4200 \
ADMIN_EMAIL=admin@vitalisdemo.com.br \
DOCTOR_EMAIL=dra.renata@vitalisdemo.com.br \
PASSWORD='SenhaForte#2026' \
npm run capture
```

## Mapa de prints → páginas

| Arquivo | Página do manual |
|---|---|
| `acesso/login.png` | Login e acesso |
| `acesso/cadastro-wizard.png` | Cadastro da clínica |
| `acesso/dashboard-visao-geral.png` | Visão geral |
| `agenda/agenda-*.png` | Agenda |
| `pacientes/*.png` | Pacientes e Prontuário |
| `retornos/*.png` | Retornos |
| `faturamento/*.png` | Faturamento / Repasses |
| `configuracoes/*.png` | Configurações (subseções) |
| `profissional/*.png` | Área do profissional |
