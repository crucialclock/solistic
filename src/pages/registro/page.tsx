import { Link } from "react-router-dom"
import { motion, type Transition } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRegistro } from "./useRegistro"
import { FormField } from "@/components/creative/form-field"
import { PageHeader } from "@/components/creative/page-header"
import { Card, CardContent } from "@/components/ui/card"

export default function Registro() {
  const { register, errors, error, success, loading, onSubmit } = useRegistro()

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <div className="flex min-h-[75vh] w-full items-center justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="w-full max-w-md space-y-8"
      >
        {/* Cabeçalho */}
        <PageHeader
          title="Nova Conta"
          subtitle="Preencha os dados abaixo para criar o seu acesso."
        />

        <Card className="rounded-none border-none bg-transparent p-0 shadow-none ring-0">
          <CardContent className="p-0">
            <form onSubmit={onSubmit} className="flex flex-col gap-5 text-left">
              <FormField
                label="Nome Completo"
                type="text"
                placeholder="Ex: Seu nome Completo"
                error={errors.name?.message}
                {...register("name")}
              />

              <FormField
                label="E-mail"
                type="email"
                placeholder="nome@empresa.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <FormField
                label="Senha"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />

              {error && (
                <div className="rounded-none border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-500">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-none border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-sm font-semibold text-green-500">
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
