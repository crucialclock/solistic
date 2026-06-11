export interface Plano {
  nome: string
  destaque: string
  chamada: string
  ideal: string
  inclui: string[]
  prazo: string
}

export const PLANOS: Plano[] = [
  {
    nome: "Presença Digital",
    destaque: "Para começar rápido",
    chamada: "Profissionais e pequenas empresas na internet.",
    ideal:
      "Ideal para profissionais, autônomos e pequenas empresas que precisam estar presentes na internet.",
    inclui: [
      "Landing Page ou Site Institucional",
      "Domínio (quando contratado)",
      "Hospedagem",
      "Certificado SSL",
      "Formulário de contato",
      "Botão de WhatsApp",
      "Analytics básico",
    ],
    prazo: "5 a 15 dias úteis",
  },
  {
    nome: "Captação de Clientes",
    destaque: "Mais escolhido",
    chamada: "Organize contatos e pedidos de orçamento.",
    ideal:
      "Ideal para empresas que recebem pedidos de orçamento e querem organizar seus contatos.",
    inclui: [
      "Landing Page ou Site",
      "Formulário de contato",
      "Integração com e-mail",
      "Sistema de Leads",
      "Painel administrativo",
      "Analytics",
    ],
    prazo: "10 a 25 dias úteis",
  },
  {
    nome: "Atendimento Automatizado",
    destaque: "WhatsApp inteligente",
    chamada: "WhatsApp como principal canal de atendimento.",
    ideal:
      "Ideal para empresas que utilizam o WhatsApp como principal canal de atendimento.",
    inclui: [
      "Bot de WhatsApp",
      "Menu de atendimento personalizado",
      "Captura de informações do cliente",
      "Encaminhamento para atendente",
      "Mensagens automáticas",
      "Integração com e-mail (opcional)",
    ],
    prazo: "5 a 20 dias úteis",
  },
  {
    nome: "Comercial Completo",
    destaque: "Venda com organização",
    chamada: "Capte, organize e acompanhe clientes em um só lugar.",
    ideal:
      "Ideal para empresas que querem captar, organizar e acompanhar clientes em um único lugar.",
    inclui: [
      "Site ou Landing Page",
      "Bot de WhatsApp",
      "Sistema de Leads",
      "Painel Administrativo",
      "Integração com E-mail",
      "Analytics",
    ],
    prazo: "15 a 30 dias úteis",
  },
  {
    nome: "Operação Interna",
    destaque: "Menos planilha",
    chamada: "Organize processos e reduza controles manuais.",
    ideal:
      "Ideal para empresas que precisam organizar processos internos e reduzir controles manuais.",
    inclui: [
      "Aplicativo Desktop",
      "Banco de Dados",
      "Painel Administrativo (quando necessário)",
      "Backup",
      "Integrações contratadas",
    ],
    prazo: "15 a 60 dias úteis",
  },
  {
    nome: "Plataforma Completa",
    destaque: "Projeto sob medida",
    chamada: "Gestão total de atendimento e operação.",
    ideal:
      "Ideal para empresas que desejam centralizar atendimento, operação e gestão em uma única solução.",
    inclui: [
      "Site ou Landing Page",
      "Sistema Web",
      "Painel Administrativo",
      "API",
      "Banco de Dados",
      "Bot de WhatsApp",
      "Analytics",
      "Hospedagem",
      "Backup",
      "Integrações contratadas",
      "Suporte contínuo",
    ],
    prazo: "Conforme escopo do projeto",
  },
]

export const MANUTENCAO: string[] = [
  "Hospedagem dos serviços contratados",
  "Certificado SSL",
  "Correção de erros",
  "Monitoramento básico",
  "Backups (quando aplicável)",
  "Ajustes simples de conteúdo",
  "Verificação das integrações contratadas",
]

export const NAO_INCLUI: string[] = [
  "Novas funcionalidades",
  "Novos módulos",
  "Novas páginas",
  "Novas integrações",
  "Mudanças de layout completas",
  "Reformulação do projeto",
  "Desenvolvimento fora do escopo contratado",
]
