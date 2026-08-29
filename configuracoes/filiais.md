---
title: Filiais
layout: default
parent: Configurações
nav_order: 9
---

# Filiais

Se a clínica tem mais de um endereço, cada um é uma **filial** dentro da
mesma conta. Toda clínica já nasce com uma filial chamada **Matriz
Principal** — se você atende em um único endereço, é a única que existe e
não muda nada no seu dia a dia.

<div class="nota" markdown="1">
ℹ️ Filial é diferente de convênio, profissional ou usuário — é o **endereço
físico** onde o atendimento acontece.
</div>

## O que é separado por filial

Cada registro pertence a uma filial:

- **Agenda** — os agendamentos de uma filial não aparecem na agenda de
  outra.
- **Prontuário e planos de tratamento** — evoluções e procedimentos ficam
  vinculados à filial onde o atendimento ocorreu.
- **Caixa / faturamento** — cobranças e recebimentos são lançados na filial
  do atendimento.

## Acesso por filial

O acesso de cada pessoa da equipe pode ser restrito a uma ou mais filiais
específicas:

- **Administrador** enxerga todas as filiais da clínica por padrão.
- **Recepcionista** e **Profissional** só enxergam as filiais para as quais
  receberam acesso explícito.

Isso é usado, por exemplo, para dar a um gestor de unidade acesso apenas à
filial que ele administra, sem ver os dados da Matriz nem de outras
unidades — o modelo típico de uma clínica com **franquias**.

## Identidade fiscal por filial

Cada filial tem seu próprio **CNPJ**, **inscrição municipal** e **regime
tributário** — as notas fiscais emitidas em uma unidade usam os dados
daquela unidade, não os da Matriz. Veja
[Nota fiscal (NFS-e)](../faturamento/nota-fiscal.html).

<div class="aviso" markdown="1">
⚠️ Nesta versão, cadastrar uma nova filial e configurar o acesso restrito de
um usuário a uma unidade específica são feitos junto com o suporte
Clinikify — ainda não há uma tela de autoatendimento para isso. Fale com o
suporte informando o nome da nova unidade e quem deve ter acesso a ela.
</div>

<div class="nota" markdown="1">
ℹ️ Quem tem acesso a mais de uma filial usa, por enquanto, a unidade
principal vinculada à sua conta — a troca de unidade ativa dentro do
sistema está no roteiro futuro do produto.
</div>
