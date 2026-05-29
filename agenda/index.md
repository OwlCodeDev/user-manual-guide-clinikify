---
title: Agenda
layout: default
nav_order: 3
---

# Agenda

A Agenda é o centro da operação: é onde você marca, confirma e acompanha as
consultas de cada profissional.

{% include figura.html src="agenda/agenda-visao-geral.png" alt="Tela da Agenda" legenda="Visão da Agenda com os horários do dia." %}

## Visão geral da tela

- **Calendário** com os horários disponíveis e ocupados.
- **Filtro por profissional** — veja a agenda de um médico/dentista específico.
- **Navegação por data** — avance ou volte dias/semanas.
- Cada **bloco** representa uma consulta, colorido pelo seu status.

## Marcar uma consulta

1. Clique em um **horário livre** (ou no botão de **nova consulta**).
2. Selecione o **paciente** (ou cadastre um novo na hora).
3. Escolha o **profissional** e o **serviço** (o sistema sugere a duração).
4. Confirme o **horário**.
5. Salve.

{% include figura.html src="agenda/agenda-nova-consulta.png" alt="Nova consulta" legenda="Formulário de nova consulta." %}

<div class="nota" markdown="1">
ℹ️ Os horários disponíveis vêm da **grade de trabalho** de cada profissional,
configurada em [Profissionais](../configuracoes/profissionais.html).
</div>

## Status de uma consulta

Uma consulta passa por estados ao longo do seu ciclo de vida:

| Status | Significado |
|---|---|
| **Provisória** | Reservada temporariamente (segura o horário por um período). |
| **Confirmada** | Consulta marcada e confirmada. |
| **Concluída** | Atendimento realizado. |
| **Faturada** | Atendimento concluído e cobrado (gera lançamento no financeiro). |
| **Cancelada** | Consulta desmarcada (o horário volta a ficar livre). |

## Concluir e faturar

Ao final do atendimento, você pode **concluir e faturar** a consulta em uma
única ação: isso registra o atendimento e cria a cobrança correspondente no
[Faturamento](../faturamento/). Informe o valor, eventual desconto e a forma
de pagamento.

{% include figura.html src="agenda/agenda-faturar.png" alt="Concluir e faturar" legenda="Concluir e faturar uma consulta." %}

## Dicas do dia a dia

<div class="dica" markdown="1">
💡 Use o **filtro por profissional** para imprimir/visualizar a agenda de
cada um separadamente.
</div>

<div class="aviso" markdown="1">
⚠️ Cancelamentos liberam o horário imediatamente para um novo agendamento.
</div>
