---
title: Repasses
layout: default
parent: Faturamento
nav_order: 1
---

# Repasses

Repasse é a parte do valor de cada atendimento que cabe ao **profissional**.
A clínica define a regra de divisão e o Clinikify calcula automaticamente.

{% include figura.html src="faturamento/repasses-lista.png" alt="Repasses" legenda="Painel de repasses dos profissionais." %}

## Como o repasse é calculado

- A regra padrão é definida em
  [Configurações · Faturamento](../configuracoes/faturamento.html) —
  **percentual** (ex.: 60%) ou **valor fixo**.
- A cada cobrança faturada, o sistema **congela** a divisão daquele
  atendimento (uma "fotografia" da regra vigente), de modo que mudanças
  futuras na regra não alteram repasses já gerados.

## Acompanhar repasses

1. Em **Faturamento**, abra a aba **Repasses**.
2. Filtre por **profissional** e **período**.
3. Veja o total a repassar e o detalhamento por atendimento.

<div class="nota" markdown="1">
ℹ️ Acesso restrito a **Administrador** e **Recepcionista**. O profissional vê
apenas os próprios valores em [Meus repasses](../profissional/meus-repasses.html).
</div>

<div class="aviso" markdown="1">
⚠️ Nesta versão, o Clinikify **calcula e registra** os repasses. O pagamento
ao profissional (PIX/transferência) é feito fora do sistema.
</div>
