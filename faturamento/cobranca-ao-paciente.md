---
title: Cobrança ao paciente
layout: default
parent: Faturamento
nav_order: 2
---

# Cobrança ao paciente

Nem todo valor é pago na hora. Quando o paciente vai pagar depois — um
tratamento parcelado, um saldo em aberto, uma cobrança avulsa — a clínica
registra uma **cobrança** em **Cobranças**, no menu lateral. Diferente do
lançamento que nasce ao faturar uma consulta na [Agenda](../agenda/), a
cobrança tem **vencimento** e fica pendente até alguém confirmar que o
dinheiro entrou.

## O que é uma cobrança

Cada cobrança guarda:

- o **paciente** e uma **descrição** (ex.: "Clareamento", "Saldo da consulta");
- o **valor** e o **vencimento**;
- a **forma prevista** de pagamento (No balcão, Pix, Boleto, Link de cartão) —
  é só uma indicação de como o paciente pretende pagar, não um cobrador
  automático (veja o aviso no final da página).

## Criar uma cobrança

1. Abra **Cobranças** no menu lateral.
2. Clique em **Nova cobrança**.
3. Escolha **Cobrança única** (um valor, um vencimento) ou **Carnê
   (parcelado)**.
4. Selecione o **paciente**, escreva a **descrição**, o **valor** e o
   **vencimento**.
5. Escolha a **forma prevista** e clique em **Criar cobrança**.

## Carnê: parcelar uma cobrança

Para dividir um tratamento em parcelas, escolha **Carnê (parcelado)** no
passo 3 acima. Além do valor e do primeiro vencimento, informe:

- **Parcelas** — quantas cobranças serão geradas (2 a 60);
- **Intervalo (dias)** — o espaçamento entre um vencimento e o próximo.

Clique em **Gerar carnê**. O sistema cria todas as parcelas de uma vez, cada
uma com seu próprio vencimento, e a lista mostra "parcela 1", "parcela 2"
etc. junto da descrição.

## Acompanhando a fila

A tela de **Cobranças** abre por padrão em **Vencidas** — a pergunta que a
recepção faz todo dia é "quem me deve agora". Use os filtros para trocar de
visão:

- **Vencidas** — já passaram do vencimento e ainda não foram pagas.
- **Em aberto** — dentro do prazo, aguardando pagamento.
- **Recebidas** — já têm baixa registrada.
- **Todas** — a lista completa.

No topo, três indicadores resumem o período: **Em aberto**, **Vencido** e
**Recebido no período**.

## Faixas de atraso (aging)

Logo abaixo dos indicadores fica o painel **Faixas de atraso**, que agrupa
as cobranças vencidas por tempo de atraso: **A vencer**, **1–7 dias**,
**8–30 dias**, **31–60 dias**, **61–90 dias** e **90+ dias**. Use-o para
priorizar quem cobrar primeiro — uma cobrança parada em "90+ dias" pesa mais
do que várias no início do atraso.

Uma cobrança entra em "vencida" sozinha, no dia seguinte ao vencimento —
ninguém precisa marcar nada.

## Registrar o recebimento

Quando o paciente paga, dê baixa na cobrança:

1. Na linha da cobrança, clique em **Registrar recebimento**.
2. Escolha como o dinheiro chegou (Dinheiro, Pix, Cartão de crédito, Cartão
   de débito, Transferência ou Outro).
3. Clique em **Confirmar**.

A cobrança passa para **Paga** e some das visões "Vencidas" e "Em aberto".

## Cancelar uma cobrança

Se a cobrança não deve mais existir (erro de lançamento, negociação com o
paciente), clique em **Cancelar** na linha dela, escreva o **motivo** e
confirme. Uma cobrança cancelada não pode ser reaberta — se for o caso,
crie uma nova.

## O que acontece no financeiro

Ao registrar o recebimento, o valor entra automaticamente nos lançamentos
do [Faturamento](./) do dia, sem precisar lançar nada de novo — a cobrança e
o financeiro nunca ficam dessincronizados.

<div class="nota" markdown="1">
ℹ️ Acesso restrito a **Administrador** e **Recepcionista**. O profissional
não vê esta tela — cobrar o paciente é trabalho da recepção.
</div>

<div class="aviso" markdown="1">
⚠️ Este é o modo disponível hoje: a cobrança é um **controle manual**. O
Clinikify não gera Pix ou boleto de verdade nem recebe pagamento online —
você registra o vencimento e a forma prevista, e confirma aqui quando o
dinheiro chegar de fato (na maquininha, na conta, em espécie).
</div>
