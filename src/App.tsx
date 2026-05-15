import { Button } from "@/components/ui/button"
import { motion, type Transition } from "framer-motion"
import { Features } from "./components/creative/features"
import webImg from "@/assets/web.webp"
import { Link } from "react-router-dom"

export default function Home() {
  // Tipagem explícita para resolver o erro do TypeScript
  const baseTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <>
      <section className="relative flex w-full justify-center pt-10 pb-20 md:pt-16">
        <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-12">
          {/* LADO ESQUERDO: TEXTO E BOTÃO */}
          <div className="z-20 flex flex-col items-center lg:col-span-7 lg:items-start">
            {/* TÍTULO: Mantém o alinhamento original à esquerda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={baseTransition}
              className="w-full text-left"
            >
              <h1 className="text-4xl leading-[0.95] font-bold tracking-tighter sm:text-6xl md:text-8xl">
                SOLUÇÕES <br />
                QUE DE FATO <br />
                <span className="text-muted-foreground/30">TE PERTENCEM.</span>
              </h1>
            </motion.div>

            {/* CONTAINER DE CONTEÚDO: Centraliza o texto e o botão em relação a si mesmos */}
            <div className="mt-8 flex w-full flex-col items-center gap-4 lg:pr-20">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...baseTransition, delay: 0.2 }}
                className="text-muted-foreground max-lg text-base leading-7 font-medium tracking-tighter text-balance md:text-xl md:leading-9"
              >
                <span className="mt-4 block md:mt-6">
                  Na <span className="text-foreground font-bold">Solistic</span>
                  , desenvolvemos ferramentas e sistemas feitos sob medida para
                  a sua operação, seguindo seu direcionamento e feedback.
                </span>

                <span className="mt-4 block md:mt-6">
                  Criamos tecnologia para resolver dores reais e estruturar
                  soluções que acompanham o crescimento do seu negócio.
                </span>
              </motion.p>

              {/* CTA CENTRALIZADO ABAIXO DO TEXTO */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...baseTransition, delay: 0.4 }}
                className="mt-6"
              >
                <Button
                  asChild
                  className="group border-foreground bg-foreground text-background hover:bg-background hover:text-foreground relative h-16 rounded-none px-12 text-lg font-bold tracking-[0.2em] uppercase transition-all duration-300"
                >
                  <Link to="/orcamento">
                    Fazer Orçamento
                    {/* Detalhe extra: uma linha sutil que aparece no hover, opcional para dar o "talento" */}
                    <span className="absolute bottom-2 h-px w-0 bg-current transition-all duration-300 group-hover:w-[70%]" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* IMAGEM: Posição preservada com os seus valores originais */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...baseTransition, delay: 0.5 }}
            className="relative -z-10 flex justify-center lg:absolute lg:top-73 lg:-right-40 lg:mt-0 lg:w-205 lg:-translate-y-1/2 xl:-right-24 xl:w-245 2xl:-right-2 2xl:w-250"
          >
            <img
              src={webImg}
              alt="Solistic Web Solution"
              className="pointer-events-none w-[90%] max-w-lg object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] select-none md:w-full lg:max-w-none lg:drop-shadow-[0_50px_100px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={baseTransition}
        className="mx-auto w-full max-w-7xl px-6 md:px-12"
      >
        <Features />
      </motion.div>
    </>
  )
}
