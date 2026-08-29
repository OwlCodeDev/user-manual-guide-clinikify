---
title: Portal do paciente
layout: default
nav_order: 10
has_children: true
---

# Portal do paciente

O Portal do paciente reúne os pontos em que o **próprio paciente** interage
com a clínica sem precisar ligar ou vir pessoalmente: ele agenda uma
consulta, assina um documento, acompanha seu atendimento ou pede para não
receber mais mensagens. A equipe continua no controle — cada ação do
paciente aparece no sistema para vocês confirmarem ou acompanharem.

{% include figura.html src="portal-do-paciente/portal-visao-geral.png" alt="Portal do paciente" legenda="Pontos de contato do paciente com a clínica." %}

## O que o paciente consegue fazer sozinho

| Recurso | O paciente faz | A equipe recebe |
|---|---|---|
| **Agendamento online** | Escolhe serviço, profissional e horário num link público. | Uma consulta **provisória** na Agenda, para confirmar. |
| **Assinatura de documentos** | Assina um orçamento/contrato por um link, sem senha. | O plano de tratamento é aprovado automaticamente. |
| **Portal autenticado** | Entra com CPF + data de nascimento e acompanha consultas e documentos. | Nada a fazer — é só leitura para o paciente. |
| **Descadastro de comunicações** | Clica em "não quero receber" no rodapé de um e-mail. | O paciente para de receber lembretes e campanhas. |

## Agendamento online (agenda pública)

A clínica tem um **link de agendamento** exclusivo, para divulgar no
Instagram, WhatsApp ou Google Meu Negócio.

1. O paciente abre o link, escolhe o **serviço**, o **profissional** e um
   **horário livre**, e preenche nome, CPF e contato.
2. Ao confirmar, o sistema envia um **e-mail de confirmação** ao paciente.
3. Enquanto o paciente não clica no link do e-mail, o horário fica com
   status **Provisória** na Agenda — reservado, mas não confirmado.
4. Se o paciente não confirmar a tempo, o horário é **liberado
   automaticamente** e some da Agenda.

{% include figura.html src="portal-do-paciente/agendamento-online.png" alt="Agendamento online" legenda="Tela pública de agendamento online." %}

<div class="nota" markdown="1">
ℹ️ Você encontra o **link de agendamento** e o **QR code** para a recepção
em **Configurações → Perfil da clínica**. Uma consulta provisória aparece na
[Agenda](../agenda/) como qualquer outra — acompanhe pelo status.
</div>

<div class="dica" markdown="1">
💡 Se o paciente já é cadastrado (mesmo CPF), o agendamento online usa o
cadastro existente — não cria um paciente duplicado.
</div>

## Assinatura eletrônica e portal autenticado

Esses dois recursos têm mais passos — veja o detalhe em
[Assinatura e portal autenticado](assinatura-e-portal-autenticado.html):

- **Assinatura eletrônica** — você gera um link a partir de um orçamento
  (Plano de tratamento) e o paciente assina remotamente, sem precisar vir à
  clínica.
- **Portal autenticado** — o paciente entra com CPF + data de nascimento e
  recebe um código por e-mail para acompanhar consultas e baixar documentos
  assinados.

## Descadastro de comunicações

Todo e-mail automático da clínica (lembrete de consulta, campanha de
retorno) traz um link de **"não quero receber mais"** no rodapé.

- Ao clicar, o paciente para de receber **lembretes de véspera** e
  **campanhas automáticas** por e-mail — a confirmação de consulta por
  telefone não é afetada.
- A equipe vê e controla essa preferência na ficha do paciente, na seção
  **Comunicação**: um selo mostra **Ativa** ou **Bloqueada**, e o botão
  **Voltar a enviar mensagens** reativa o paciente se ele pedir.

{% include figura.html src="portal-do-paciente/comunicacao-status.png" alt="Status de comunicação do paciente" legenda="Seção Comunicação na ficha do paciente." %}

## Privacidade e LGPD

<div class="aviso" markdown="1">
⚠️ Tudo que o paciente preenche, assina ou consulta por esses canais é dado
pessoal — e, na assinatura e no portal, dado de saúde. Fica registrado no
mesmo log de auditoria de qualquer atendimento feito pela equipe.
</div>

## Nesta seção

- [Assinatura e portal autenticado](assinatura-e-portal-autenticado.html)
