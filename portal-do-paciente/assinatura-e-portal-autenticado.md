---
title: Assinatura e portal autenticado
layout: default
parent: Portal do paciente
nav_order: 1
---

# Assinatura e portal autenticado

## Assinatura eletrônica de documentos

Use esse recurso para o paciente **aprovar um orçamento à distância**, sem
precisar vir à clínica assinar no papel.

1. Abra o [Plano de tratamento](../pacientes/planos-de-tratamento.html) do
   paciente e deixe-o com status **Proposta**.
2. Na aba de assinatura do plano, clique em **Gerar link de assinatura**.
3. **Copie** o link e envie ao paciente (WhatsApp, e-mail etc.).

{% include figura.html src="portal-do-paciente/assinatura-gerar-link.png" alt="Gerar link de assinatura" legenda="Geração do link de assinatura de um orçamento." %}

4. O paciente abre o link, vê o orçamento (PDF) e o texto de aceite, digita
   o nome e confirma — sem precisar de login nem de certificado digital.
5. Ao assinar, o plano muda automaticamente de **Proposta** para
   **Aprovado**.

Depois de assinado, a clínica vê a **prova da assinatura** direto no plano:
data/hora, nome de quem assinou, IP e um código (hash) que garante que o
documento não foi alterado depois. O botão **Baixar PDF assinado**
disponibiliza o documento para download a qualquer momento.

{% include figura.html src="portal-do-paciente/assinatura-evidencia.png" alt="Evidência da assinatura" legenda="Evidência da assinatura eletrônica no plano." %}

<div class="nota" markdown="1">
ℹ️ O link de assinatura só pode ser gerado enquanto o plano está em
**Proposta**. Se o plano voltar para **Rascunho** ou já estiver **Aprovado**
por outra via, gere um novo link quando fizer sentido.
</div>

<div class="aviso" markdown="1">
⚠️ Essa é uma assinatura eletrônica simples — a mesma usada por contratos
digitais no mercado. A força jurídica vem do rastro de evidências (data,
IP, texto aceito), não de um certificado digital do paciente. É diferente
da assinatura de documentos clínicos pelo profissional, que usa certificado
ICP-Brasil.
</div>

## Portal autenticado (Minhas consultas e Meus documentos)

O paciente pode acompanhar seu histórico na clínica sem precisar ligar para
a recepção:

1. O paciente abre o **link do portal** (ou lê o QR code) e informa **CPF**
   e **data de nascimento**.
2. Recebe um **código de 6 dígitos por e-mail** e digita na tela de login —
   não usa senha.
3. Ao entrar, vê duas abas: **Minhas consultas** (com filtro de próximas e
   passadas) e **Meus documentos** (documentos já liberados, com opção de
   baixar o PDF).

{% include figura.html src="portal-do-paciente/portal-autenticado-home.png" alt="Portal autenticado do paciente" legenda="Tela do portal autenticado, abas Consultas e Documentos." %}

O portal é **só leitura**: o paciente não remarca nem cancela por lá — para
isso, ele ainda fala com a recepção.

<div class="nota" markdown="1">
ℹ️ O link e o QR code do portal ficam em **Configurações → Perfil da
clínica**, ao lado do link de agendamento online.
</div>

<div class="dica" markdown="1">
💡 O paciente só consegue entrar se tiver um **e-mail cadastrado** na
ficha. Sem contato válido, oriente-o a atualizar o cadastro com a recepção
antes de indicar o portal.
</div>

<div class="aviso" markdown="1">
⚠️ Um paciente que já pediu para ser **esquecido** (direito LGPD de
exclusão) não consegue mais entrar no portal — os dados de contato usados
para login não existem mais.
</div>
