---
title: Profissionais
layout: default
parent: Configurações
nav_order: 7
---

# Profissionais

Cadastro dos **médicos/dentistas** que atendem na clínica, com conselho,
especialidade, serviços que realizam e **grade de horários**.

{% include figura.html src="configuracoes/profissionais-lista.png" alt="Profissionais" legenda="Lista de profissionais da clínica." %}

## Cadastrar um profissional

1. Clique em **Novo profissional**.
2. Informe **nome**, **CPF**, **conselho** (ex.: CRM/CRO), **UF** e **número**,
   e a **especialidade**.
3. (Opcional) **Vincule a um usuário** com perfil Profissional, para que ele
   acesse a própria agenda e o prontuário.
4. Salve.

{% include figura.html src="configuracoes/profissional-detalhe.png" alt="Detalhe do profissional" legenda="Detalhe do profissional: serviços e horários." %}

## Serviços que realiza

No detalhe do profissional, marque quais [serviços](servicos.html) ele atende.
Isso filtra as opções na hora de agendar.

## Grade de horários

Defina os **dias e faixas de horário** em que o profissional atende (ex.:
seg–sex, 09:00–12:00 e 14:00–18:00). A [Agenda](../agenda/) usa essa grade
para mostrar os horários disponíveis.

<div class="dica" markdown="1">
💡 Sem grade de horários cadastrada, não há horários livres para agendar com
aquele profissional.
</div>
