export function SecaoManutencao({
  manutencao,
  naoInclui,
}: {
  manutencao: string[]
  naoInclui: string[]
}) {
  const cardClasses =
    "rounded-4xl border border-zinc-200 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/5"

  return (
    <section className="mt-20 grid gap-6 lg:grid-cols-2">
      <div className={cardClasses}>
        <h2 className="text-3xl font-semibold">Manutenção inclusa</h2>
        <ul className="mt-6 space-y-3 text-sm opacity-75">
          {manutencao.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
      </div>
      <div className={cardClasses}>
        <h2 className="text-3xl font-semibold">Não incluso</h2>
        <ul className="mt-6 space-y-3 text-sm opacity-75">
          {naoInclui.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
