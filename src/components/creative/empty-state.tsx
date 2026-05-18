interface EmptyStateProps {
  message?: string
}

export function EmptyState({
  message = "Nenhum registro corresponde aos critérios de pesquisa informados.",
}: EmptyStateProps) {
  return (
    <div className="border-foreground/10 text-muted-foreground rounded-none border border-dashed p-12 text-center font-mono text-sm tracking-wide uppercase">
      {message}
    </div>
  )
}
