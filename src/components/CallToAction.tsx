import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FURNITURE_OPTIONS = ["Кухня на заказ", "Шкаф-купе", "Гардеробная", "Мебель для спальни", "Мебель для гостиной", "Мебель под ключ"]

export function CallToAction() {
  const [form, setForm] = useState({ name: "", phone: "", messenger: "max" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([])
  const [furnitureOpen, setFurnitureOpen] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeData, setAgreeData] = useState(false)
  const [showConsentError, setShowConsentError] = useState(false)

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

  return (
    <section id="contact" className="py-32 md:py-40 bg-foreground text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/50 text-sm tracking-[0.3em] uppercase mb-8">Начать проект</p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Получите кухню вашей мечты
            <br />
            <span className="text-stone-400">без стресса и лишних согласований</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Оставьте заявку — свяжемся в течение 15 минут, ответим на вопросы и назначим бесплатный замер.
          </p>

          {status === "success" ? (
            <div className="bg-primary-foreground/10 border border-primary-foreground/20 px-8 py-10 max-w-xl mx-auto">
              <p className="text-2xl font-medium mb-2">Заявка отправлена!</p>
              <p className="text-primary-foreground/70">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left max-w-xl mx-auto">

              {/* Мебель */}
              <div className="relative">
                <label className="text-xs tracking-widest uppercase block mb-2 text-primary-foreground/60">Какая мебель вас интересует?</label>
                <button
                  type="button"
                  onClick={() => setFurnitureOpen(!furnitureOpen)}
                  className="w-full bg-transparent border border-primary-foreground/30 px-4 py-3 text-sm text-left flex items-center justify-between hover:border-primary-foreground/70 transition-colors"
                >
                  <span className={selectedFurniture.length ? "text-primary-foreground" : "text-primary-foreground/40"}>
                    {selectedFurniture.length ? selectedFurniture.join(", ") : "Выберите один или несколько вариантов"}
                  </span>
                  <ChevronDown className={`shrink-0 ml-2 w-4 h-4 transition-transform text-primary-foreground/60 ${furnitureOpen ? "rotate-180" : ""}`} />
                </button>
                {furnitureOpen && (
                  <div className="absolute z-20 top-full left-0 right-0 bg-foreground border border-primary-foreground/30 shadow-lg">
                    {FURNITURE_OPTIONS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleFurniture(item)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary-foreground/10 transition-colors flex items-center gap-2 ${selectedFurniture.includes(item) ? "text-primary-foreground font-medium" : "text-primary-foreground/60"}`}
                      >
                        <span className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center text-xs ${selectedFurniture.includes(item) ? "border-primary-foreground bg-primary-foreground text-foreground" : "border-primary-foreground/30"}`}>
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
                <label className="text-xs tracking-widest uppercase block mb-2 text-primary-foreground/60">Ваше имя</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Иван"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40 px-4 py-3 text-sm outline-none focus:border-primary-foreground/70 transition-colors"
                />
              </div>

              {/* Телефон */}
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2 text-primary-foreground/60">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 ___-___-__-__"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40 px-4 py-3 text-sm outline-none focus:border-primary-foreground/70 transition-colors"
                />
              </div>

              {/* Способ связи */}
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2 text-primary-foreground/60">Способ связи</label>
                <div className="flex gap-2">
                  {[{ value: "max", label: "MAX" }, { value: "telegram", label: "Telegram" }].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, messenger: opt.value })}
                      className={`flex-1 py-3 text-sm border transition-colors duration-200 ${
                        form.messenger === opt.value
                          ? "border-primary-foreground bg-primary-foreground text-foreground"
                          : "border-primary-foreground/30 text-primary-foreground hover:border-primary-foreground/70"
                      }`}
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
                    className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
                  />
                  <span className="text-xs leading-relaxed text-primary-foreground/70">Я согласен(а) с политикой конфиденциальности</span>
                </label>
                <label className={`flex items-start gap-3 cursor-pointer px-2 py-1 transition-colors ${showConsentError && !agreeData ? "outline outline-1 outline-red-400 bg-red-500/10" : ""}`}>
                  <input
                    type="checkbox"
                    checked={agreeData}
                    onChange={(e) => { setAgreeData(e.target.checked); setShowConsentError(false) }}
                    className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
                  />
                  <span className="text-xs leading-relaxed text-primary-foreground/70">Я согласен(а) на обработку персональных данных</span>
                </label>
                {showConsentError && (
                  <p className="text-xs text-red-400 pt-1">Пожалуйста, заполните все обязательные поля</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground font-medium px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors duration-300 disabled:opacity-60"
                >
                  {status === "loading" ? "Отправка..." : "Отправить заявку"}
                </button>
                <a
                  href="https://max.ru/id421714233013_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-6 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
                >
                  Написать в MAX
                </a>
              </div>
              <p className="text-primary-foreground/40 text-xs text-center">
                Бесплатная консультация · Выезд на замер · Без обязательств
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
