interface LeadFormProps {
  onSuccess?: () => void
  dark?: boolean
}

export function LeadForm({ dark = false }: LeadFormProps) {
  const text = dark ? "text-primary-foreground" : "text-foreground"
  const textMuted = dark ? "text-primary-foreground/60" : "text-muted-foreground"

  return (
    <div className="text-center py-8">
      <div className="w-14 h-14 bg-foreground flex items-center justify-center mx-auto mb-6">
        <span className="text-primary-foreground text-2xl font-light">✓</span>
      </div>
      <p className={`text-2xl font-semibold mb-3 ${text}`}>Спасибо за заявку!</p>
      <p className={`text-sm leading-relaxed ${textMuted}`}>Свяжемся с вами в течение 15 минут.</p>
    </div>
  )
}
