interface QuoteMetricsGridProps {
  serviceType: string
  budgetRange?: string
  deadline?: string
}

export function QuoteMetricsGrid({
  serviceType,
  budgetRange,
  deadline,
}: QuoteMetricsGridProps) {
  return (
    <div className="bg-foreground/10 border-foreground/10 grid grid-cols-1 gap-px border font-sans sm:grid-cols-3">
      <div className="bg-background space-y-1 p-4">
        <span className="text-foreground/40 block font-mono text-[10px] font-bold tracking-widest uppercase select-none">
          Tipo de Serviço
        </span>
        <p className="text-foreground text-base font-bold tracking-tight capitalize">
          {serviceType}
        </p>
      </div>

      <div className="bg-background space-y-1 p-4">
        <span className="text-foreground/40 block font-mono text-[10px] font-bold tracking-widest uppercase select-none">
          Previsão de Investimento
        </span>
        <p className="text-foreground text-base font-bold tracking-tight">
          {budgetRange ? `R$ ${budgetRange}` : "Não informado"}
        </p>
      </div>

      <div className="bg-background space-y-1 p-4">
        <span className="text-foreground/40 block font-mono text-[10px] font-bold tracking-widest uppercase select-none">
          Prazo Desejado (dias)
        </span>
        <p className="text-foreground text-base font-bold tracking-tight">
          {deadline ? `${deadline}` : "Não informado"}
        </p>
      </div>
    </div>
  )
}
