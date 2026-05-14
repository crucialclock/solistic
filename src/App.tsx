import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Features } from "./components/creative/features"
import { Navbar } from "./components/creative/navbar"

export default function App() {
  return (
    <main className="bg-background text-foreground flex min-h-screen w-full flex-col items-center font-sans">
      {/* HEADER FIXO NO TOPO */}
      <Navbar></Navbar>

      {/* HERO SECTION - CENTRALIZADA E COM RESPIRO */}
      <section className="w-full max-w-7xl px-8 pt-16 pb-20 md:px-12 md:pt-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LADO ESQUERDO: TEXTO */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl leading-[0.95] font-bold tracking-tighter md:text-8xl">
                SITES QUE <br />
                PERTENCEM <br />
                <span className="text-muted-foreground/30">
                  AO SEU NEGÓCIO.
                </span>
              </h1>
            </motion.div>

            <div className="mt-10 flex flex-col gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-muted-foreground max-w-lg text-lg leading-relaxed md:text-xl"
              >
                Sua demanda dita o projeto. Soluções digitais personalizadas que
                resolvem dores de atendimento e vendas.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex max-w-md"
            >
              <Input
                type="text"
                placeholder="Qual o seu segmento?"
                className="border-foreground h-16 rounded-none border-2 bg-transparent px-6 text-lg focus-visible:ring-0"
              />
              <Button className="border-foreground bg-foreground text-background hover:bg-foreground/90 h-16 rounded-none border-2 border-l-0 px-8">
                ORÇAR
              </Button>
            </motion.div>
          </div>

          {/* LADO DIREITO: ESPAÇO PARA SUA IMAGEM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative lg:col-span-5"
          >
            <div className="border-foreground bg-muted text-muted-foreground/50 flex aspect-4/5 w-full items-center justify-center overflow-hidden border-2 italic">
              {/* Sua imagem entra aqui */}[ Placeholder: Imagem do Projeto ]
            </div>
            {/* Detalhe estético minimalista */}
            <div className="bg-foreground text-background absolute -bottom-4 -left-4 px-4 py-2 text-xs font-bold tracking-widest uppercase">
              Custom Made
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO DE BENEFÍCIOS */}
      <Features></Features>

      {/* FOOTER */}
      <footer className="border-foreground mt-auto w-full max-w-6xl border-t-2 px-8 py-10 md:px-12">
        <div className="flex items-end justify-between">
          <div className="text-sm font-black">
            © {new Date().getFullYear()} MTSLMA
          </div>
          <div className="text-[10px] font-bold tracking-widest uppercase opacity-40">
            São Paulo / BR
          </div>
        </div>
      </footer>
    </main>
  )
}
