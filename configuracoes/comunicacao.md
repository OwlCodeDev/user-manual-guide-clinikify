---
title: Comunicação e WhatsApp
layout: default
parent: Configurações
nav_order: 11
---

# Comunicação e WhatsApp

Aqui você decide o que a clínica fala com o paciente sem ninguém digitar:
o pedido de confirmação de consulta e as respostas automáticas no
WhatsApp.

## Antes de começar

O WhatsApp automático é um **módulo opcional**. Ele precisa de um número
habilitado para a sua clínica e da liberação do módulo pelo suporte. Sem
isso, a tela aparece mas nada é enviado.

O número que o paciente vê é **o da sua clínica**, não o da Clinikify.
Quem responde, responde para você.

## Pedir confirmação da consulta

Ligue a opção e escolha **quantas horas antes** da consulta o pedido sai.
O paciente recebe a mensagem com dois botões, **Confirmar** e
**Cancelar**.

- Quem toca em **Confirmar** tem a consulta confirmada na agenda na
  hora, sem ninguém da recepção mexer.
- Quem toca em **Cancelar** só tem a consulta cancelada se você tiver
  autorizado (veja abaixo).

Cada consulta recebe **um** pedido de confirmação, uma única vez. Não há
risco de o paciente ser cobrado de novo pela mesma consulta.

<div class="nota" markdown="1">
ℹ️ Pacientes que pediram para não receber comunicações ficam de fora
automaticamente, e o mesmo vale para quem não tem telefone cadastrado.
</div>

## O que o assistente pode fazer

Duas permissões, e a segunda começa desligada de propósito:

| Permissão | O que acontece |
|---|---|
| **Agendar uma consulta durante a conversa** | O paciente consegue marcar horário conversando, dentro do mesmo limite da página de agendamento público. |
| **Cancelar a consulta quando o paciente pedir** | Desligada, o assistente responde que a recepção vai retornar o contato e **não** mexe na agenda. Ligada, o cancelamento é aplicado na hora. |

Cancelar por mensagem é uma mudança real de agenda. Ligue quando a
clínica estiver confortável com isso.

## As respostas do assistente

Três campos, nas suas palavras:

- **Quando o paciente confirma** — a resposta que ele lê depois de tocar
  em Confirmar.
- **Quando o paciente cancela** — idem, para o cancelamento.
- **Quando o assistente não souber responder** — a saída educada para
  quando a conversa foge do que ele resolve.

## Por que o texto do lembrete não é editável

O WhatsApp só deixa **iniciar** uma conversa com um modelo de mensagem
aprovado por eles. Esse texto é fixo e passa por aprovação. Tudo o que o
assistente fala **depois** que o paciente responde é conversa livre — e é
exatamente isso que os três campos acima controlam.

<div class="dica" markdown="1">
💡 Comece com a confirmação ligada, cancelamento desligado, e leia as
conversas por alguns dias. Ligar o cancelamento depois leva um clique.
</div>
