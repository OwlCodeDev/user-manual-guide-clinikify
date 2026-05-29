---
title: Perfis de acesso
layout: default
parent: Primeiros passos
nav_order: 2
---

# Perfis de acesso

O Clinikify controla o que cada pessoa pode ver e fazer por meio de **perfis**.
Ao convidar um membro da equipe, você escolhe o perfil dele (veja
[Membros e convites](../configuracoes/membros.html)).

## Os três perfis

### 👑 Administrador

Acesso total. Indicado para o(a) responsável pela clínica.

- Configura tudo: perfil da clínica, marca, serviços, modelos de prontuário,
  convênios e regras de faturamento.
- Gerencia a equipe (convida, edita e remove membros).
- Vê todos os pacientes, agendas, faturamento e repasses.

### 🗂️ Recepcionista

Foco na operação do balcão.

- Marca e gerencia consultas na **Agenda**.
- Cadastra e edita **pacientes**.
- Lança cobranças e recebimentos no **Faturamento**.
- Acompanha **Repasses** dos profissionais.

### 🩺 Profissional (médico / dentista)

Foco no atendimento clínico.

- Vê a **própria agenda** e os pacientes que atende.
- Preenche o **prontuário** (notas clínicas, odontograma, planos de tratamento).
- Acessa **Meus documentos**, **Meu certificado** e **Meus repasses**.

## Resumo de permissões

| Recurso | Administrador | Recepcionista | Profissional |
|---|:---:|:---:|:---:|
| Agenda | ✅ | ✅ | ✅ (própria) |
| Pacientes / Prontuário | ✅ | ✅ | ✅ |
| Faturamento | ✅ | ✅ | — |
| Repasses (todos) | ✅ | ✅ | — |
| Meus repasses | — | — | ✅ |
| Configurações da clínica | ✅ | — | — |
| Gerenciar equipe | ✅ | — | — |

<div class="nota" markdown="1">
ℹ️ Um mesmo e-mail pode ter perfis diferentes em clínicas diferentes. Ao
entrar, o sistema usa o perfil correspondente à clínica selecionada.
</div>
