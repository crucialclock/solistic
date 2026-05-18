export interface FilterOption {
  key: string
  label: string
}

interface StatusFilterProps {
  options: FilterOption[]
  value: string
  onChange: (key: string) => void
}

export function StatusFilter({ options, value, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-1 pb-2">
      {options.map((opt) => {
        const isActive = value === opt.key

        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`rounded-none border px-3 py-1.5 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "text-muted-foreground hover:text-foreground border-transparent bg-transparent"
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
