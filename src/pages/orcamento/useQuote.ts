/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { api } from "@/lib/api"

// Schema local casado com as novas especificações do Zod do backend
const quoteFormSchema = z.object({
  projectName: z.string().min(2, "O nome do projeto é obrigatório."),
  serviceType: z.string().min(2, "O tipo de serviço é obrigatório."),
  budgetRange: z.string().optional(),
  deadline: z.string().optional(),
  description: z
    .string()
    .min(10, "A descrição deve conter pelo menos 10 caracteres."),
  needsAuth: z.boolean().optional(),
  needsAdminPanel: z.boolean().optional(),
  needsWhatsapp: z.boolean().optional(),
  needsScheduling: z.boolean().optional(),
  needsPayments: z.boolean().optional(),
  needsCatalog: z.boolean().optional(),
  needsOrderTracking: z.boolean().optional(),
  needsNotifications: z.boolean().optional(),
  needsFileUploads: z.boolean().optional(),
  needsCustomerManagement: z.boolean().optional(),
  needsProposalSystem: z.boolean().optional(),
  needsSocialIntegration: z.boolean().optional(),
})

type QuoteFormData = z.infer<typeof quoteFormSchema>

export function useQuote() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // Coleta o token diretamente do armazenamento síncrono do navegador
  const token = localStorage.getItem("token")

  // CORREÇÃO: O estado já nasce computado com o valor síncrono do token, eliminando o useEffect
  const [isAuthenticated] = useState<boolean>(!!token)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
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

  async function onSubmit(data: QuoteFormData) {
    try {
      setLoading(true)
      setError("")

      // Coleta dinamicamente apenas as chaves booleanas que o usuário marcou como true
      const selectedFeatures: string[] = []
      const featureKeys = [
        "needsAuth",
        "needsAdminPanel",
        "needsWhatsapp",
        "needsScheduling",
        "needsPayments",
        "needsCatalog",
        "needsOrderTracking",
        "needsNotifications",
        "needsFileUploads",
        "needsCustomerManagement",
        "needsProposalSystem",
        "needsSocialIntegration",
      ]

      featureKeys.forEach((key) => {
        if ((data as any)[key] === true) {
          selectedFeatures.push(key) // Ex: "needsAuth"
        }
      })

      const normalizedPayload = {
        projectName: data.projectName,
        serviceType: data.serviceType,
        description: data.description,
        budgetRange: data.budgetRange?.trim() || undefined,
        deadline: data.deadline?.trim() || undefined,

        // Enviamos como uma lista limpa de strings
        features: selectedFeatures,
      }

      if (!isAuthenticated) {
        sessionStorage.setItem(
          "@App:draft_quote",
          JSON.stringify(normalizedPayload)
        )
        navigate("/login?redirectTo=/orcamento")
        return
      }

      await api.post("/quotes", normalizedPayload)
      setSuccess(true)

      localStorage.removeItem("@App:cached_quotes")
      localStorage.removeItem("@App:admin_cached_quotes")

      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Falha ao registrar solicitação.")
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
    isAuthenticated,
    onSubmit: handleSubmit(onSubmit),
  }
}
