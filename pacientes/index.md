---
title: Pacientes e Prontuário
layout: default
nav_order: 4
has_children: true
---

# Pacientes e Prontuário

Aqui você cadastra os pacientes e acessa o **Prontuário Eletrônico do
Paciente (PEP)** — o histórico clínico completo de cada pessoa.

{% include figura.html src="pacientes/pacientes-lista.png" alt="Lista de pacientes" legenda="Lista de pacientes." %}

## Buscar e cadastrar

- **Buscar:** use o campo de busca por nome ou CPF.
- **Cadastrar:** clique em **Novo paciente** e informe nome, data de
  nascimento, sexo, CPF e contatos (telefone/e-mail).

{% include figura.html src="pacientes/pacientes-novo.png" alt="Novo paciente" legenda="Cadastro de um novo paciente." %}

## A ficha do paciente (Hub)

Ao abrir um paciente, você acessa a **página do paciente**, organizada em
três colunas:

- **Histórico** (esquerda) — a linha do tempo com as evoluções e as
  anamneses respondidas pelo paciente (selo **Paciente**).
- **[Prontuário](prontuario.html)** (centro) — o editor de evoluções, o
  [odontograma](odontograma.html) e os documentos clínicos.
- **Ações** (direita) — seções recolhíveis de Retornos,
  [Exames de imagem](exames-de-imagem.html) e
  [Planos de tratamento](planos-de-tratamento.html), cada uma com um
  botão **+** para a ação principal. Os dados cadastrais ficam no botão
  **Ver dados**, no topo.

## Privacidade e LGPD

<div class="aviso" markdown="1">
⚠️ O prontuário contém dados sensíveis de saúde. O acesso é controlado por
perfil e registrado. Trate as informações conforme a **LGPD** e as normas do
seu conselho profissional.
</div>

### Consentimento para campanhas

Lembretes de consulta são enviados sempre que o paciente tem e-mail e não pediu
para parar. Já as **campanhas** (lembrete de retorno, cobrança em aberto) só
saem para quem tem **consentimento registrado**, como manda a LGPD. Registre de
três jeitos:

- marcando a caixa "O paciente autorizou receber campanhas" no **cadastro**;
- pelo botão **Registrar consentimento** na seção *Comunicação* da ficha;
- automaticamente, quando o paciente marca a caixa na **ficha pública**
  enviada por link.

O link de descadastro que vai em todo e-mail revoga o consentimento na hora. A
tela **Configurações → Campanhas** mostra quantos pacientes já têm consentimento.

### Exportar os dados de um paciente

Na ficha do paciente, quem tem acesso ao prontuário (administrador ou
profissional) encontra **Exportar dados**. O sistema gera um arquivo ZIP com
tudo o que existe sobre aquele paciente, já legível: cadastro, atendimentos,
evoluções, documentos em PDF, exames com anotações, orçamentos e assinaturas,
cobranças, fichas, retornos e odontograma, mais um manifesto com a lista e o
hash de cada arquivo.

Use para atender um pedido de **portabilidade** do paciente (LGPD, art. 18) ou
para guardar o prontuário fora do sistema. O arquivo contém dados sensíveis:
guarde-o com o mesmo cuidado do prontuário.

## Nesta seção

- [Prontuário (PEP)](prontuario.html)
- [Notas clínicas](notas-clinicas.html)
- [Odontograma](odontograma.html)
- [Planos de tratamento](planos-de-tratamento.html)
