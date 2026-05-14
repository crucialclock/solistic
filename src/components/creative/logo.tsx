import { Sun } from "lucide-react"
import { useState } from "react"

export function Logo() {
  const [status, setStatus] = useState<"idle" | "rising" | "setting">("idle")

  return (
    <div
      onMouseEnter={() => setStatus("rising")}
      onMouseLeave={() => setStatus("setting")}
      className="group relative inline-flex cursor-default flex-col px-6 py-4"
    >
      <div className="relative flex items-center justify-center">
        {/* O SOL - Agora com brilho colorido no topo */}
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

        {/* TEXTO */}
        <span className="relative z-10 text-lg font-black tracking-[0.25em] uppercase">
          SOLISTIC
        </span>

        {/* LINHA DE HORIZONTE */}
        <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </div>
    </div>
  )
}
