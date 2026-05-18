import { motion, type Transition } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/creative/form-field"
import { CheckboxField } from "@/components/creative/checkbox-field"
import { PageHeader } from "@/components/creative/page-header"
import { useQuote } from "./useQuote"

const CHECKBOX_FEATURES = [
  { name: "needsAuth", label: "Área de login para clientes ou funcionários" },
  { name: "needsAdminPanel", label: "Painel para gerenciar conteúdos" },
  { name: "needsWhatsapp", label: "Integração com WhatsApp" },
  { name: "needsScheduling", label: "Agendamento de serviços ou horários" },
  { name: "needsPayments", label: "Recebimento de pagamentos online" },
  { name: "needsCatalog", label: "Catálogo de produtos ou serviços" },
  { name: "needsOrderTracking", label: "Área para acompanhar solicitações" },
  { name: "needsNotifications", label: "Sistema de notificações e avisos" },
  {
    name: "needsFileUploads",
    label: "Upload de arquivos, fotos ou documentos",
  },
  {
    name: "needsCustomerManagement",
    label: "Cadastro e gerenciamento de clientes",
  },
  {
    name: "needsProposalSystem",
    label: "Sistema de solicitações ou propostas",
  },
  { name: "needsSocialIntegration", label: "Integração com redes sociais" },
] as const

export function Orcamento() {
  const {
    register,
    errors,
    error,
    success,
    loading,
    isAuthenticated,
    onSubmit,
  } = useQuote()

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="space-y-10 text-left"
      >
        <PageHeader
          title="Solicitar Orçamento"
          subtitle="Informe os requisitos da sua solução para facilitar a análise inicial e o direcionamento da proposta."
        />

        <form onSubmit={onSubmit} className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Nome do Projeto *"
              placeholder="Ex: Gerador de Bingo"
              error={errors.projectName?.message}
              {...register("projectName")}
            />

            <FormField
              label="Tipo de Serviço *"
              placeholder="Ex: Site, app mobile, etc..."
              error={errors.serviceType?.message}
              {...register("serviceType")}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Previsão de Investimento (Opcional)"
              placeholder="Ex: R$ 5.000 - 10.000"
              {...register("budgetRange")}
            />

            <FormField
              label="Prazo Estimado (Opcional)"
              placeholder="Ex: 30 a 45 dias"
              {...register("deadline")}
            />
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-foreground/40 font-mono text-[10px] font-bold tracking-widest uppercase select-none">
              Requisitos e Funcionalidades
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {CHECKBOX_FEATURES.map((item) => (
                <CheckboxField
                  key={item.name}
                  label={item.label}
                  {...register(item.name)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-muted-foreground/70 text-xs font-bold tracking-widest uppercase">
              Descrição dos Requisitos *
            </label>

            <textarea
              {...register("description")}
              placeholder="Descreva o escopo da solução e objetivos da operação..."
              className="border-foreground/10 focus-visible:border-foreground text-foreground min-h-30 w-full rounded-none border bg-transparent p-4 text-base transition-colors outline-none focus-visible:ring-0"
            />

            {errors.description && (
              <span className="mt-0.5 text-xs font-semibold text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          {error && (
            <div className="rounded-none border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-500">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-none border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-sm font-semibold text-green-500">
              Solicitação de orçamento enviada com sucesso! Redirecionando...
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || success}
            className="group border-foreground bg-foreground text-background hover:bg-background hover:text-foreground relative h-16 cursor-pointer rounded-none px-12 text-lg font-bold tracking-[0.2em] uppercase transition-all duration-300 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
          >
            {loading
              ? "Processando..."
              : isAuthenticated
                ? "Enviar Solicitação"
                : "Entrar e Enviar Solicitação"}

            <span className="absolute bottom-2 h-px w-0 bg-current transition-all duration-300 group-hover:w-[70%]" />
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
