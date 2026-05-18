import { motion, type Transition } from "framer-motion"
import { useAdminDashboard } from "./useAdminDashboard"
import { Input } from "@/components/ui/input"
import { StatusFilter } from "@/components/creative/status-filter"
import { EmptyState } from "@/components/creative/empty-state"
import { QuoteCard } from "@/components/creative/quote-card"
import { PaginationControl } from "@/components/creative/pagination-control"
import { PageHeader } from "@/components/creative/page-header"

export function AdminDashboard() {
  const {
    quotes,
    totalCount,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    setPage,
    paginationMeta,
    loading,
    error,
    getStatusStyle,
  } = useAdminDashboard()

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  // Opções de filtros
  const adminFilterOptions = [
    { key: "ALL", label: "Todos" },
    { key: "PENDING", label: "Pendentes" },
    { key: "APPROVED", label: "Aprovados" },
    { key: "IN_PROGRESS", label: "Em Andamento" },
    { key: "DONE", label: "Concluídos" },
    { key: "REJECTED", label: "Rejeitados" },
  ]

  if (loading && quotes.length === 0) {
    return (
      <div className="text-muted-foreground animate-pulse py-24 text-center font-mono text-sm font-medium tracking-widest uppercase">
        Sincronizando Fila Global...
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
        <PageHeader
          title="Painel de Controle Interno"
          subtitle={
            <>
              Fila Global —{" "}
              <span className="text-foreground font-bold">
                {totalCount} orçamentos no total
              </span>
            </>
          }
        ></PageHeader>

        {error && (
          <div className="rounded-none border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
            {error}
          </div>
        )}

        {/* Mecanismo de filtragem */}
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar por projeto, id, serviço ou dados do cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-foreground/20 bg-foreground/[0.01] text-foreground focus-visible:ring-foreground placeholder:text-muted-foreground/50 h-12 rounded-none font-mono text-sm"
            />
          </div>

          <StatusFilter
            options={adminFilterOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {/* Fila de solicitação de orçamentos */}
        <div className="space-y-6">
          {quotes.length === 0 ? (
            <EmptyState />
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

          {/* Controle de paginação*/}
          <PaginationControl meta={paginationMeta} onPageChange={setPage} />
        </div>
      </motion.div>
    </div>
  )
}
