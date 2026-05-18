export interface PaginationMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

interface PaginationControlProps {
  meta: PaginationMeta | null
  onPageChange: (page: number) => void
}

export function PaginationControl({
  meta,
  onPageChange,
}: PaginationControlProps) {
  if (!meta || meta.totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between pt-4 font-mono text-xs">
      <span className="text-muted-foreground/60 tracking-wider uppercase">
        Página {meta.currentPage} de {meta.totalPages}
      </span>

      <div className="flex gap-1">
        {/* BOTÃO ANTERIOR */}
        <button
          type="button"
          disabled={meta.currentPage === 1}
          onClick={() => onPageChange(meta.currentPage - 1)}
          className="border-foreground/10 text-foreground hover:border-foreground/30 rounded-none border bg-transparent px-3 py-1.5 font-bold tracking-wider uppercase transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-30"
        >
          &larr; Ant
        </button>

        {/* BOTÃO PRÓXIMO */}
        <button
          type="button"
          disabled={meta.currentPage === meta.totalPages}
          onClick={() => onPageChange(meta.currentPage + 1)}
          className="border-foreground/10 text-foreground hover:border-foreground/30 rounded-none border bg-transparent px-3 py-1.5 font-bold tracking-wider uppercase transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Próx &rarr;
        </button>
      </div>
    </div>
  )
}
