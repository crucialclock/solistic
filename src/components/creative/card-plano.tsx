import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface Plano {
  nome: string
  destaque: string
  chamada: string
  ideal: string
  inclui: string[]
  prazo: string
}

interface CardPlanoProps {
  plano: Plano
  isDestaque?: boolean
}

export function CardPlano({ plano, isDestaque = false }: CardPlanoProps) {
  return (
    <article
      className={`flex flex-col rounded-none border p-8 transition-all duration-300 md:p-10 ${
        isDestaque
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-foreground border-foreground/20 hover:border-foreground"
      }`}
    >
      {/* Badge Quadrada */}
      <span
        className={`w-fit rounded-none border px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase ${
          isDestaque
            ? "border-background/30 text-background"
            : "border-foreground/30 text-muted-foreground"
        }`}
      >
        {plano.destaque}
      </span>

      {/* Título e Chamada */}
      <h3 className="mt-8 text-3xl leading-none font-extrabold tracking-tighter uppercase md:text-4xl">
        {plano.nome}
      </h3>
      <p
        className={`mt-4 text-base font-medium tracking-tight ${isDestaque ? "opacity-90" : "text-foreground"}`}
      >
        {plano.chamada}
      </p>

      <p
        className={`mt-3 text-sm leading-relaxed tracking-tight ${isDestaque ? "opacity-70" : "text-muted-foreground"}`}
      >
        {plano.ideal}
      </p>

      {/* Divisor Seco */}
      <hr
        className={`my-8 border-t ${isDestaque ? "border-background/20" : "border-foreground/10"}`}
      />

      {/* Lista de Entregáveis */}
      <ul className="space-y-4 text-sm font-medium tracking-tight">
        {plano.inclui.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-none ${isDestaque ? "bg-background" : "bg-foreground"}`}
            />
            <span className="leading-tight">{item}</span>
          </li>
        ))}
      </ul>

      {/* Footer do Card */}
      <div className="mt-auto pt-12">
        <div className="flex items-baseline justify-between border-b border-current/10 pb-4">
          <span className="text-[10px] font-black tracking-widest uppercase opacity-60">
            Prazo médio
          </span>
          <span className="text-sm font-bold tracking-tight uppercase">
            {plano.prazo}
          </span>
        </div>

        <Button
          asChild
          className={`mt-6 h-14 w-full rounded-none border-2 text-xs font-black tracking-[0.15em] uppercase transition-all duration-300 ${
            isDestaque
              ? "bg-background text-foreground border-background hover:text-background hover:bg-transparent"
              : "bg-foreground text-background border-foreground hover:text-foreground hover:bg-transparent"
          }`}
        >
          <Link to="/orcamento">Selecionar Escopo</Link>
        </Button>
      </div>
    </article>
  )
}
