import { Sun } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export function Logo() {
  const [status, setStatus] = useState<"idle" | "rising" | "setting">("idle")

  return (
    <Link
      to="/"
      onMouseEnter={() => setStatus("rising")}
      onMouseLeave={() => setStatus("setting")}
      className="group relative inline-flex flex-col px-6 py-4 no-underline"
    >
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute z-0 transition-opacity ${
            status === "rising"
              ? "animate-sun-rise"
              : status === "setting"
                ? "animate-sun-set"
                : "opacity-0"
          }`}
        >
          <Sun strokeWidth={1.5} className="h-4 w-4" />
        </div>

        {/* TEXTO - Sem link interno para não dar erro de aninhamento */}
        <span className="text-foreground relative z-10 text-lg font-black tracking-[0.25em] uppercase">
          SOLISTIC
        </span>

        {/* LINHA DE HORIZONTE - Underline que acompanha o estilo dos botões */}
        <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </div>
    </Link>
  )
}
