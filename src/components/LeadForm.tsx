import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FURNITURE_OPTIONS = ["Кухня на заказ", "Шкаф-купе", "Гардеробная", "Мебель для спальни", "Мебель для гостиной", "Мебель под ключ"]

interface LeadFormProps {
  onSuccess?: () => void
  dark?: boolean
}

export function LeadForm({ onSuccess, dark = false }: LeadFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", messenger: "max" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([])
  const [furnitureOpen, setFurnitureOpen] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeData, setAgreeData] = useState(false)
  const [showConsentError, setShowConsentError] = useState(false)

  const text = dark ? "text-primary-foreground" : "text-foreground"
  const textMuted = dark ? "text-primary-foreground/60" : "text-muted-foreground"
  const border = dark ? "border-primary-foreground/30" : "border-border"
  const borderFocus = dark ? "focus:border-primary-foreground/70" : "focus:border-foreground"
  const placeholder = dark ? "placeholder:text-primary-foreground/40" : "placeholder:text-muted-foreground"
  const bg = dark ? "bg-transparent" : "bg-transparent"
  const dropdownBg = dark ? "bg-foreground" : "bg-background"
  const activeBtn = dark ? "border-primary-foreground bg-primary-foreground text-foreground" : "border-foreground bg-foreground text-primary-foreground"
  const inactiveBtn = dark ? "border-primary-foreground/30 text-primary-foreground hover:border-primary-foreground/70" : "border-border text-foreground hover:border-foreground"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleFurniture = (item: string) => {
    setSelectedFurniture((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreePrivacy || !agreeData) {
      setShowConsentError(true)
      return
    }
    if (!form.name || !form.phone) return
    setStatus("loading")
    try {
      await fetch("https://functions.poehali.dev/a9d218c7-2cf5-45fc-a168-234a2bd9cea2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, contact_method: form.messenger, furniture: selectedFurniture }),
      })
      setStatus("success")
    } catch {
      setStatus("success")
    }
  }

  if (status === "success") {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Мебель */}
      <div className="relative">
        <label className={`text-xs tracking-widest uppercase block mb-2 ${textMuted}`}>Какая мебель вас интересует?</label>
        <button
          type="button"
          onClick={() => setFurnitureOpen(!furnitureOpen)}
          className={`w-full ${bg} border ${border} px-4 py-3 text-sm text-left flex items-center justify-between hover:border-foreground transition-colors`}
        >
          <span className={selectedFurniture.length ? text : textMuted}>
            {selectedFurniture.length ? selectedFurniture.join(", ") : "Выберите один или несколько вариантов"}
          </span>
          <ChevronDown className={`shrink-0 ml-2 w-4 h-4 transition-transform ${textMuted} ${furnitureOpen ? "rotate-180" : ""}`} />
        </button>
        {furnitureOpen && (
          <div className={`absolute z-20 top-full left-0 right-0 ${dropdownBg} border ${border} shadow-lg`}>
            {FURNITURE_OPTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleFurniture(item)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors flex items-center gap-2 ${selectedFurniture.includes(item) ? `font-medium ${text}` : textMuted}`}
              >
                <span className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center text-xs ${selectedFurniture.includes(item) ? (dark ? "border-primary-foreground bg-primary-foreground text-foreground" : "border-foreground bg-foreground text-primary-foreground") : border}`}>
                  {selectedFurniture.includes(item) && "✓"}
                </span>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Имя */}
      <div>
        <label className={`text-xs tracking-widest uppercase block mb-2 ${textMuted}`}>Ваше имя</label>
        <input
          type="text"
          name="name"
          placeholder="Иван"
          value={form.name}
          onChange={handleChange}
          required
          className={`w-full ${bg} border ${border} ${text} ${placeholder} px-4 py-3 text-sm outline-none ${borderFocus} transition-colors`}
        />
      </div>

      {/* Телефон */}
      <div>
        <label className={`text-xs tracking-widest uppercase block mb-2 ${textMuted}`}>Телефон</label>
        <input
          type="tel"
          name="phone"
          placeholder="+7 ___-___-__-__"
          value={form.phone}
          onChange={handleChange}
          required
          className={`w-full ${bg} border ${border} ${text} ${placeholder} px-4 py-3 text-sm outline-none ${borderFocus} transition-colors`}
        />
      </div>

      {/* Способ связи */}
      <div>
        <label className={`text-xs tracking-widest uppercase block mb-2 ${textMuted}`}>Способ связи</label>
        <div className="flex gap-2">
          {[{ value: "max", label: "MAX" }, { value: "telegram", label: "Telegram" }].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, messenger: opt.value })}
              className={`flex-1 py-3 text-sm border transition-colors duration-200 ${form.messenger === opt.value ? activeBtn : inactiveBtn}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Чекбоксы */}
      <div className="space-y-2">
        <label className={`flex items-start gap-3 cursor-pointer px-2 py-1 transition-colors ${showConsentError && !agreePrivacy ? "outline outline-1 outline-red-400 bg-red-500/10" : ""}`}>
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={(e) => { setAgreePrivacy(e.target.checked); setShowConsentError(false) }}
            className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer accent-foreground"
          />
          <span className={`text-xs leading-relaxed ${textMuted}`}>Я согласен(а) с политикой конфиденциальности</span>
        </label>
        <label className={`flex items-start gap-3 cursor-pointer px-2 py-1 transition-colors ${showConsentError && !agreeData ? "outline outline-1 outline-red-400 bg-red-500/10" : ""}`}>
          <input
            type="checkbox"
            checked={agreeData}
            onChange={(e) => { setAgreeData(e.target.checked); setShowConsentError(false) }}
            className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer accent-foreground"
          />
          <span className={`text-xs leading-relaxed ${textMuted}`}>Я согласен(а) на обработку персональных данных</span>
        </label>
        {showConsentError && (
          <p className="text-xs text-red-400 pt-1">Пожалуйста, заполните все обязательные поля</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full py-4 text-sm tracking-widest uppercase font-medium transition-colors duration-300 mt-2 disabled:opacity-60 ${dark ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90" : "bg-foreground text-primary-foreground hover:bg-foreground/90"}`}
      >
        {status === "loading" ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  )
}