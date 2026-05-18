/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { api } from "@/lib/api"

// Estrutura detalhada do orçamento carregado
export interface DetailedQuoteData {
  id: string
  user_id: string

  service_type: string
  project_name: string
  description: string

  budget_range?: string
  deadline?: string

  has_design: boolean
  needs_auth: boolean
  needs_admin_panel: boolean
  needs_whatsapp: boolean

  needs_scheduling?: boolean
  needs_payments?: boolean
  needs_catalog?: boolean
  needs_order_tracking?: boolean
  needs_notifications?: boolean
  needs_file_uploads?: boolean
  needs_customer_management?: boolean
  needs_proposal_system?: boolean
  needs_social_integration?: boolean

  status: "PENDING" | "APPROVED" | "REJECTED" | "IN_PROGRESS" | "DONE"

  created_at: string

  // Dados extras disponíveis para admins
  user_name?: string
  user_email?: string
}

// Extrai a role diretamente do JWT salvo localmente
function getRoleFromToken(token: string | null): "USER" | "ADMIN" {
  if (!token) return "USER"

  try {
    const payload = token.split(".")[1]

    const decoded = JSON.parse(atob(payload))

    return decoded.role === "ADMIN" ? "ADMIN" : "USER"
  } catch {
    return "USER"
  }
}

export function useQuoteDetails() {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  // Token atual salvo localmente
  const token = localStorage.getItem("token")

  // Role inferida direto do JWT
  const userRole = getRoleFromToken(token)

  const isAdmin = userRole === "ADMIN"

  // Carregamento instantâneo via cache local
  const [quote, setQuote] = useState<DetailedQuoteData | null>(() => {
    try {
      // Admin e usuário usam caches diferentes
      const cacheKey = isAdmin
        ? "@App:admin_cached_quotes"
        : "@App:cached_quotes"

      const savedQuotes = localStorage.getItem(cacheKey)

      if (savedQuotes && id) {
        const parsed: any[] = JSON.parse(savedQuotes)

        const found = parsed.find((q) => q.id === id)

        // Normaliza possíveis diferenças de nomenclatura
        if (found) {
          return {
            ...found,

            user_name: found.user_name || found.userName,

            user_email: found.user_email || found.userEmail,

            budget_range: found.budget_range || found.budgetRange,

            has_design: found.has_design ?? found.hasDesign,

            needs_auth: found.needs_auth ?? found.needsAuth,

            needs_admin_panel: found.needs_admin_panel ?? found.needsAdminPanel,

            needs_whatsapp: found.needs_whatsapp ?? found.needsWhitespace,

            needs_scheduling: found.needs_scheduling ?? found.needsScheduling,

            needs_payments: found.needs_payments ?? found.needsPayments,

            needs_catalog: found.needs_catalog ?? found.needsCatalog,

            needs_order_tracking:
              found.needs_order_tracking ?? found.needsOrderTracking,

            needs_notifications:
              found.needs_notifications ?? found.needsNotifications,

            needs_file_uploads:
              found.needs_file_uploads ?? found.needsFileUploads,

            needs_customer_management:
              found.needs_customer_management ?? found.needsCustomerManagement,

            needs_proposal_system:
              found.needs_proposal_system ?? found.needsProposalSystem,

            needs_social_integration:
              found.needs_social_integration ?? found.needsSocialIntegration,
          }
        }
      }
    } catch (e) {
      console.error("Erro ao ler rascunho do cache local:", e)
    }

    return null
  })

  // Só entra em loading se não houver cache inicial
  const [loading, setLoading] = useState(!quote)

  // Loading específico para mutações
  const [mutating, setMutating] = useState(false)

  // Mensagem de erro amigável
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchQuote() {
      // Usuário não autenticado volta para login
      if (!token) {
        navigate("/login")
        return
      }

      try {
        setError("")

        // Busca versão atualizada do orçamento
        const response = await api.get(`/quotes/${id}`)

        const freshQuote = response.data?.data?.quote || null

        if (freshQuote) {
          setQuote(freshQuote)
        }
      } catch (err: any) {
        // Sessão inválida limpa o token
        if (err.response?.status === 401) {
          localStorage.removeItem("token")

          navigate("/login")

          return
        }

        // Só mostra erro se não houver cache exibido
        if (!quote) {
          setError(
            err.response?.data?.message || "Erro ao carregar os detalhes."
          )
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchQuote()
    }

    // Ignora dependências extras intencionalmente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate])

  // Atualiza status do orçamento
  async function updateStatus(
    newStatus: "PENDING" | "APPROVED" | "REJECTED" | "IN_PROGRESS" | "DONE"
  ) {
    try {
      setMutating(true)

      setError("")

      await api.patch(`/quotes/${id}/status`, {
        status: newStatus,
      })

      // Atualização otimista da interface
      setQuote((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
            }
          : null
      )

      // Invalida caches antigos
      localStorage.removeItem("@App:admin_cached_quotes")
      localStorage.removeItem("@App:cached_quotes")
    } catch (err: any) {
      setError(err.response?.data?.message || "Falha ao atualizar o status.")
    } finally {
      setMutating(false)
    }
  }

  // Remove orçamento permanentemente
  async function deleteQuote() {
    if (!window.confirm("Deseja excluir permanentemente este orçamento?")) {
      return
    }

    try {
      setMutating(true)

      setError("")

      await api.delete(`/quotes/${id}`)

      // Limpa caches após exclusão
      localStorage.removeItem("@App:admin_cached_quotes")
      localStorage.removeItem("@App:cached_quotes")

      // Redireciona conforme a role
      navigate(isAdmin ? "/admin" : "/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Falha ao deletar o registro.")
    } finally {
      setMutating(false)
    }
  }

  // Define cores visuais de status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 text-amber-500"

      case "APPROVED":
        return "bg-blue-500/10 text-blue-500"

      case "IN_PROGRESS":
        return "bg-indigo-500/10 text-indigo-500"

      case "DONE":
        return "bg-green-500/10 text-green-500"

      default:
        return "bg-red-500/10 text-red-500"
    }
  }

  return {
    id,

    quote,

    loading,
    mutating,

    error,

    isAdmin,

    updateStatus,
    deleteQuote,

    getStatusStyle,

    // Volta para página anterior
    handleBack: () => navigate(-1),
  }
}
