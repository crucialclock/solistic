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

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Insira um e-mail válido."),
  password: z.string().min(1, "A senha é obrigatória."),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

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

      // Dispara o POST para o Express
      const response = await api.post("/auth/login", data)

      // CORREÇÃO: A API retorna o token dentro do objeto 'data'
      const token = response.data?.data?.token

      if (!token) {
        throw new Error("Token não encontrado no payload da API.")
      }

      // Salva a string real do JWT (ex: "eyJhbG...") no localStorage
      localStorage.setItem("token", token)

      // Redireciona para o painel de controle
      navigate("/dashboard")
    } catch (err: any) {
      // Captura o erro vindo da validação ou credenciais da API
      const message =
        err.response?.data?.message || err.message || "Credenciais inválidas."
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
              Identificação
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Insira suas credenciais para acessar a plataforma.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
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

              <Button
                type="submit"
                disabled={loading}
                className="bg-foreground text-background hover:bg-background hover:text-foreground border-foreground mt-2 h-14 rounded-none border-2 font-bold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Autenticando..." : "Entrar no sistema"}
              </Button>
            </form>

            <div className="text-muted-foreground mt-8 text-center text-sm">
              Não possui uma conta?{" "}
              <Link
                to="/registro"
                className="text-foreground font-bold underline-offset-4 hover:underline"
              >
                Criar conta
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
