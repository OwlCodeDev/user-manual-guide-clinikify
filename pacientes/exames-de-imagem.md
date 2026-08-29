---
title: Exames de imagem
layout: default
parent: Pacientes e Prontuário
nav_order: 6
---

# Exames de imagem

Anexe panorâmicas, radiografias periapicais, fotos clínicas e laudos em PDF
diretamente na página do paciente. Os arquivos ficam **criptografados** junto
ao prontuário, e imagens (não PDFs) podem ser abertas num visualizador com
zoom e marcações.

{% include figura.html src="pacientes/exames-secao.png" alt="Seção Exames de imagem" legenda="Seção 'Exames de imagem' na página do paciente." %}

## Anexar um exame

1. Na página do paciente, abra a seção **Exames de imagem** na barra lateral direita.
2. Clique em **Anexar exame** (ou no **+** do cabeçalho da seção).
3. Escolha o arquivo — **JPEG, PNG, WebP ou PDF**.
4. Selecione o **tipo**: panorâmica, periapical, cefalométrica, foto intraoral ou outro.
5. Confira a **data do exame** e, se quiser, adicione uma **descrição**.
6. Clique em **Enviar**.

Qualquer pessoa da equipe pode anexar um exame — é comum a recepção digitalizar
radiografias trazidas de um centro de imagem externo e anexá-las por aqui.

<div class="nota" markdown="1">
ℹ️ Se você anexar um exame com uma evolução aberta no prontuário, ele recebe o
selo **Desta evolução** — assim fica claro qual exame pertence a qual
atendimento.
</div>

## Quem pode ver a imagem

Anexar é liberado para toda a equipe, mas **abrir e visualizar** a imagem é
restrito ao profissional (médico/dentista) e ao administrador — a mesma regra
de acesso do restante do prontuário clínico. Um PDF continua sendo aberto
pelo próprio visualizador do navegador, sem passar pelas ferramentas de
marcação (que só valem para imagens).

## O visualizador com marcações

Clique em **Ver** num exame de imagem para abrir o visualizador.

- **Zoom e posição**: use a roda do mouse, os botões de ampliar/reduzir, ou o
  gesto de pinça no tablet/celular. **Ajustar à janela** volta ao enquadramento
  inicial.
- **Marcações**: ferramentas de traço livre, seta, retângulo, elipse e rótulo
  de texto, em várias cores — úteis para apontar uma lesão, um dente ou uma
  região de interesse antes de mostrar ao paciente.
- **Desfazer** e **Refazer** funcionam durante a edição; **Salvar** grava uma
  nova versão das marcações.
- A imagem original **nunca é alterada**: cada marcação salva vira uma nova
  versão, e dá para reabrir versões anteriores pelo menu de versões, no topo —
  nada se perde.
- O visualizador pode abrir numa **janela separada**, que dá para arrastar
  para um segundo monitor. Se o navegador bloquear a janela, o exame abre num
  painel ao lado, dentro da própria tela.

<div class="dica" markdown="1">
💡 As marcações não "queimam" na imagem — elas ficam numa camada por cima do
exame original, que continua servindo como prova, sem edição.
</div>

## Espelhar numa sala de exame

Para acompanhar o exame numa segunda tela — por exemplo, um tablet fixado na
cadeira do procedimento —, use o espelhamento:

1. No visualizador, clique no ícone **Espelhar no tablet** (o ícone de QR code),
   no topo da tela.
2. Um **QR code** aparece.
3. No tablet, abra a câmera e escaneie o código — ele abre direto o mesmo
   exame, já sincronizado. Se o tablet ainda não estiver logado, é pedido
   login antes de entrar na sala.
4. A partir daí, zoom, posição e marcações feitas em qualquer um dos
   dispositivos aparecem no outro em tempo real.

O código do QR é de uso único e expira em 5 minutos; use **Novo código** para
gerar outro, ou **Encerrar sala** para parar o espelhamento.

<div class="nota" markdown="1">
ℹ️ Se precisar remover um exame anexado por engano, use **Excluir** na
listagem.
</div>
