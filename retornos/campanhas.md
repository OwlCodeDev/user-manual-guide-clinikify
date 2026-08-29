---
title: Campanhas
layout: default
parent: Retornos
nav_order: 2
---

# Campanhas

Além da lista de [Retornos](./) que a recepção trabalha manualmente, o
Clinikify pode mandar **e-mails automáticos** para reengajar o paciente,
sem que ninguém precise lembrar de enviar nada.

## Quais campanhas existem hoje

- **Retorno pendente** — e-mail ao paciente com um retorno perto do
  vencimento, avisando que está na hora de agendar.
- **Cobrança em aberto** — e-mail ao paciente com uma cobrança vencida,
  enviado uma vez por mês enquanto ela continuar em aberto.

Cada paciente recebe no máximo um e-mail por retorno e no máximo um e-mail
por mês sobre a mesma cobrança — a campanha nunca manda a mesma mensagem
repetida no dia seguinte.

## Ativar ou pausar uma campanha

1. Abra **Configurações → Campanhas**.
2. Cada campanha aparece em um cartão, com uma descrição do que ela faz.
3. Clique no botão **Ativa** / **Inativa** para ligar ou desligar.
4. Na campanha de **Retorno pendente**, ajuste também a **Antecedência
   (dias)** — quantos dias antes do vencimento do retorno o e-mail deve
   sair (de 0 a 90).

A mudança é salva assim que você clica ou altera o número — não existe um
botão separado de "salvar".

## Quando o e-mail sai

O envio é automático: todo dia, o Clinikify confere as campanhas ativas e
manda o e-mail para quem se enquadra — a recepção não precisa disparar nada
manualmente. Pacientes sem e-mail cadastrado, ou marcados como inativos,
simplesmente não entram na lista.

## Respeitando quem não quer receber

Todo paciente tem uma seção **Comunicação** no cadastro, com um botão para
**Não enviar mensagens**. Quem está marcado como **Bloqueada** ali não
recebe nenhuma campanha — nem o lembrete de consulta na véspera — até que
alguém da equipe clique em **Voltar a enviar mensagens**.

O próprio paciente também pode se descadastrar sozinho: todo e-mail de
campanha traz um link de descadastro no rodapé, e um clique já marca a
preferência como bloqueada automaticamente.

<div class="nota" markdown="1">
ℹ️ Uma vez que o paciente pediu para não receber — pelo link do e-mail ou
diretamente com a recepção — ele não recebe mais nenhuma campanha. Só a
própria clínica pode reverter isso, no cadastro do paciente.
</div>

<div class="dica" markdown="1">
💡 A campanha de retorno é uma segunda rede de segurança além da lista de
[Retornos](./): mesmo que a recepção não tenha tempo de ligar para todo
mundo, o e-mail automático já avisa o paciente.
</div>
