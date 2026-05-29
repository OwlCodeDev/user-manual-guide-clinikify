---
title: Faturamento (regras)
layout: default
parent: Configurações
nav_order: 6
---

# Configurações de faturamento

Define as **regras de divisão** (repasses) entre clínica e profissionais e a
**visibilidade** dos valores para o médico.

{% include figura.html src="configuracoes/faturamento-config.png" alt="Configurações de faturamento" legenda="Regras de divisão e visibilidade." %}

## Modo de divisão

| Modo | Como funciona |
|---|---|
| **Percentual** | O profissional recebe um % de cada atendimento (ex.: 60%). |
| **Valor fixo** | O profissional recebe um valor fixo por atendimento. |

## Visibilidade para o profissional

- **Imediata** — o profissional vê o repasse assim que o atendimento é
  faturado.
- (Outras políticas podem liberar a visão em outro momento, conforme a
  configuração.)

<div class="nota" markdown="1">
ℹ️ A regra vigente é **congelada** em cada atendimento no momento do
faturamento. Mudar a regra agora **não** altera repasses já gerados — só vale
para os próximos. Veja [Repasses](../faturamento/repasses.html).
</div>
