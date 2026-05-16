/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, type Transition } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

// Schema do Zod simplificado (sem confirmPassword e sem .refine)
const registroSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
})

type RegistroFormData = z.infer<typeof registroSchema>

export default function Registro() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

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

      // Envia os dados limpos diretamente para o backend
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

  return (
    <div className="flex min-h-[75vh] w-full items-center justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="w-full max-w-md"
      >
        <Card className="rounded-none border-none bg-transparent p-0 shadow-none ring-0">
          <CardHeader className="space-y-2 p-0 text-center">
            <CardTitle className="text-3xl font-bold tracking-tighter uppercase sm:text-4xl">
              Nova Conta
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Preencha os dados abaixo para criar o seu acesso.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {/* CAMPO: NOME COMPLETO */}
              <div className="flex flex-col gap-2">
                <label className="text-muted-foreground/70 text-xs font-bold tracking-widest uppercase">
                  Nome Completo
                </label>
                <Input
                  type="text"
                  {...register("name")}
                  placeholder="Mateus da Silveira"
                  className="border-foreground/10 focus-visible:border-foreground h-14 rounded-none border-2 bg-transparent px-4 text-base focus-visible:ring-0"
                />
                {errors.name && (
                  <span className="mt-0.5 text-xs font-semibold text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* CAMPO: E-MAIL */}
              <div className="flex flex-col gap-2">
                <label className="text-muted-foreground/70 text-xs font-bold tracking-widest uppercase">
                  E-mail
                </label>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="nome@empresa.com"
                  className="border-foreground/10 focus-visible:border-foreground h-14 rounded-none border-2 bg-transparent px-4 text-base focus-visible:ring-0"
                />
                {errors.email && (
                  <span className="mt-0.5 text-xs font-semibold text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* CAMPO: SENHA */}
              <div className="flex flex-col gap-2">
                <label className="text-muted-foreground/70 text-xs font-bold tracking-widest uppercase">
                  Senha
                </label>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="border-foreground/10 focus-visible:border-foreground h-14 rounded-none border-2 bg-transparent px-4 text-base focus-visible:ring-0"
                />
                {errors.password && (
                  <span className="mt-0.5 text-xs font-semibold text-red-500">
                    {errors.password.message}
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
                  Cadastro realizado! Redirecionando...
                </div>
              )}

              {/* BOTÃO SUBMIT */}
              <Button
                type="submit"
                disabled={loading || success}
                className="bg-foreground text-background hover:bg-background hover:text-foreground border-foreground mt-2 h-14 rounded-none border-2 font-bold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Processando..." : "Finalizar cadastro"}
              </Button>
            </form>

            <div className="text-muted-foreground mt-8 text-center text-sm">
              Já possui acesso?{" "}
              <Link
                to="/login"
                className="text-foreground font-bold underline-offset-4 hover:underline"
              >
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
