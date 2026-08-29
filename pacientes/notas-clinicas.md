---
title: Notas clínicas
layout: default
parent: Pacientes e Prontuário
nav_order: 2
---

# Notas clínicas

As notas clínicas registram a evolução do paciente em cada atendimento. Elas
podem ser **livres** ou seguir um **modelo de prontuário** (formulário
estruturado) configurado pela clínica.

{% include figura.html src="pacientes/nota-clinica-editor.png" alt="Editor de nota clínica" legenda="Editor de uma nota clínica." %}

## Criar uma nota

1. No prontuário do paciente, clique em **Nova evolução** (no topo da
   coluna Histórico ou na coluna de Ações, à direita).
2. Escolha um **modelo** (se houver) ou escreva em texto livre.
3. Preencha os campos.
4. **Salve** ou **assine**.

## Assinar uma nota

- Uma nota **assinada** vira parte definitiva do prontuário e **não pode mais
  ser alterada**.
- Para complementar ou corrigir, use um **aditamento**.

<div class="dica" markdown="1">
💡 Modelos de prontuário aceleram o preenchimento e padronizam o registro
entre os profissionais. Configure-os em
[Modelos de prontuário](../configuracoes/modelos-prontuario.html).
</div>

## Aditamentos

Um aditamento é uma nova entrada vinculada à nota original. Use quando precisar
adicionar uma informação que faltou ou registrar uma correção — sem apagar o
conteúdo anterior.

## Anamneses respondidas pelo paciente

Quando o paciente responde uma anamnese pelo link enviado a ele (veja
[Anamnese pelo paciente](anamnese-do-paciente.html)), a resposta aparece na
coluna Histórico junto com as evoluções, marcada com o selo **Paciente**.

1. Clique na anamnese na linha do tempo para abri-la em modo leitura.
2. Se quiser aproveitar as respostas, clique em **Usar na evolução** — isso
   cria uma nova evolução já preenchida com o que o paciente respondeu,
   para você revisar e assinar.

A resposta do paciente, por si só, nunca vira uma nota do prontuário — só a
evolução que você criar e assinar a partir dela.
