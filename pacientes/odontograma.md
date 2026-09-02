---
title: Odontograma
layout: default
parent: Pacientes e Prontuário
nav_order: 3
---

# Odontograma

Para clínicas **odontológicas**, o odontograma é o mapa dental do paciente:
um diagrama de todos os dentes onde você registra condições, procedimentos
realizados e planejados.

{% include figura.html src="pacientes/odontograma.png" alt="Odontograma" legenda="Odontograma central do paciente, com o histórico por dente ao lado." %}

## Como usar

1. Abra o prontuário do paciente e clique em **Abrir odontograma**
   (na coluna de ações, seção _Odontograma_ — no celular, na aba
   **Ações**). O mapa abre por cima da tela, então uma evolução em
   andamento não se perde.
2. Clique no **dente** (ou na face do dente) que deseja marcar.
3. Selecione o **estado** e as **condições** (cárie, restauração, etc.).
4. Cada marcação fica registrada no **histórico** ao lado — com autor,
   data e origem. Nada se perde entre consultas: o odontograma é do
   paciente, não da evolução.

## Dentição infantil (decíduos)

Use o botão **Decíduo (infantil)** no topo da área para alternar para o
odontograma de 20 dentes (FDI 51–85) — ideal para odontopediatria e
acompanhamento de dentição mista.

## Histórico por dente

O painel **Histórico** lista tudo o que já aconteceu na boca do
paciente. Filtre por dente para ver a linha do tempo daquele elemento:
marcações manuais, procedimentos executados de planos de tratamento e a
importação inicial do prontuário antigo (quando houver).

## Odontograma na evolução

Ao **assinar** uma evolução que tem odontograma, o sistema guarda nela a
boca inteira como estava naquele momento — o registro imutável da
consulta. Na leitura da evolução assinada, o odontograma abre em
**Esta consulta**, mostrando só os dentes marcados desde a evolução
assinada anterior (o que foi feito naquela visita). O botão **Boca
completa** mostra o mapa inteiro congelado na assinatura.

{% include figura.html src="pacientes/odontograma-evolucao.png" alt="Odontograma na evolução assinada" legenda="Evolução assinada: só os dentes marcados naquela consulta, com a boca completa a um clique." %}

## Relação com os planos de tratamento

Ao **executar** um procedimento de um
[Plano de tratamento](planos-de-tratamento.html) que indica dentes, o
sistema registra automaticamente o procedimento no histórico do dente —
por exemplo, "Restauração no 36 (oclusal)" aparece na linha do tempo sem
digitação extra.

<div class="nota" markdown="1">
ℹ️ A disponibilidade do odontograma depende do tipo de clínica (vertical
odontológica). Se a sua clínica não for odontológica, esta aba pode não
aparecer.
</div>
