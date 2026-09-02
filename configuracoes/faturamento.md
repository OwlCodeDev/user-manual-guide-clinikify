---
title: Faturamento (regras)
layout: default
parent: Configurações
nav_order: 6
---

# Configurações de faturamento

Define as **regras de divisão** (repasses) entre clínica e profissionais, a
**visibilidade** dos valores para o médico e as **taxas de maquininha e Pix**
descontadas de cada recebimento.

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

## Taxas de maquininha e Pix

Informe as taxas do seu contrato com a adquirente (maquininha, Pix,
transferência). Com elas cadastradas, o Clinikify desconta a taxa certa de
cada recebimento e mostra quanto entra de fato na conta da clínica.

{% include figura.html src="configuracoes/taxas-maquininha.png" alt="Taxas de maquininha" legenda="Taxas por meio de pagamento e faixa de parcelas, com um exemplo calculado ao cadastrar." %}

**Como cadastrar**

1. Em **Nova taxa**, escolha o **meio de pagamento** (crédito, débito, Pix
   ou transferência).
2. Para crédito, informe a **faixa de parcelas** como está no contrato —
   por exemplo, uma taxa para 1x, outra para 2 a 6x e outra para 7 a 12x.
   Débito, Pix e transferência são sempre à vista (1x).
3. Informe a **taxa (%)** e, se houver, a **tarifa fixa** por venda. O
   exemplo abaixo do formulário mostra o desconto numa venda de R$ 1.000.
4. Clique em **Adicionar taxa**. Cada taxa é salva na hora — o botão
   _Salvar alterações_ da página vale só para o repasse.

Uma taxa que deixou de valer pode ser **desativada** (ela continua no
histórico das vendas antigas). Duas taxas ativas não podem cobrir a mesma
faixa de parcelas do mesmo meio.

**Onde o desconto aparece**

- Ao registrar um recebimento (faturar a consulta, executar um procedimento
  do plano ou cobrar avulso), o sistema aplica a taxa da faixa e grava o
  valor líquido junto com a transação.
- Em **Faturamento › Relatórios**, a coluna **Taxa** mostra o total retido
  por meio de pagamento; o detalhe de cada transação mostra a taxa aplicada.
- Sem taxa cadastrada, o valor cheio conta como recebido.

<div class="nota" markdown="1">
ℹ️ A regra vigente é **congelada** em cada atendimento no momento do
faturamento. Mudar a regra agora **não** altera repasses já gerados — só vale
para os próximos. Veja [Repasses](../faturamento/repasses.html). O mesmo
vale para as taxas de maquininha: renegociar o contrato muda as próximas
vendas, nunca o histórico.
</div>
