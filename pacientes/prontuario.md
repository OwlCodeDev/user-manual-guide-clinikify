---
title: Prontuário (PEP)
layout: default
parent: Pacientes e Prontuário
nav_order: 1
---

# Prontuário Eletrônico (PEP)

O Prontuário reúne o histórico clínico do paciente em uma única tela,
dividida em três colunas.

{% include figura.html src="pacientes/prontuario-visao.png" alt="Prontuário do paciente" legenda="Prontuário (PEP) de um paciente." %}

## As três colunas

- **Histórico** (esquerda) — linha do tempo com as evoluções registradas
  pela equipe e as anamneses que o próprio paciente respondeu (essas vêm
  com o selo **Paciente**), da mais recente para a mais antiga.
- **Editor** (centro) — onde você lê ou escreve a evolução selecionada.
  Logo abaixo dele ficam duas barras recolhíveis: **Documentos clínicos**
  (atestados, receitas, laudos emitidos naquele atendimento) e **Executar
  tratamentos** (procedimentos de um plano de tratamento pendentes de
  execução).
- **Ações** (direita) — seções recolhíveis para **Retornos**, **Exames de
  imagem** e **Planos de Tratamento** (as duas últimas quando disponíveis
  no seu plano). Cada seção mostra um contador e um botão **+** no
  cabeçalho para a ação principal (agendar retorno, anexar exame ou criar
  um plano), sem precisar abrir a seção primeiro.

Em telas estreitas as três colunas viram abas — use a barra no topo do
prontuário para alternar entre **Histórico**, **Evolução** e **Ações**.

## Retornos atrasados

Um retorno que passou da data aparece em vermelho, com **"Atrasado N
dias"**, tanto na seção Retornos do prontuário quanto na lista de
[Retornos](../retornos/) da clínica.

## Notas imutáveis e aditamentos

As notas clínicas, depois de **assinadas**, tornam-se **imutáveis** — não podem
ser apagadas nem editadas. Se precisar corrigir ou complementar, registre um
**aditamento** (uma nova entrada vinculada à original).

<div class="nota" markdown="1">
ℹ️ Esse comportamento atende a exigências legais de prontuário: o histórico é
preservado por completo, e correções ficam rastreáveis.
</div>

## Ações administrativas e dados do paciente

- **Desativar** o cadastro ou aplicar o **esquecimento (LGPD)** fica no
  menu **⋯** no cabeçalho do prontuário — visível só para o Administrador.
- Ver os dados cadastrais completos e ajustar a **preferência de
  comunicação** do paciente fica em **Ver dados**, no cabeçalho.

Veja em detalhe:

- [Notas clínicas](notas-clinicas.html)
- [Documentos clínicos](../profissional/meus-documentos.html)
