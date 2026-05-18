import React from "react"

interface InfoBlockProps {
  label: string
  children: React.ReactNode
  variant?: "box" | "text"
}

export function QuoteInfoBlock({
  label,
  children,
  variant = "text",
}: InfoBlockProps) {
  return (
    <div className="space-y-3 text-left">
      <span className="text-foreground/40 block font-mono text-[10px] font-bold tracking-widest uppercase select-none">
        {label}
      </span>

      {variant === "box" ? (
        <div className="border-foreground/10 bg-foreground/[0.005] text-foreground min-h-30 w-full rounded-none border p-5 text-base leading-relaxed font-normal whitespace-pre-wrap select-text">
          {children}
        </div>
      ) : (
        <div className="text-foreground text-base font-medium">{children}</div>
      )}
    </div>
  )
}
