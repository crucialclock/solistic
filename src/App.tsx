import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Features } from "./components/creative/features"

export default function Home() {
  return (
    <>
      {/* HERO SECTION - Sem precisar de max-w ou centralização manual */}
      <section className="pt-16 pb-20 md:pt-16">
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

            {/* ... restante do seu código de texto ... */}
            <div className="mt-10 flex flex-col gap-4">
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed md:text-xl">
                Sua demanda dita o projeto. Soluções digitais personalizadas.
              </p>
            </div>

            <div className="mt-12 flex max-w-md">
              <Input
                placeholder="Qual o seu segmento?"
                className="border-foreground h-16 rounded-none border-2 bg-transparent px-6"
              />
              <Button className="border-foreground bg-foreground text-background h-16 rounded-none border-2 border-l-0">
                ORÇAR
              </Button>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="relative lg:col-span-5">
            <div className="border-foreground bg-muted flex aspect-4/5 w-full items-center justify-center overflow-hidden border-2">
              [ Imagem ]
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE BENEFÍCIOS */}
      <Features />
    </>
  )
}
