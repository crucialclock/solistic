import { motion, type Transition } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { useOrcamento } from "./useOrcamento"

import { FormField } from "@/components/creative/form-field"
import { CheckboxField } from "@/components/creative/checkbox-field"

export function Orcamento() {
  const {
    register,
    errors,
    error,
    success,
    loading,
    isAuthenticated,
    onSubmit,
  } = useOrcamento()

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="w-full max-w-2xl"
      >
        <Card className="rounded-none border-none bg-transparent p-0 shadow-none ring-0">
          <CardHeader className="space-y-2 p-0 text-center sm:text-left">
            <CardTitle className="text-3xl font-bold tracking-tighter uppercase sm:text-4xl">
              Solicitar Orçamento
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Informe os requisitos da sua solução para facilitar a análise
              inicial e o direcionamento da proposta.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <form onSubmit={onSubmit} className="flex flex-col gap-6 text-left">
              {/* DADOS BÁSICOS */}
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

              {/* ESTIMATIVAS */}
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

              {/* FUNCIONALIDADES */}
              <div className="flex flex-col gap-3">
                <h4 className="text-muted-foreground/60 mb-1 text-xs font-bold tracking-widest uppercase">
                  Requisitos e Funcionalidades
                </h4>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <CheckboxField
                    label="Área de login para clientes ou funcionários"
                    {...register("needsAuth")}
                  />

                  <CheckboxField
                    label="Painel para gerenciar conteúdos"
                    {...register("needsAdminPanel")}
                  />

                  <CheckboxField
                    label="Integração com WhatsApp"
                    {...register("needsWhatsapp")}
                  />

                  <CheckboxField
                    label="Agendamento de serviços ou horários"
                    {...register("needsScheduling")}
                  />

                  <CheckboxField
                    label="Recebimento de pagamentos online"
                    {...register("needsPayments")}
                  />

                  <CheckboxField
                    label="Catálogo de produtos ou serviços"
                    {...register("needsCatalog")}
                  />

                  <CheckboxField
                    label="Área para acompanhar solicitações"
                    {...register("needsOrderTracking")}
                  />

                  <CheckboxField
                    label="Sistema de notificações e avisos"
                    {...register("needsNotifications")}
                  />

                  <CheckboxField
                    label="Upload de arquivos, fotos ou documentos"
                    {...register("needsFileUploads")}
                  />

                  <CheckboxField
                    label="Cadastro e gerenciamento de clientes"
                    {...register("needsCustomerManagement")}
                  />

                  <CheckboxField
                    label="Sistema de solicitações ou propostas"
                    {...register("needsProposalSystem")}
                  />

                  <CheckboxField
                    label="Integração com redes sociais"
                    {...register("needsSocialIntegration")}
                  />
                </div>
              </div>

              {/* TEXTAREA DE DESCRIÇÃO */}
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
                  <span className="text-xs font-semibold text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {error && (
                <div className="rounded-none bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-500">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-none bg-green-500/10 px-4 py-3 text-center text-sm font-semibold text-green-500">
                  Solicitação de orçamento enviada com sucesso!
                  Redirecionando...
                </div>
              )}

              <Button
                disabled={loading || success}
                asChild
                className="group border-foreground bg-foreground text-background hover:bg-background hover:text-foreground relative h-16 cursor-pointer rounded-none px-12 text-lg font-bold tracking-[0.2em] uppercase transition-all duration-300 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
              >
                <button type="submit" className="focus:outline-none">
                  {loading
                    ? "Processando..."
                    : isAuthenticated
                      ? "Enviar Solicitação"
                      : "Entrar e Enviar Solicitação"}

                  <span className="absolute bottom-2 h-px w-0 bg-current transition-all duration-300 group-hover:w-[70%]" />
                </button>
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
