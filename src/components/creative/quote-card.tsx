import { Link } from "react-router-dom"

export interface QuoteCardProps {
  id: string
  project_name: string
  service_type: string
  status: string
  created_at: string
  user_name?: string
  user_email?: string
}

interface QuoteItemProps {
  quote: QuoteCardProps
  getStatusStyle: (status: string) => string
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  IN_PROGRESS: "Em andamento",
  DONE: "Concluído",
  REJECTED: "Rejeitado",
}

export function QuoteCard({ quote, getStatusStyle }: QuoteItemProps) {
  return (
    <Link
      to={`/orcamento/${quote.id}`}
      className="group border-foreground/10 bg-foreground/[0.01] hover:border-foreground/30 hover:bg-foreground/[0.02] flex flex-col justify-between gap-5 rounded-none border p-6 transition-all duration-300 ease-in-out sm:flex-row sm:items-center"
    >
      <div className="flex flex-col gap-4">
        {/* TÍTULO E ID */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <h4 className="text-foreground group-hover:text-foreground text-base font-bold tracking-tight transition-colors">
              {quote.project_name}
            </h4>

            <span className="text-foreground/40 font-mono text-[10px] font-medium">
              #{quote.id.slice(0, 8)}
            </span>
          </div>

          {/* DADOS DO CLIENTE */}
          {quote.user_name && (
            <div className="flex flex-col gap-1 pt-1.5 font-mono text-[11px] font-medium tracking-wide">
              <div className="flex items-center gap-2">
                <span className="text-foreground/30 uppercase select-none">
                  Nome:
                </span>

                <span className="text-foreground/70 font-sans font-semibold">
                  {quote.user_name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-foreground/30 uppercase select-none">
                  E-mail:
                </span>

                <span className="text-foreground/60 font-sans font-medium break-all">
                  {quote.user_email}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* METADADOS */}
        <div className="text-foreground/50 flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-[11px] tracking-wider">
          <span className="text-foreground/70 font-semibold uppercase">
            {quote.service_type}
          </span>

          <span className="text-foreground/15 select-none">•</span>

          <span>
            CRIADO:{" "}
            {new Date(quote.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 sm:justify-end">
        {/* STATUS */}
        <span
          className={`rounded-none px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase select-none ${getStatusStyle(
            quote.status
          )}`}
        >
          {STATUS_LABELS[quote.status] || quote.status}
        </span>

        {/* SETA */}
        <span className="text-foreground/30 group-hover:text-foreground hidden text-sm transition-all duration-300 ease-out sm:inline-block">
          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
