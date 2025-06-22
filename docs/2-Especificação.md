Especificações do Projeto
## Personas

_Para o sistema de reservas do Cucina di Nonna, identificamos três personas principais:_

>Ana Clara, 32 anos, mãe de família
>Perfil: Trabalha em home office e adora levar a família para jantar fora nos fins de semana.
>Necessidade: Quer um jeito rápido de reservar mesa sem ter que ligar, evitando filas e garantindo um bom atendimento para seus filhos.

>Carlos Eduardo, 45 anos, executivo
>Perfil: Tem reuniões de negócios frequentes e busca restaurantes com ambiente tranquilo para almoços rápidos.
>Necessidade: Precisa agendar mesas com antecedência, sem depender de telefonemas ou confirmações demoradas.

>Mariana e Lucas, casal jovem
>Perfil: Gostam de sair para jantares românticos, mas muitas vezes deixam para reservar em cima da hora.
>Necessidade: Querem ver disponibilidade em tempo real e receber confirmação imediata da reserva.

(FOTO DAS PERSONAS, ATUALIZAR ACIMA)

## Histórias de Usuários
EU COMO...	QUERO/PRECISO...	PARA...

>Eu como usuário, quero reservar uma mesa online para 4 pessoas, para evitar esperar no restaurante até que consiga uma mesa pois tenho crianças pequenas.
>
>Eu como cliente, quero escolher uma mesa em área mais silenciosa, para ter reuniões de trabalho sem interrupções e pertubações.
>
>Eu como cliente, quero ter acesso aos horários disponíveis em tempo real, para não depender de telefonemas para conseguir essa informação.
>
>Eu como proprietário, quero acompanhar as reservas de mesa do meu restaurante e quem as solicitou, para ter um controle administrativo melhor do meu estabelecimento

## Requisitos

## Requisitos Funcionais (O QUE o sistema faz):

_RF-001 - Cadastro completo de reservas_

- Campos obrigatórios: nome, telefone, data, horário, número de pessoas
- Validação em tempo real dos dados
- Bloqueio automático de horários já reservados

_RF-002 - Mapa visual de disponibilidade_

- Layout interativo do restaurante mostrando mesas livres/ocupadas
- Cores dinâmicas (verde = disponível, vermelho = ocupado)
- Atualização automática sem precisar recarregar a página

_RF-003 - Seleção de áreas específicas_

- Fotos e descrição de cada setor (varanda, salão interno, área VIP)
- Limite de capacidade por área
- Sugere alternativas quando o setor desejado está lotado

_Requisitos Não-Funcionais (COMO o sistema se comporta):_

- RNF-001 - Performance rápida
- Tempo máximo de resposta: 1.2 segundos para mostrar disponibilidade
- Suporta até 100 usuários simultâneos sem travamento

_RNF-002 - Segurança robusta_

- Criptografia AES-256 para todos os dados
- Certificado SSL válido (HTTPS)
- Dados pessoais são anonimizados após 90 dias

_RNF-003 - Estabilidade garantida_

- Funcionamento 99.7% do tempo (no máximo 2h de queda por mês)
- Backup automático diário dos dados

## Restrições

01 - Entregar o projeto até o final do semestre

02 - Usar apenas tecnologias web (sem app nativo)
