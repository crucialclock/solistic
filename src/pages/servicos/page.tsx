import { motion, type Transition, type Easing } from "framer-motion"
import { PLANOS, MANUTENCAO, NAO_INCLUI } from "@/data/servicos"
import { CardPlano } from "@/components/creative/card-plano"

export function Servicos() {
  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as Easing,
  }

  return (
    <main className="bg-background text-foreground mx-auto max-w-7xl px-6 py-24 md:py-36">
      {/* Hero Section Editorial - Copiando a suavidade e pesos da Home */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="mb-24 max-w-5xl text-left"
      >
        <span className="text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase">
          Modelos de Solução
        </span>

        {/* Título usando a mesma estrutura exata da Home */}
        <h1 className="mt-4 text-4xl leading-[0.95] font-bold tracking-tighter sm:text-6xl md:text-8xl">
          ESCOLHA POR OBJETIVO, <br />
          NÃO POR <span className="text-muted-foreground/30">TECNOLOGIA.</span>
        </h1>

        <p className="text-muted-foreground max-lg mt-6 max-w-2xl text-base leading-7 font-medium tracking-tighter md:text-xl md:leading-9">
          Os planos funcionam como modelos de contrato[cite: 2]. Cada projeto
          pode ser estruturado, adaptado e personalizado conforme o tamanho,
          prazo e as reais necessidades do seu negócio[cite: 2].
        </p>
      </motion.section>

      {/* Grade Conectada (Layout Técnico) */}
      <section className="bg-foreground/10 border-foreground/10 grid grid-cols-1 gap-px border md:grid-cols-2 lg:grid-cols-3">
        {PLANOS.map((plano) => (
          <CardPlano
            key={plano.nome}
            plano={plano}
            isDestaque={plano.destaque === "Mais escolhido"}
          />
        ))}
      </section>

      {/* Seções Técnicas de Manutenção - Menos escandalosa nos pesos */}
      <section className="bg-foreground/10 border-foreground/10 mt-24 grid grid-cols-1 gap-px border lg:grid-cols-2">
        {/* O que inclui */}
        <div className="bg-background p-8 md:p-12">
          <div className="flex items-center gap-3">
            <span className="bg-foreground h-2 w-2 rounded-none" />
            {/* Peso alterado de font-black para font-bold */}
            <h2 className="text-lg font-bold tracking-tight uppercase md:text-xl">
              Escopo de Manutenção
            </h2>
          </div>
          <p className="text-muted-foreground mt-2 text-sm font-medium tracking-tight">
            O que está garantido em contrato para a estabilidade do seu
            sistema[cite: 2].
          </p>
          <ul className="text-muted-foreground mt-8 space-y-4 text-sm font-medium tracking-tighter">
            {MANUTENCAO.map((item: string) => (
              <li key={item} className="flex items-center gap-3">
                <span className="text-foreground font-bold">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* O que NÃO inclui */}
        <div className="bg-background p-8 md:p-12">
          <div className="flex items-center gap-3">
            <span className="border-foreground h-2 w-2 rounded-none border bg-transparent" />
            {/* Peso alterado de font-black para font-bold */}
            <h2 className="text-lg font-bold tracking-tight uppercase md:text-xl">
              Demandas Fora de Escopo
            </h2>
          </div>
          <p className="text-muted-foreground mt-2 text-sm font-medium tracking-tight">
            Solicitações tratadas como novos projetos com orçamentos
            individuais.
          </p>
          <ul className="text-muted-foreground/70 mt-8 space-y-4 text-sm font-medium tracking-tighter">
            {NAO_INCLUI.map((item: string) => (
              <li key={item} className="flex items-center gap-3">
                <span className="font-bold opacity-60">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
