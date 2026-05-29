---
title: Catálogo de serviços
layout: default
parent: Configurações
nav_order: 3
---

# Catálogo de serviços

O catálogo define os **procedimentos** que a clínica oferece, com **preço** e
**duração**. Ele alimenta a Agenda (duração da consulta), o Faturamento
(valores) e os Planos de tratamento.

{% include figura.html src="configuracoes/servicos-lista.png" alt="Catálogo de serviços" legenda="Catálogo de serviços da clínica." %}

## Cadastrar um serviço

1. Clique em **Novo serviço**.
2. Informe **nome**, **preço** e **duração** (em minutos).
3. (Opcional) Informe o **código TUSS**, quando aplicável.
4. Salve.

{% include figura.html src="configuracoes/servico-novo.png" alt="Novo serviço" legenda="Cadastro de um novo serviço." %}

## Vincular serviços a profissionais

Cada profissional atende um subconjunto dos serviços. Esse vínculo é feito no
cadastro do profissional — veja
[Profissionais](profissionais.html). Na Agenda, ao escolher um profissional,
aparecem apenas os serviços que ele realiza.

<div class="dica" markdown="1">
💡 Serviços de **retorno** podem ter preço zero — útil para consultas de
acompanhamento sem nova cobrança.
</div>
