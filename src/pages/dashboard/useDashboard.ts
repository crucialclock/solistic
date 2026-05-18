/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { api } from "@/lib/api"

export const profileSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Insira um e-mail válido."),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export interface UserData {
  id: string
  name: string
  email: string
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
  const [user, setUser] = useState<UserData | null>(null)
  const [quotes, setQuotes] = useState<QuoteData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    async function initDashboard() {
      // Ajustado: Checagem proativa local de sessão para evitar hits inúteis na API
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/login")
        return
      }

      try {
        setError("")

        // Dispara em paralelo as chamadas de perfil e listagem de orçamentos
        const [userRes, quotesRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/quotes/my"),
        ])

        const userData = userRes.data?.data?.user
        if (userData) {
          setUser(userData)
          setValue("name", userData.name)
          setValue("email", userData.email)
        }

        setQuotes(quotesRes.data?.data?.quotes || [])
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Erro ao carregar os dados do painel."
        setError(message)

        // Se o servidor rejeitar as credenciais, limpa a chave alinhada e desloga
        if (err.response?.status === 401) {
          localStorage.removeItem("token")
          navigate("/login")
        }
      } finally {
        setLoading(false)
      }
    }

    initDashboard()
  }, [setValue, navigate])

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  async function onSaveProfile(data: ProfileFormData) {
    try {
      setIsSaving(true)
      setError("")

      // Simulação ou chamada PUT real para salvar dados cadastrais no banco
      setUser((prev) =>
        prev ? { ...prev, name: data.name, email: data.email } : null
      )
    } catch (err: any) {
      setError("Erro ao salvar as alterações do perfil.")
    } finally {
      setIsSaving(false)
    }
  }

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
    loading,
    error,
    isSaving,
    errors,
    register,
    handleLogout,
    getStatusStyle,
    onSaveProfile: handleSubmit(onSaveProfile),
  }
}
