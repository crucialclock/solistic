/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "@/lib/api"

import type { PaginationMeta } from "@/components/creative/pagination-control"

export interface AdminQuoteData {
  id: string
  project_name: string
  service_type: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "IN_PROGRESS" | "DONE"
  created_at: string

  // Dados extras visíveis para administradores
  user_name?: string
  user_email?: string
}

export function useAdminDashboard() {
  const navigate = useNavigate()

  // Lista principal de orçamentos
  const [quotes, setQuotes] = useState<AdminQuoteData[]>([])

  // Filtro atual de status
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  // Busca textual
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Página atual da listagem
  const [page, setPage] = useState<number>(1)

  // Metadados da paginação
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(
    null
  )

  // Estado global de carregamento
  const [loading, setLoading] = useState(true)

  // Mensagem de erro amigável
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function fetchAdminQuotes() {
      // Proteção básica caso o token suma
      const token = localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      try {
        // Busca paginada de orçamentos
        const response = await api.get("/quotes", {
          params: {
            page,
            limit: 3,
            status: statusFilter,

            // Evita mandar busca vazia
            search: searchTerm.trim() !== "" ? searchTerm : undefined,
          },
        })

        if (!isMounted) return

        const fetchedQuotes: AdminQuoteData[] =
          response.data?.data?.quotes || []

        const metaData: PaginationMeta = response.data?.data?.meta || null

        // Ordena do mais recente para o mais antigo
        const sorted = fetchedQuotes.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        setQuotes(sorted)
        setPaginationMeta(metaData)

        // Limpa erro após sucesso
        setError("")
      } catch (err: any) {
        if (!isMounted) return

        // Usuário sem permissão cai no dashboard comum
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/dashboard")
          return
        }

        setError("Erro ao sincronizar a fila global com o servidor.")
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    // Debounce simples para não consultar a API toda tecla
    const delayDebounceFn = setTimeout(
      () => {
        fetchAdminQuotes()
      },
      searchTerm.trim() !== "" ? 300 : 0
    )

    return () => {
      isMounted = false

      clearTimeout(delayDebounceFn)
    }
  }, [navigate, page, statusFilter, searchTerm])

  // Atualiza filtro e reinicia paginação
  function handleStatusFilterChange(newStatus: string) {
    setLoading(true)

    setStatusFilter(newStatus)

    setPage(1)
  }

  // Atualiza termo de busca e reinicia paginação
  function handleSearchTermChange(newTerm: string) {
    setLoading(true)

    setSearchTerm(newTerm)

    setPage(1)
  }

  // Troca de página
  function handlePageChange(newPage: number) {
    setLoading(true)

    setPage(newPage)
  }

  // Define as cores visuais de cada status
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
    quotes,

    // Total global retornado pela API
    totalCount: paginationMeta?.totalItems || 0,

    statusFilter,
    setStatusFilter: handleStatusFilterChange,

    searchTerm,
    setSearchTerm: handleSearchTermChange,

    page,
    setPage: handlePageChange,

    paginationMeta,

    loading,
    error,

    getStatusStyle,
  }
}
