/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { useQuoteDetails } from "@/pages/detalhes-orcamento/useQuoteDetails"

interface QuoteAdminActionsProps {
  currentStatus: string
  mutating: boolean
  updateStatus: (status: any) => Promise<void>
  deleteQuote: () => Promise<void>
}

// Mapeamento local para exibição em português nos botões do painel admin
const ADMIN_STATUS_OPTIONS = [
  { key: "PENDING", label: "Pendente" },
  { key: "APPROVED", label: "Aprovar" },
  { key: "IN_PROGRESS", label: "Em Andamento" },
  { key: "DONE", label: "Concluir" },
  { key: "REJECTED", label: "Rejeitar" },
]

export function QuoteAdminActions({
  currentStatus,
  mutating,
  updateStatus,
  deleteQuote,
}: QuoteAdminActionsProps) {
  // Puxa a função de estilos reativa do seu custom hook unificado
  const { getStatusStyle } = useQuoteDetails()

  return (
    <div className="border-foreground/5 space-y-6 border-t pt-6">
      <div className="space-y-1">
        <h3 className="text-sm font-black tracking-widest text-amber-500 uppercase select-none">
          Gerenciamento Operacional Interno
        </h3>
        <p className="text-muted-foreground text-xs">
          Mudança de status em tempo real e documentação de parecer técnico.
        </p>
      </div>

      <div className="space-y-2.5">
        <span className="text-foreground/40 block font-mono text-[10px] font-bold tracking-widest uppercase select-none">
          Atualizar Estado da Proposta
        </span>
        <div className="flex flex-wrap gap-1">
          {ADMIN_STATUS_OPTIONS.map((opt) => {
            const isCurrent = currentStatus === opt.key
            return (
              <button
                key={opt.key}
                type="button"
                disabled={mutating || isCurrent}
                onClick={() => updateStatus(opt.key)}
                className={`rounded-none border px-3.5 py-2 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 disabled:opacity-40 ${
                  isCurrent
                    ? `${getStatusStyle(opt.key)} cursor-default border-current opacity-100` // Ganha a cor e opacidade do status selecionado
                    : "text-muted-foreground hover:text-foreground border-foreground/10 hover:border-foreground/30 bg-transparent"
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2.5">
        <span className="text-foreground/40 block font-mono text-[10px] font-bold tracking-widest uppercase select-none">
          Parecer Técnico / Notas de Retorno (Interno)
        </span>
        <textarea
          rows={4}
          placeholder="Insira detalhes sobre viabilidade técnica, infraestrutura necessária..."
          className="border-foreground/10 bg-foreground/[0.01] placeholder:text-muted-foreground/30 focus-visible:border-foreground/30 flex w-full rounded-none border px-4 py-3 font-mono text-sm focus-visible:outline-none"
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="button"
          disabled={mutating}
          onClick={deleteQuote}
          className="hover:text-background h-10 w-full rounded-none border border-red-500/20 bg-red-500/5 px-5 text-xs font-bold tracking-widest text-red-500 uppercase transition-all duration-300 hover:bg-red-500 sm:w-auto"
        >
          Excluir Requisição permanentemente
        </Button>
      </div>
    </div>
  )
}
