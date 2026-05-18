/* eslint-disable @typescript-eslint/no-explicit-any */

// Solução definitiva: Criamos uma interface local forte para o componente, garantindo que o compilador enxergue o campo 'features' aconteça o que acontecer nos outros arquivos
interface LocalQuoteData {
  id: string
  features?: string[] // Opcional ou fallback para evitar qualquer quebra
  [key: string]: any // Permite outras propriedades dinâmicas do objeto original
}

interface QuoteFeaturesListProps {
  quote: LocalQuoteData | null
}

export function QuoteFeaturesList({ quote }: QuoteFeaturesListProps) {
  if (!quote) return null

  // Coleta as features com segurança absoluta
  const currentFeatures = Array.isArray(quote.features) ? quote.features : []

  // Mapeamento estático apenas das labels visuais
  const featureLabels = [
    { key: "needsAuth", label: "Área de login e autenticação" },
    { key: "needsAdminPanel", label: "Painel administrativo de gestão" },
    { key: "needsWhatsapp", label: "Integração com API de WhatsApp" },
    { key: "needsScheduling", label: "Agendamento de serviços ou horários" },
    { key: "needsPayments", label: "Recebimento de pagamentos online" },
    { key: "needsCatalog", label: "Catálogo de produtos ou serviços" },
    { key: "needsOrderTracking", label: "Acompanhamento de pedidos" },
    { key: "needsNotifications", label: "Sistema de avisos/notificações" },
    { key: "needsFileUploads", label: "Upload de arquivos/documentos" },
    { key: "needsCustomerManagement", label: "Gerenciamento de clientes" },
    {
      key: "needsProposalSystem",
      label: "Sistema de solicitações de propostas",
    },
    { key: "needsSocialIntegration", label: "Integração com redes sociais" },
  ]

  // Filtra as labels baseado nas strings presentes no array retornado do Postgres
  const activeFeatures = featureLabels.filter((item) =>
    currentFeatures.includes(item.key)
  )

  return (
    <div className="space-y-3">
      <h4 className="text-foreground/40 font-mono text-[10px] font-bold tracking-widest uppercase select-none">
        Recursos e Módulos Escalados
      </h4>

      {activeFeatures.length === 0 ? (
        <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase italic">
          Nenhum recurso modular opcional foi assinalado.
        </p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {activeFeatures.map((item, idx) => (
            <span
              key={idx}
              className="border-foreground/10 text-foreground bg-foreground/[0.02] rounded-none border px-3 py-2 text-xs font-semibold select-none"
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
