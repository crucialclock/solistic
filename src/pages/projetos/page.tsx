import { motion, type Transition } from "framer-motion"
import { PageHeader } from "@/components/creative/page-header"

// Mockups de projetos para popular a listagem visual
const MOCK_PROJECTS = [
  {
    title: "Project Medix",
    category: "Plataforma Web / Azure",
    desc: "Ecossistema modular voltado à conveniência e gestão de saúde integrada, utilizando arquitetura de microsserviços.",
    year: "2026",
  },
  {
    title: "Busca Cores",
    category: "Ferramenta Utilitária / UX",
    desc: "Plataforma intuitiva projetada para exploração, criação e gerenciamento dinâmico de paletas de cores minimalistas.",
    year: "2026",
  },
  {
    title: "F2M Transportes",
    category: "Gestão de Logística",
    desc: "Sistema centralizado de monitoramento de frotas operacionais e controle financeiro de diárias e fretes.",
    year: "2025",
  },
]

export function Projetos() {
  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={baseTransition}
        className="space-y-10 text-left"
      >
        {/* CABEÇALHO PADRONIZADO */}
        <PageHeader
          title="Projetos"
          subtitle="Portfólio interno e soluções modulares em desenvolvimento."
        />

        {/* GRID BRUTALISTA DE PROJETOS MOCKUP */}
        <div className="bg-foreground/10 border-foreground/10 grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="bg-background group hover:bg-foreground/[0.01] flex flex-col justify-between p-6 transition-colors"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-foreground/40 block font-mono text-[10px] font-bold tracking-widest uppercase select-none">
                    {proj.category}
                  </span>
                  <h3 className="text-foreground group-hover:text-foreground text-xl font-bold tracking-tight">
                    {proj.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {proj.desc}
                </p>
              </div>

              <div className="text-foreground/30 flex items-center justify-between pt-6 font-mono text-[11px] font-medium tracking-wide select-none">
                <span>ANO: {proj.year}</span>
                <span className="text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
