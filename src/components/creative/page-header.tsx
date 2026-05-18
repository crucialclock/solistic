import React from "react"

interface PageHeaderProps {
  title: string
  subtitle?: React.ReactNode
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 pb-2 sm:flex-row sm:items-end">
      {/* Bloco de Texto Alinhado à Esquerda */}
      <div className="space-y-1">
        <h1 className="text-foreground text-3xl font-black tracking-tighter uppercase sm:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bloco de Ações Dinâmicas (Botões, Links) - Só renderiza se for enviado */}
      {children && (
        <div className="flex shrink-0 items-center gap-3">{children}</div>
      )}
    </div>
  )
}
