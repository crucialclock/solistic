/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { api } from "@/lib/api"

export const quoteSchema = z.object({
  serviceType: z.string().min(2, "Informe o tipo de serviço (ex: Web, App)."),
  projectName: z.string().min(2, "O nome do projeto é obrigatório."),
  description: z
    .string()
    .min(10, "Explique a ideia com pelo menos 10 caracteres."),
  budgetRange: z.string().optional(),
  deadline: z.string().optional(),
  hasDesign: z.boolean().default(false),
  needsAuth: z.boolean().default(false),
  needsAdminPanel: z.boolean().default(false),
  needsWhatsapp: z.boolean().default(false),
  needsScheduling: z.boolean().default(false),
  needsPayments: z.boolean().default(false),
  needsCatalog: z.boolean().default(false),
  needsOrderTracking: z.boolean().default(false),
  needsNotifications: z.boolean().default(false),
  needsFileUploads: z.boolean().default(false),
  needsCustomerManagement: z.boolean().default(false),
  needsProposalSystem: z.boolean().default(false),
  needsSocialIntegration: z.boolean().default(false),
})

export type QuoteFormInput = z.input<typeof quoteSchema>
export type QuoteFormData = z.output<typeof quoteSchema>

export function useOrcamento() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // AJUSTADO: Agora busca a chave "token" idêntica ao padrão usado pelo seu api.ts
  const isAuthenticated = !!localStorage.getItem("token")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormInput, any, QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      serviceType: "",
      projectName: "",
      description: "",
      budgetRange: "",
      deadline: "",
      hasDesign: false,
      needsAuth: false,
      needsAdminPanel: false,
      needsWhatsapp: false,
      needsScheduling: false,
      needsPayments: false,
      needsCatalog: false,
      needsOrderTracking: false,
      needsNotifications: false,
      needsFileUploads: false,
      needsCustomerManagement: false,
      needsProposalSystem: false,
      needsSocialIntegration: false,
    },
  })

  // Efeito executado ao carregar a página: Restaura os dados se existirem no cache
  useEffect(() => {
    const savedDraft = localStorage.getItem("@App:quote_draft")
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft)
        reset(parsedData) // Injeta os dados salvos de volta no formulário
      } catch (e) {
        console.error("Erro ao restaurar rascunho do orçamento:", e)
      }
    }
  }, [reset])

  async function onSubmit(data: QuoteFormData) {
    // VERIFICAÇÃO CRÍTICA: Se não estiver logado, salva o progresso e envia para o login
    if (!isAuthenticated) {
      localStorage.setItem("@App:quote_draft", JSON.stringify(data))
      // Passa a rota atual via query param para o login saber para onde voltar depois
      navigate("/login?redirectTo=/orcamento")
      return
    }

    try {
      setError("")
      setSuccess(false)
      setLoading(true)

      await api.post("/quotes", data)
      setSuccess(true)

      // Envio feito com sucesso? Remove o rascunho temporário do armazenamento
      localStorage.removeItem("@App:quote_draft")

      setTimeout(() => {
        navigate("/dashboard")
      }, 1800)
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Erro ao enviar a solicitação de orçamento."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    errors,
    error,
    success,
    loading,
    isAuthenticated, // Exportado caso precise tratar algo visual na interface
    onSubmit: handleSubmit(onSubmit),
  }
}
