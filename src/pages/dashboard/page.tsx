import { Link, useNavigate } from "react-router-dom"
import { motion, type Transition } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { useDashboard } from "./useDashboard"
import { FormField } from "@/components/creative/form-field"

export function Dashboard() {
  const navigate = useNavigate()
  const {
    user,
    quotes,
    loading,
    error,
    isSaving,
    errors,
    register,
    handleLogout,
    getStatusStyle,
    onSaveProfile,
  } = useDashboard()

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
        className="w-full max-w-4xl"
      >
        <Card className="rounded-none border-none bg-transparent p-0 shadow-none ring-0">
          <CardHeader className="space-y-2 p-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-left">
                <CardTitle className="text-3xl font-bold tracking-tighter uppercase md:text-4xl">
                  Painel de Controle
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Ambiente restrito — Gerenciamento e histórico de solicitações.
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

          <CardContent className="mt-12 flex flex-col gap-12 p-0">
            {loading && (
              <div className="text-muted-foreground py-8 text-center text-base font-medium">
                Sincronizando dados com o servidor...
              </div>
            )}

            {error && (
              <div className="flex flex-col gap-4">
                <div className="rounded-none bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-500">
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
              <>
                {/* BLOCO 1: FORMULÁRIO DE DADOS (USANDO COMPONENTE FORMFIELD REUTILIZÁVEL) */}
                <form onSubmit={onSaveProfile} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-5 text-left">
                    <h3 className="text-muted-foreground/60 text-xs font-bold tracking-widest uppercase">
                      Dados Cadastrais (Editável)
                    </h3>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormField
                        label="Nome"
                        type="text"
                        error={errors.name?.message}
                        {...register("name")}
                      />

                      <FormField
                        label="E-mail"
                        type="email"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-muted-foreground max-w-sm text-left text-xs leading-relaxed">
                      Sua conexão está validada. Alterações salvas refletem no
                      payload interno.
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

                {/* BLOCO 2: LISTAGEM DE SOLICITAÇÕES (QUOTES) */}
                <div className="mt-4 flex flex-col gap-5 text-left">
                  <div className="border-foreground/5 flex items-center justify-between border-b pb-4">
                    <h3 className="text-muted-foreground/60 text-xs font-bold tracking-widest uppercase">
                      Meus Orçamentos Enviados
                    </h3>
                    <Link
                      to="/orcamento"
                      className="text-foreground text-xs font-bold tracking-wider uppercase underline underline-offset-4 hover:opacity-80"
                    >
                      + Nova Solicitação
                    </Link>
                  </div>

                  {quotes.length === 0 ? (
                    <div className="border-foreground/10 bg-foreground/[0.01] rounded-none border border-dashed py-12 text-center">
                      <p className="text-muted-foreground text-sm">
                        Você ainda não enviou nenhuma proposta de projeto.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-foreground/10 border-foreground/10 flex flex-col gap-px border">
                      {quotes.map((quote) => (
                        <div
                          key={quote.id}
                          className="bg-background hover:bg-muted/10 flex flex-col gap-3 p-5 transition-colors sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-foreground text-base font-bold tracking-tight">
                              {quote.project_name}
                            </span>
                            <span className="text-muted-foreground text-xs font-medium">
                              {quote.service_type} •{" "}
                              {new Date(quote.created_at).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4 sm:justify-end">
                            <span
                              className={`rounded-none px-3 py-1 text-xs font-black tracking-widest uppercase ${getStatusStyle(
                                quote.status
                              )}`}
                            >
                              {quote.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
