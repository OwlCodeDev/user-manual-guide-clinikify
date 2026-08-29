---
title: Permissões por usuário
layout: default
parent: Configurações
nav_order: 10
---

# Permissões por usuário

Além do perfil (**Administrador**, **Recepção** ou **Profissional**), dá
para ajustar o que uma pessoa específica pode ver e fazer, módulo por
módulo. Use isso quando alguém precisa de uma exceção ao que o perfil dela
libera por padrão.

{% include figura.html src="configuracoes/permissoes-usuario.png" alt="Permissões por usuário" legenda="Ajuste fino de permissões de um usuário." %}

## Onde configurar

1. Vá em **Configurações** → **Permissões**.
2. Escolha o **usuário** na lista.
3. A tela mostra o padrão do perfil dele e as capacidades disponíveis,
   agrupadas por área (Agenda, Financeiro, Estoque, Cobrança do paciente
   etc.).
4. Marque ou desmarque uma capacidade para abrir uma exceção — o item
   alterado aparece marcado como **(modificado)**.
5. Clique em **Salvar**.

A mudança vale a partir da próxima ação da pessoa; ela não precisa sair e
entrar de novo.

<div class="nota" markdown="1">
ℹ️ Só o **Administrador** acessa esta tela.
</div>

## Como funciona

- Cada perfil já vem com um conjunto padrão de capacidades — por exemplo,
  a Recepção lança cobranças por padrão; o Profissional só vê o
  financeiro, sem lançar.
- Uma marcação **diferente do padrão do perfil** é uma exceção: ligar uma
  capacidade que o perfil não tem por padrão **concede** o acesso;
  desligar uma que o perfil já tem por padrão **retira**.
- Clique em **Descartar** para desfazer alterações que ainda não foram
  salvas.

## Exemplos práticos

- **Recepcionista que não deve cancelar cobranças:** desmarque "Cancelar
  transação" no bloco Financeiro para essa pessoa.
- **Profissional que também cuida do estoque:** marque "Movimentar
  estoque" e "Ajustar saldo" no bloco Estoque para esse profissional.
- **Recepcionista de confiança que também ajusta permissões:** marque
  "Gerir permissões dos usuários" no bloco Administração — use com
  cautela, pois essa pessoa passa a poder alterar o acesso de qualquer
  outro usuário.

<div class="dica" markdown="1">
💡 Para dar acesso a alguém novo, primeiro convide-a em
[Membros e convites](membros.html) e escolha o perfil dela. Só depois, se
precisar de um ajuste fino, venha até aqui.
</div>
