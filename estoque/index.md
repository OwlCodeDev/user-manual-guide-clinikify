---
title: Estoque e Loja
layout: default
nav_order: 9
has_children: true
---

# Estoque e Loja

O Estoque controla os insumos e produtos da clínica: o que entra, o que sai e
quanto ainda há de cada item. Quando um atendimento é concluído, os materiais
usados no procedimento são baixados sozinhos — sem lançamento manual.

A **[Loja (PDV)](loja-pdv.html)** usa o mesmo estoque para vender produtos no
balcão (cosméticos, ração, acessórios), com leitor de código de barras. Ela
fica disponível conforme o segmento da sua clínica.

{% include figura.html src="estoque/estoque-lista.png" alt="Lista de estoque" legenda="Lista de itens do estoque, com saldo e alertas." %}

## Cadastrar um item

1. Na tela de **Estoque**, clique em **Novo item**.
2. Informe o **nome do item** (ex.: "Caixa de Luvas Nitrílicas M").
3. Preencha **unidade** (un, cx, ml, g, amp, par, kit) e, se quiser, **SKU**,
   **código de barras** e **categoria** (ex.: EPI, Medicamento). O código de
   barras aceita 8, 12, 13 ou 14 dígitos e pode ser preenchido com a câmera do
   celular/tablet.
4. Defina o **estoque mínimo** — é o que dispara o alerta de saldo baixo.
5. Se o item puder ser vendido no balcão, marque **Vender na Loja** e informe
   o **preço de venda**. Veja mais em [Loja (PDV)](loja-pdv.html).
6. Se quiser, informe um **saldo inicial** (quantidade de abertura) já no
   cadastro, para o item nascer com estoque.
7. Clique em **Cadastrar item**.

{% include figura.html src="estoque/estoque-novo-item.png" alt="Novo item de estoque" legenda="Cadastro de um novo item." %}

Só o **Administrador** cadastra e edita itens. A **Recepcionista** vê o
estoque e pode lançar movimentações, mas não cria itens novos.

## Itens com lote e validade vs. itens de uso livre

Ao cadastrar um item, você decide se ele é **controlado por lote/validade**:

- **Controlado por lote** — para insumos perecíveis (anestésico, luvas,
  medicamentos). Cada entrada exige um **lote** e, se aplicável, a
  **validade**. A saída sempre respeita o critério **FEFO** ("vence primeiro,
  sai primeiro"): o sistema baixa primeiro o lote que vence mais cedo.
- **Uso livre** — para itens sem controle de validade (materiais de escritório,
  descartáveis genéricos). O sistema só acompanha a quantidade total.

<div class="aviso" markdown="1">
⚠️ Essa escolha só pode ser feita na criação do item — não é possível mudar
depois, porque as movimentações já lançadas ficam amarradas a essa regra.
</div>

## Lançar movimentações (entrada, saída, ajuste)

Clique em **Nova movimentação** e escolha o tipo:

- **Entrada (compra)** — registra a chegada de mercadoria. Para itens com
  lote, informe **lote** e, se quiser, **validade**; o **custo unitário** é
  opcional.
- **Saída (consumo / descarte)** — baixa manual de estoque, com **motivo**
  obrigatório (ex.: "uso clínico"). Em itens com lote, a baixa segue FEFO
  automaticamente. Se o saldo não for suficiente, o sistema bloqueia — a não
  ser que você marque **Permitir saldo negativo**.
- **Ajuste de contagem** — corrige uma diferença encontrada em uma contagem
  física (quebra, sobra, extravio). Exige **motivo** e, em item com lote, o
  **lote** afetado. Disponível só para o **Administrador**.

{% include figura.html src="estoque/estoque-movimentacao.png" alt="Nova movimentação de estoque" legenda="Lançamento de uma movimentação de estoque." %}

## Consumo automático ao concluir um atendimento

Você pode vincular **materiais** a um serviço do catálogo — é a **ficha
técnica** do procedimento, configurada na aba **Materiais** do cadastro do
serviço (quantidade de cada insumo por atendimento).

Quando o profissional **conclui o atendimento**, o Clinikify baixa sozinho do
estoque os materiais da ficha técnica daquele serviço — sem nenhum lançamento
manual. Na tela de conclusão, o profissional ainda vê a lista de **materiais
utilizados**, pré-carregada da ficha técnica, e pode ajustá-la para refletir o
que realmente foi gasto (trocar quantidade, remover um item ou adicionar um
que não estava previsto) antes de confirmar.

A baixa automática também segue o critério **FEFO** nos itens com lote e
**nunca bloqueia a conclusão do atendimento** por falta de estoque — mesmo que
o saldo fique negativo, o atendimento é concluído normalmente e a
divergência aparece depois como alerta de saldo baixo.

## Alertas de saldo baixo

Na lista de estoque, um item cujo saldo caiu abaixo do **estoque mínimo**
cadastrado ganha um selo **Baixo** ao lado da quantidade. Use o filtro de
busca (nome, SKU ou categoria) e o campo **Mostrar inativos** para localizar
itens desativados.

<div class="dica" markdown="1">
💡 Revise os alertas de saldo baixo periodicamente e programe as entradas de
compra antes que o item zere — isso evita interromper atendimentos ou vendas
por falta de material.
</div>

## Nesta seção

- [Loja (PDV)](loja-pdv.html) — venda de produtos no balcão.
