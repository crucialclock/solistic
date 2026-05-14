import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    eyebrow: "Controle",
    title: "O site é seu de verdade",
    desc: "Domínio, conteúdo e estrutura ficam no seu nome. Sem mensalidades abusivas ou dependência de terceiros para tudo.",
  },
  {
    eyebrow: "Crescimento",
    title: "Pronto para evoluir",
    desc: "O projeto permite receber novas seções, formulários e integrações conforme a demanda do seu negócio crescer.",
  },
  {
    eyebrow: "Busca local",
    title: "Encontrado por clientes",
    desc: "Página organizada para deixar claro o que você oferece e onde atende, facilitando o contato de quem procura na região.",
  },
  {
    eyebrow: "Design",
    title: "Cara de negócio sério",
    desc: "Interface pensada para passar confiança e profissionalismo, transformando visitantes em contatos reais.",
  },
]

export function Features() {
  return (
    <section className="border-foreground/10 w-full max-w-7xl border-t px-8 py-24 md:px-12">
      <div className="mb-16 w-full">
        <span className="text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase">
          Você recebe...
        </span>

        {/* Ajustado: removido max-w-2xl para evitar quebra precoce e suavizado o tracking */}
        <h2 className="mt-4 text-4xl leading-[0.95] font-bold tracking-tight md:text-5xl lg:text-6xl">
          Um site funcional, <br className="hidden md:block" /> pronto para
          utilização.
        </h2>

        <p className="text-muted-foreground mt-6 max-w-4xl text-lg leading-relaxed">
          Sem complicações técnicas. A entrega é uma presença online clara,
          profissional e totalmente sob o seu controle.
        </p>
      </div>

      {/* Ajustado: items-stretch garante que todos os cards tenham a mesma altura vertical */}
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item, i) => (
          <Card
            key={i}
            className="group border-foreground/10 hover:border-foreground flex h-full flex-col rounded-none border-2 bg-transparent p-8 shadow-none transition-colors"
          >
            <CardHeader className="space-y-6 p-0">
              <span className="font-mono text-sm font-bold opacity-20">
                // 0{i + 1}
              </span>

              <div className="min-h-20">
                {" "}
                {/* Altura mínima para alinhar os títulos */}
                <span className="text-muted-foreground text-[10px] font-bold tracking-[0.15em] uppercase">
                  {item.eyebrow}
                </span>
                <CardTitle className="mt-2 text-xl leading-tight font-bold tracking-tight">
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>

            {/* O pt-8 e flex-1 garantem que o texto comece no mesmo nível e preencha o espaço */}
            <CardContent className="flex-1 p-0">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
