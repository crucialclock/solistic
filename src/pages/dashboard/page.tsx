/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, type Transition } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { api } from "@/lib/api"

// Schema de validação do Zod para o formulário
const profileSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Insira um e-mail válido."),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface UserData {
  id: string
  name: string
  email: string
}

export function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  // Inicialização do formulário com o zodResolver corrigido
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    async function fetchUserData() {
      try {
        setError("")
        // Consome o endpoint restrito
        const response = await api.get("/auth/me")

        // CORREÇÃO: A rota /auth/me retorna { success: true, message: "...", data: { user: { ... } } }
        const userData = response.data?.data?.user

        if (userData) {
          setUser(userData)

          // Alimenta os campos reativos do formulário
          setValue("name", userData.name)
          setValue("email", userData.email)
        }
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Sessão expirada ou inválida."
        setError(message)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [setValue])

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  async function onSaveProfile(data: ProfileFormData) {
    try {
      setIsSaving(true)
      setError("")

      // Se futuramente você criar a rota de update, ela já usará o interceptor aqui
      // await api.put("/auth/update", data)

      console.log("Dados validados pelo Zod:", data)
      setUser((prev) =>
        prev ? { ...prev, name: data.name, email: data.email } : null
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError("Erro ao salvar as alterações do perfil.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-h-[75vh] w-full items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="w-full max-w-2xl"
      >
        <Card className="rounded-none border-none bg-transparent p-0 shadow-none">
          <CardHeader className="space-y-2 p-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-3xl font-bold tracking-tighter uppercase md:text-4xl">
                  Painel de Controle
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Ambiente restrito — Gerenciamento e dados cadastrais.
                </CardDescription>
              </div>

              <Button
                onClick={handleLogout}
                className="border-foreground text-foreground hover:bg-foreground hover:text-background h-10 w-full rounded-none border-2 bg-transparent px-6 text-xs font-bold tracking-widest uppercase transition-all duration-300 sm:w-auto"
              >
                Sair
              </Button>
            </div>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            {loading && (
              <div className="text-muted-foreground py-8 text-center text-base font-medium">
                Carregando dados da sessão...
              </div>
            )}

            {error && (
              <div className="flex flex-col gap-4">
                <div className="rounded-none border border-red-500/20 bg-red-500/5 px-4 py-3 text-center text-sm font-semibold text-red-500">
                  {error}
                </div>
                <Button
                  onClick={() => navigate("/login")}
                  className="border-foreground bg-foreground text-background hover:bg-background hover:text-foreground h-14 rounded-none border-2 font-bold tracking-[0.2em] uppercase transition-all duration-300"
                >
                  Voltar para o Login
                </Button>
              </div>
            )}

            {user && !loading && !error && (
              <form
                onSubmit={handleSubmit(onSaveProfile)}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-5">
                  <h3 className="text-muted-foreground/60 text-xs font-bold tracking-widest uppercase">
                    Dados Cadastrais (Editável)
                  </h3>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                        Nome
                      </label>
                      <Input
                        type="text"
                        {...register("name")}
                        className="border-foreground/10 focus-visible:border-foreground h-14 rounded-none border-2 bg-transparent px-4 text-base focus-visible:ring-0"
                      />
                      {errors.name && (
                        <span className="mt-1 text-xs font-semibold text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                        E-mail
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        className="border-foreground/10 focus-visible:border-foreground h-14 rounded-none border-2 bg-transparent px-4 text-base focus-visible:ring-0"
                      />
                      {errors.email && (
                        <span className="mt-1 text-xs font-semibold text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-muted-foreground max-w-sm text-left text-xs leading-relaxed">
                    Alterações locais utilizam os esquemas estruturados do Zod.
                    Os interceptors anexarão o Bearer Token no cabeçalho das
                    chamadas.
                  </p>

                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="border-foreground bg-foreground text-background hover:bg-background hover:text-foreground h-14 w-full rounded-none border-2 px-8 font-bold tracking-[0.2em] uppercase transition-all duration-300 sm:w-auto"
                  >
                    {isSaving ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
