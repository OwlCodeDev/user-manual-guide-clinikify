---
title: Faturamento
layout: default
nav_order: 6
has_children: true
---

# Faturamento

O Faturamento concentra as **cobranças** e **recebimentos** da clínica
(atendimento particular) e oferece um painel com a visão financeira.

{% include figura.html src="faturamento/faturamento-painel.png" alt="Painel de faturamento" legenda="Painel de faturamento." %}

## O painel

- **Indicadores** do período (recebido, a receber, descontos).
- **Lançamentos** gerados pelos atendimentos concluídos e faturados.
- Filtros por **período**, **profissional** e **forma de pagamento**.

## De onde vêm os lançamentos

A maioria dos lançamentos nasce ao **concluir e faturar** uma consulta na
[Agenda](../agenda/) (ou ao executar procedimentos de um
[Plano de tratamento](../pacientes/planos-de-tratamento.html)). Cada cobrança
registra:

- valor bruto, desconto e valor líquido;
- forma de pagamento (PIX, dinheiro, cartão etc.);
- profissional responsável (base para o cálculo dos **repasses**).

<div class="nota" markdown="1">
ℹ️ Todos os valores são registrados em um **livro imutável** (em centavos),
garantindo consistência e rastreabilidade do financeiro.
</div>

## Nesta seção

- [Repasses](repasses.html) — divisão de valores com os profissionais.

## Configurações relacionadas

As regras de divisão (percentual ou valor fixo) e a visibilidade para o médico
ficam em [Configurações · Faturamento](../configuracoes/faturamento.html).
