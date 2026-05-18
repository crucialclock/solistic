/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { api } from "@/lib/api"

export const registroSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
})

export type RegistroFormData = z.infer<typeof registroSchema>

export function useRegistro() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),
  })

  async function onSubmit(data: RegistroFormData) {
    try {
      setError("")
      setSuccess(false)
      setLoading(true)

      // Envia os dados limpos diretamente para o backend Express
      await api.post("/auth/register", data)

      setSuccess(true)

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Erro ao realizar o cadastro."
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
    onSubmit: handleSubmit(onSubmit),
  }
}
