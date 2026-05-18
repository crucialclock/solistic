import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    title: "Orçamento",
    desc: "Análise técnica da sua necessidade. Definimos o que precisa ser construído para resolver o problema de forma direta, sem custos desnecessários.",
  },
  {
    title: "Negociação",
    desc: "Alinhamento de prazos, entregáveis e valores. Ajustamos os detalhes para que o projeto caiba na sua realidade e expectativa de investimento.",
  },
  {
    title: "Desenvolvimento",
    desc: "A fase de construção activa. Onde a ideia ganha forma através de código limpo, seguindo as prioridades definidas no planejamento inicial.",
  },
  {
    title: "Versão Inicial (MVP)",
    desc: "Entrega de uma versão funcional com as ferramentas essenciais. Focamos no que traz resultado imediato para validar a solução na prática.",
  },
  {
    title: "Refinamento",
    desc: "Ajustes finais baseados no uso real da ferramenta. Polimos a interface e os fluxos até que o software esteja pronto para a operação total.",
  },
  {
    title: "Acompanhamento",
    desc: "Suporte técnico pós-entrega para garantir que tudo funcione. Inclui uma reunião mensal de feedback para avaliar possíveis evoluções.",
  },
]

export function Features() {
  return (
    <section className="border-foreground/10 w-full border-t py-20">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Etapas de Desenvolvimento.
        </h2>
        <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">
          Um processo estruturado para transformar sua demanda in uma ferramenta
          real.
          <br className="hidden md:block" />
          Foco em execução previsível e transparência em cada etapa.
        </p>
      </div>

      {/* Grid com espaçamento sutil entre as caixas separadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((item, i) => (
          <Card
            key={i}
            asChild
            /* asChild operando perfeitamente agora com o type customizado do ElementType */
            className="group bg-background hover:bg-muted/30 border-foreground/10 flex h-full flex-col rounded-none border p-8 shadow-none ring-0 ring-offset-0 transition-colors outline-none"
          >
            <div>
              <CardHeader className="p-0">
                <span className="text-muted-foreground/40 text-xs font-bold tracking-[0.2em] uppercase">
                  Etapa 0{i + 1}
                </span>
                <CardTitle className="mt-3 text-xl font-bold tracking-tight md:text-2xl">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="mt-6 p-0">
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                  {item.desc}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
