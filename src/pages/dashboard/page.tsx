import { motion, type Transition } from "framer-motion"
import { useDashboard } from "./useDashboard"
import { Button } from "@/components/ui/button"
import { StatusFilter } from "@/components/creative/status-filter"
import { QuoteCard } from "@/components/creative/quote-card"
import { EmptyState } from "@/components/creative/empty-state"
import { PaginationControl } from "@/components/creative/pagination-control"
import { PageHeader } from "@/components/creative/page-header"

// Opções estáticas de filtros declaradas fora do componente para não sobrecarregar a renderização
const FILTER_OPTIONS = [
  { key: "ALL", label: "Todos" },
  { key: "PENDING", label: "Pendentes" },
  { key: "IN_PROGRESS", label: "Em Andamento" },
  { key: "DONE", label: "Concluídos" },
]

export function Dashboard() {
  const {
    user,
    quotes,
    statusFilter,
    setStatusFilter,
    setPage,
    paginationMeta,
    loading,
    error,
    handleLogout,
    getStatusStyle,
  } = useDashboard()

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  // Descobre a saudação estritamente em tempo de execução
  const currentHour = new Date().getHours()
  const timeOfDay =
    currentHour >= 5 && currentHour < 12
      ? "Bom dia"
      : currentHour >= 12 && currentHour < 17
        ? "Boa tarde"
        : "Boa noite"

  if (loading && !user) {
    return (
      <div className="text-muted-foreground mx-auto max-w-4xl animate-pulse px-4 py-12 text-center font-mono text-sm font-medium tracking-widest uppercase sm:px-6">
        Carregando painel de controle...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="space-y-10 text-left"
      >
        {/* Cabeçalho */}
        <PageHeader title="Dashboard" subtitle={`${timeOfDay}, ${user?.name}!`}>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="group relative h-9 w-fit cursor-pointer rounded-none px-0 text-xs font-bold tracking-widest text-red-500 uppercase transition-all hover:bg-transparent hover:text-red-600 focus-visible:ring-0"
          >
            <span className="relative">
              Sair da Conta &rarr;
              <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
          </Button>
        </PageHeader>

        <div className="group relative inline-block cursor-pointer">
          <span className="text-sm font-bold tracking-widest uppercase">
            Meu Texto
          </span>

          <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </div>

        {error && (
          <div className="rounded-none border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
            {error}
          </div>
        )}

        {/* Lista de solicitações de orçamento */}
        <div className="space-y-4">
          <StatusFilter
            options={FILTER_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
          />

          {quotes.length === 0 ? (
            <EmptyState message="Nenhum orçamento encontrado nesta categoria." />
          ) : (
            <div className="space-y-3">
              {quotes.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  getStatusStyle={getStatusStyle}
                />
              ))}
            </div>
          )}

          <PaginationControl meta={paginationMeta} onPageChange={setPage} />
        </div>

        {/* Informações da conta, depois talvez eu faça um componente dedicado e implemente o botão de alterar senha aqui */}
        <div className="border-foreground/10 bg-foreground/[0.01] flex flex-col gap-6 rounded-none border p-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 sm:gap-12">
            <div className="space-y-0.5">
              <span className="text-muted-foreground/60 block font-bold tracking-widest uppercase select-none">
                Nome Completo
              </span>
              <p className="text-foreground font-sans text-sm font-bold tracking-tight">
                {user?.name}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-muted-foreground/60 block font-bold tracking-widest uppercase select-none">
                E-mail de Contato
              </span>
              <p className="text-foreground font-medium break-all">
                {user?.email}
              </p>
            </div>
          </div>

          <Button
            type="button"
            disabled
            className="border-foreground/20 text-muted-foreground/50 h-10 w-full cursor-not-allowed rounded-none border border-dashed bg-transparent px-4 font-bold tracking-widest uppercase opacity-40 select-none sm:w-fit"
          >
            Conta Ativa
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
