---
title: Nota fiscal (NFS-e)
layout: default
parent: Faturamento
nav_order: 3
---

# Nota fiscal (NFS-e)

O Clinikify emite a **nota fiscal de serviço eletrônica (NFS-e)** direto na
plataforma nacional, usando o certificado digital da sua empresa. Também é
possível apenas **registrar** uma nota emitida por fora (contador, portal da
prefeitura).

<div class="nota" markdown="1">
ℹ️ Emissão de nota é uma funcionalidade de **Faturamento** e está disponível
para quem tem CNPJ. Quem atende como pessoa física (CPF) não emite NFS-e pelo
sistema.
</div>

## 1. Preparar o perfil fiscal da unidade

Antes de emitir a primeira nota, um Administrador configura os dados fiscais
em **Configurações › Fiscal**:

1. Confira a **inscrição municipal** (se o seu município não usa esse
   padrão, deixe o campo em branco).
2. Escolha o **regime tributário** (Simples Nacional, Lucro Presumido etc.).
3. Escolha a **forma de emissão**:
   - **Manual** — as notas continuam sendo emitidas fora do Clinikify; você
     só registra os dados aqui.
   - **Emissor Nacional** — o Clinikify emite a NFS-e para você.
4. Selecione o **serviço principal** da clínica numa lista já preparada para
   o seu segmento (odontologia, medicina, veterinária, estética...). Se o seu
   caso for diferente, use "Outro código" e informe o item da lista de
   serviços e o código de tributação com o seu contador.
5. Informe o **município emissor** (a cidade da sede da empresa) e, se for o
   caso, a **alíquota de ISS**.
6. Comece emitindo em **ambiente de testes** — a nota não tem validade
   fiscal, é só para conferir se está tudo certo. Quando o modo Emissor
   Nacional estiver escolhido, um painel mostra o que falta configurar antes
   de emitir de verdade.

<div class="aviso" markdown="1">
⚠️ Ligar o **ambiente de produção** pede uma confirmação extra: a partir
daí, toda nota emitida tem validade fiscal real e é registrada na
prefeitura.
</div>

## 2. Guardar o certificado digital (e-CNPJ)

A emissão pelo Emissor Nacional exige o certificado digital **A1** da
empresa (e-CNPJ), em arquivo `.pfx`:

1. Ainda em **Configurações › Fiscal**, envie o **arquivo do certificado**
   e a **senha**.
2. Clique em **Validar certificado** — o sistema confere o arquivo e mostra
   o titular, o CNPJ e a validade antes de qualquer coisa ser salva.
3. Marque a autorização de guarda do certificado e clique em **Enviar
   certificado**.

<div class="nota" markdown="1">
ℹ️ O certificado fica **criptografado** e só é aberto no momento de assinar
uma nota. Se o CNPJ do certificado não bater com o CNPJ da unidade, o envio
é bloqueado.
</div>

Quando o certificado estiver perto de vencer, um aviso aparece na tela. Para
trocar de certificado, é preciso **revogar** o atual antes de enviar o novo.

## 3. Emitir a nota de uma cobrança

1. Abra a transação recebida em **Faturamento**.
2. No card **Nota fiscal**, clique em **Emitir NFS-e** (modo Emissor
   Nacional) ou em **Registrar nota** (modo Manual).
3. No modo Emissor Nacional, a nota vai para a fila de processamento — a
   tela atualiza sozinha a cada poucos segundos até sair um resultado.
4. No modo Manual, informe os dados de uma nota já emitida por fora: tipo,
   data, número, série e (se tiver) código de verificação e link de
   consulta.

## 4. Acompanhar autorização, rejeição e cancelamento

O card de nota fiscal da transação mostra o status a qualquer momento:

| Status | O que significa |
| --- | --- |
| Processando | Enviada, aguardando resposta da plataforma nacional. |
| Autorizada / Registrada | Nota válida, com número, chave de acesso e data de emissão. |
| Rejeitada | A plataforma recusou a nota — veja abaixo. |
| Cancelada | Nota cancelada (ou registro cancelado, no modo Manual). |

Se a nota for **rejeitada**, o motivo enviado pela plataforma aparece na
tela, e o Clinikify traduz os erros mais comuns em uma dica de próximo
passo — por exemplo, ajustar o município emissor, deixar a inscrição
municipal em branco, ou revisar o código do serviço com o contador. Corrija
o que for indicado em **Configurações › Fiscal** e emita novamente.

Para **cancelar** uma nota autorizada, clique em **Cancelar NFS-e** (ou
**Cancelar registro**, no modo Manual) e informe o motivo. No Emissor
Nacional, o cancelamento junto ao governo tem um prazo que varia por
município — quanto antes, melhor.

## 5. Baixar XML e DANFSe

Com a nota autorizada, os botões **XML** e **DANFSe** no mesmo card baixam,
respectivamente, o arquivo fiscal e o PDF para impressão ou envio ao
paciente.

<div class="nota" markdown="1">
ℹ️ Acesso à tela de Configurações › Fiscal é restrito a **Administrador**.
</div>
