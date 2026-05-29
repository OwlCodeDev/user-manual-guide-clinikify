---
title: Cadastro da clínica
layout: default
parent: Primeiros passos
nav_order: 3
---

# Cadastro da clínica

A criação da conta é feita por um **assistente de 6 passos** que você acessa
em **`/cadastro`**. Ao final, a clínica é provisionada e você recebe um
e-mail para confirmar o endereço.

{% include figura.html src="acesso/cadastro-wizard.png" alt="Assistente de cadastro" legenda="Assistente de cadastro em 6 passos." %}

## Os 6 passos

| # | Passo | O que você informa |
|---|---|---|
| 1 | **Plano** | Escolha do plano da clínica. |
| 2 | **Clínica** | Nome/razão social, CNPJ ou CPF, tipo (PF/PJ). |
| 3 | **Endereço** | CEP (preenchimento automático), número e complemento. |
| 4 | **Conta** | Dados do administrador: nome, e-mail e senha. |
| 5 | **Cobrança** | Dados de cobrança do plano. |
| 6 | **Revisão** | Conferência de tudo e aceite dos termos (LGPD). |

<div class="dica" markdown="1">
💡 O preenchimento fica salvo no navegador conforme você avança. Se sair e
voltar, o assistente retoma de onde parou.
</div>

## Passo 4 — Conta do administrador

A primeira pessoa cadastrada vira o **Administrador** da clínica. Use um
e-mail real: é para ele que vai o link de confirmação e as redefinições de
senha.

- **Senha forte:** combine letras maiúsculas, minúsculas, números e símbolos.

## Depois de finalizar

1. **Provisionamento** — o sistema prepara a sua clínica (poucos segundos).
   Você vê uma tela de "Preparando sua clínica".

   {% include figura.html src="acesso/cadastro-provisionando.png" alt="Tela de provisionamento" legenda="Aguardando o provisionamento da clínica." %}

2. **Confirmação de e-mail** — abra o e-mail recebido e clique no link de
   confirmação. **O login só é liberado após confirmar o e-mail.**

   {% include figura.html src="acesso/cadastro-confirmar-email.png" alt="Confirmação de e-mail" legenda="Tela de confirmação de e-mail." %}

3. Pronto! Siga para o **[Login](login.html)**.

<div class="aviso" markdown="1">
⚠️ Não recebeu o e-mail? Verifique a caixa de spam. O link de confirmação é
de uso único — se expirar, refaça a solicitação a partir da tela de login.
</div>
