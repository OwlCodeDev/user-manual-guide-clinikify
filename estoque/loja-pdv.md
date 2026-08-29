---
title: Loja (PDV)
layout: default
parent: Estoque e Loja
nav_order: 2
---

# Loja (PDV)

A Loja é a tela de venda de balcão do Clinikify: você bipa ou busca um
produto, monta o carrinho e finaliza o pagamento. A venda entra sozinha no
Faturamento e baixa o Estoque — sem lançamento manual em nenhum dos dois.

<div class="nota" markdown="1">
ℹ️ A Loja é disponibilizada conforme o **segmento da sua clínica**. Clínicas
veterinárias já contam com ela por padrão; em outros segmentos, a
disponibilidade depende do plano contratado.
</div>

{% include figura.html src="estoque/loja-pdv.png" alt="Tela do PDV" legenda="PDV — venda de produtos no balcão." %}

## Antes de vender: marque o item como vendável

Só aparecem no PDV os itens do [Estoque](index.html) marcados como vendáveis:

1. No **Estoque**, abra o item (ou cadastre um novo).
2. Marque **Vender na Loja**.
3. Informe o **preço de venda** — obrigatório para um item vendável.
4. Se quiser usar leitor de código de barras no balcão, cadastre também o
   **código de barras** do produto (pode escanear com a câmera na hora do
   cadastro).

## Abrir o PDV

Na tela **Loja**, clique em **Abrir PDV**. A tela abre com o foco já no campo
de leitura — pronta para o primeiro produto.

## Vender no balcão

1. **Adicione produtos ao carrinho** de uma das formas:
   - bipe o código de barras com um **leitor USB** (funciona mesmo sem o
     campo estar em foco: o Clinikify recaptura a leitura automaticamente);
   - clique em **escanear com a câmera** e aponte o celular/tablet para o
     código;
   - digite o código no campo e tecle **Enter**;
   - ou clique diretamente no produto na grade de produtos vendáveis.
2. Ajuste a **quantidade** de cada linha do carrinho, se necessário (produtos
   vendidos por peso/volume, como `ml` e `g`, aceitam quantidade fracionada).
3. Se quiser, vincule um **cliente**: busque o paciente pelo nome no campo
   "Cliente (opcional)".
4. Se quiser, informe um **desconto** em reais — ele é aplicado sobre o total
   do carrinho.
5. Escolha a **forma de pagamento** (Pix, Dinheiro, Cartão de crédito, Cartão
   de débito, Transferência ou Outro). Em **Dinheiro**, informe o **valor
   recebido** e o Clinikify calcula o **troco** automaticamente.
6. Adicione uma observação, se quiser.
7. Clique em **Finalizar venda** (atalho de teclado: **F4**).

Ao finalizar, o Clinikify abre automaticamente o **recibo em PDF** da venda.

<div class="aviso" markdown="1">
⚠️ O recibo gerado é um comprovante **não fiscal** — ele não substitui nota
fiscal/NFC-e. Cada venda é registrada com **uma única forma de pagamento**,
sem parcelamento.
</div>

## O que acontece depois da venda

- O valor entra no **[Faturamento](../faturamento/)** como receita da venda.
- O **[Estoque](index.html)** dos produtos vendidos é baixado automaticamente
  (nos itens com lote, seguindo o critério FEFO — vence primeiro, sai
  primeiro).
- Se o produto ficar sem saldo na filial, ele aparece como "Sem estoque" na
  grade e não pode ser vendido.

## Vendas recentes e estorno

Na tela **Loja** (fora do PDV), você encontra a lista de **vendas recentes**
da unidade, com opções para:

- **Recibo** — reimprimir o comprovante em PDF de qualquer venda.
- **Estornar** — cancela a venda por completo, informando um motivo. O
  estorno devolve os itens ao estoque e ajusta o Faturamento.

## Relatório de vendas

Ainda na tela **Loja**, o **relatório de vendas** mostra, por produto, a
quantidade vendida, a receita e a margem no período (últimos 7, 30 ou 90
dias) — útil para acompanhar o giro dos produtos do balcão.

<div class="dica" markdown="1">
💡 Cadastre o código de barras de fábrica dos produtos sempre que possível —
isso acelera a venda no balcão e evita erro de digitação no valor.
</div>
