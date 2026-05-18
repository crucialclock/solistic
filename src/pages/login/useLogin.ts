/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { api } from "@/lib/api"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Insira um e-mail válido."),
  password: z.string().min(1, "A senha é obrigatória."),
})

export type LoginFormData = z.infer<typeof loginSchema>

function getRoleFromToken(token: string): "USER" | "ADMIN" {
  try {
    const payload = token.split(".")[1]
    const decoded = JSON.parse(atob(payload))
    return decoded.role === "ADMIN" ? "ADMIN" : "USER"
  } catch {
    return "USER"
  }
}

export function useLogin() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    try {
      setError("")
      setLoading(true)

      const response = await api.post("/auth/login", data)
      const token = response.data?.data?.token

      if (!token) {
        throw new Error("Token não encontrado no payload da API.")
      }

      localStorage.setItem("token", token)

      const searchParams = new URLSearchParams(window.location.search)
      const redirectTo = searchParams.get("redirectTo")

      if (redirectTo) {
        navigate(redirectTo)
        return
      }

      const userRole = getRoleFromToken(token)

      if (userRole === "ADMIN") {
        navigate("/admin")
      } else {
        navigate("/dashboard")
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Credenciais inválidas."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    errors,
    error,
    loading,
    onSubmit: handleSubmit(onSubmit),
  }
}
