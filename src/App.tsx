import { Button } from "@/components/ui/button"
import { motion } from "framer-motion" // Instale se ainda não tiver: npm install framer-motion
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function App() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Camada de Ruído (Noise) - Opcional para textura */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

      {/* Grid de Fundo Sutil */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[44px_44px]" />

      <section className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          {/* TÍTULO GIGANTE E ASSIMÉTRICO */}
          <div className="z-10 md:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-primary text-6xl leading-[0.9] font-bold tracking-tighter md:text-[120px]"
            >
              DESIGN QUE <br />
              <span className="text-muted-foreground/40 ml-0 md:ml-20">
                CONVERTE.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground mt-8 max-w-md text-lg"
            >
              Fugimos do óbvio para criar experiências digitais que prendem a
              atenção e vendem o seu serviço de forma elegante.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex gap-4"
            >
              <Button size="lg" className="h-12 rounded-full px-8 text-base">
                Começar projeto
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-8 text-base"
              >
                Ver portfólio
              </Button>
            </motion.div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>

          {/* IMAGEM "VAZANDO" DO CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative mt-20 md:col-span-4 md:mt-0"
          >
            <div className="aspect-3/4 w-full rotate-3 overflow-hidden rounded-2xl bg-zinc-200 shadow-2xl transition-transform duration-500 hover:rotate-0">
              {/* Coloque aqui sua imagem real */}
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-zinc-400 to-zinc-600 text-white italic">
                Sua Foto Impactante
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            {/* Elemento flutuante decorativo */}
            <div className="bg-primary absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-50 mix-blend-difference blur-3xl" />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
