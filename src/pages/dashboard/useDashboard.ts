/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "@/lib/api"

import type { PaginationMeta } from "@/components/creative/pagination-control"

export interface UserData {
  id: string
  name: string
  email: string
  role: "USER" | "ADMIN"
}

export interface QuoteData {
  id: string
  project_name: string
  service_type: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "IN_PROGRESS" | "DONE"
  created_at: string
}

export function useDashboard() {
  const navigate = useNavigate()

  // Recupera usuário salvo para evitar tela vazia ao recarregar
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("@App:cached_user")

    return savedUser ? JSON.parse(savedUser) : null
  })

  // Recupera orçamentos salvos para carregamento inicial mais rápido
  const [quotes, setQuotes] = useState<QuoteData[]>(() => {
    const savedQuotes = localStorage.getItem("@App:cached_quotes")

    return savedQuotes ? JSON.parse(savedQuotes) : []
  })

  // Filtro atual da listagem
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  // Página atual da paginação
  const [page, setPage] = useState<number>(1)

  // Metadados retornados pela API
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(
    null
  )

  // Só mostra loading inicial se não houver cache útil
  const [loading, setLoading] = useState(!user || quotes.length === 0)

  // Mensagem de erro amigável
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function initDashboard() {
      // Garante que só usuário logado acessa o painel
      const token = localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      try {
        // Busca usuário e orçamentos em paralelo
        const [userRes, quotesRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/quotes/my", {
            params: {
              page,
              limit: 3,
              status: statusFilter,
            },
          }),
        ])

        if (!isMounted) return

        const userData = userRes.data?.data?.user

        // Atualiza usuário e sincroniza cache local
        if (userData) {
          setUser(userData)

          localStorage.setItem("@App:cached_user", JSON.stringify(userData))
        }

        const fetchedQuotes: QuoteData[] = quotesRes.data?.data?.quotes || []

        const metaData: PaginationMeta = quotesRes.data?.data?.meta || null

        setQuotes(fetchedQuotes)
        setPaginationMeta(metaData)

        // Mantém cache apenas da listagem padrão
        if (page === 1 && statusFilter === "ALL") {
          localStorage.setItem(
            "@App:cached_quotes",
            JSON.stringify(fetchedQuotes)
          )
        }

        // Limpa erro após sincronização bem-sucedida
        setError("")
      } catch (err: any) {
        if (!isMounted) return

        // Token inválido remove sessão local
        if (err.response?.status === 401) {
          localStorage.removeItem("token")
          localStorage.removeItem("@App:cached_user")
          localStorage.removeItem("@App:cached_quotes")

          navigate("/login")
          return
        }

        setError("Erro ao sincronizar dados com o painel.")
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initDashboard()

    return () => {
      isMounted = false
    }
  }, [navigate, page, statusFilter])

  // Atualiza filtro e reinicia paginação
  function handleStatusFilterChange(newStatus: string) {
    setLoading(true)

    setStatusFilter(newStatus)

    setPage(1)
  }

  // Troca a página atual
  function handlePageChange(newPage: number) {
    setLoading(true)

    setPage(newPage)
  }

  // Remove sessão local e volta para login
  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("@App:cached_user")
    localStorage.removeItem("@App:cached_quotes")

    navigate("/login")
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
    user,

    quotes,

    statusFilter,
    setStatusFilter: handleStatusFilterChange,

    page,
    setPage: handlePageChange,

    paginationMeta,

    loading,
    error,

    handleLogout,

    getStatusStyle,
  }
}
