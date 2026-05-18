import { motion, type Transition } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useQuoteDetails } from "./useQuoteDetails"

// Importações cirúrgicas da pasta creative
import { PageHeader } from "@/components/creative/page-header"
import { QuoteMetricsGrid } from "@/components/creative/quote-metrics-grid"
import { QuoteFeaturesList } from "@/components/creative/quote-features-list"
import { QuoteAdminActions } from "@/components/creative/quote-admin-actions"
import { QuoteInfoBlock } from "@/components/creative/quote-info-block"

// Dicionário estático para mapeamento e tradução visual dos status
const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  IN_PROGRESS: "Em Andamento",
  DONE: "Concluído",
  REJECTED: "Rejeitado",
}

export function QuoteDetails() {
  const {
    id,
    quote,
    loading,
    mutating,
    error,
    isAdmin,
    updateStatus,
    deleteQuote,
    getStatusStyle,
    handleBack,
  } = useQuoteDetails()

  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  if (loading && !quote) {
    return (
      <div className="text-muted-foreground animate-pulse py-24 text-center font-mono text-sm font-medium tracking-widest uppercase">
        Sincronizando dados com o servidor...
      </div>
    )
  }

  if (error && !quote) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-24">
        <div className="w-full max-w-md rounded-none border border-red-500/20 bg-red-500/10 px-6 py-4 text-center text-sm font-semibold text-red-500">
          {error}
        </div>
        <Button
          onClick={handleBack}
          className="border-foreground bg-foreground text-background hover:bg-background hover:text-foreground h-12 rounded-none border-2 px-6 text-xs font-bold tracking-widest uppercase transition-all duration-300"
        >
          Voltar ao Painel
        </Button>
      </div>
    )
  }

  const currentStatusKey = quote?.status || ""
  const translatedStatus = STATUS_LABELS[currentStatusKey] || currentStatusKey

  return (
    <div className="flex min-h-[85vh] w-full items-start justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="w-full max-w-3xl space-y-8"
      >
        <Button
          variant="ghost"
          onClick={handleBack}
          className="group relative h-9 w-fit cursor-pointer rounded-none px-0 text-xs font-bold tracking-widest uppercase transition-all hover:bg-transparent hover:opacity-70 focus-visible:ring-0"
        >
          <span className="relative">
            &larr; Voltar para o painel
            <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
        </Button>

        <Card className="rounded-none border-none bg-transparent p-0 shadow-none ring-0">
          <PageHeader
            title={quote?.project_name || ""}
            subtitle={`ID: #${id} • ENTRADA: ${quote?.created_at ? new Date(quote.created_at).toLocaleDateString("pt-BR") : ""}`}
          >
            <span
              className={`h-fit w-fit rounded-none px-3.5 py-1.5 font-mono text-[11px] font-black tracking-widest uppercase select-none ${getStatusStyle(
                currentStatusKey
              )}`}
            >
              {translatedStatus}
            </span>
          </PageHeader>

          <CardContent className="mt-8 flex flex-col gap-8 p-0 text-left">
            {/* Informações do cliente */}
            {quote?.user_name && (
              <div className="border-foreground/10 bg-foreground/[0.01] border p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <QuoteInfoBlock label="Nome do Solicitante">
                    <span className="text-foreground/80 font-sans font-bold">
                      {quote.user_name}
                    </span>
                  </QuoteInfoBlock>
                  <QuoteInfoBlock label="Canal de Comunicação">
                    <span className="text-foreground/60 font-sans font-medium break-all">
                      {quote.user_email}
                    </span>
                  </QuoteInfoBlock>
                </div>
              </div>
            )}

            {/* GRID DE MÉTRICAS */}
            <QuoteMetricsGrid
              serviceType={quote?.service_type || ""}
              budgetRange={quote?.budget_range}
              deadline={quote?.deadline}
            />

            {/* LISTA DE REQUISITOS SELECIONADOS */}
            {quote && <QuoteFeaturesList quote={quote} />}

            {/* ESCOPO TEXTUAL */}
            <QuoteInfoBlock
              label="Especificação Textual do Escopo"
              variant="box"
            >
              {quote?.description}
            </QuoteInfoBlock>

            {/* AÇÕES OPERACIONAIS */}
            {isAdmin && (
              <QuoteAdminActions
                currentStatus={currentStatusKey}
                mutating={mutating}
                updateStatus={updateStatus}
                deleteQuote={deleteQuote}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
