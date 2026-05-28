import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

const FURNITURE_OPTIONS = ["Кухня на заказ", "Шкаф-купе", "Гардеробная", "Мебель для спальни", "Мебель для гостиной", "Мебель под ключ"]

export function Hero() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", messenger: "max" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([])
  const [furnitureOpen, setFurnitureOpen] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeData, setAgreeData] = useState(false)

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
    if (!form.name || !form.phone || !agreePrivacy || !agreeData) return
    setStatus("loading")
    try {
      await fetch("https://functions.poehali.dev/a9d218c7-2cf5-45fc-a168-234a2bd9cea2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, messenger: form.messenger, furniture: selectedFurniture }),
      })
      setStatus("success")
    } catch {
      setStatus("success")
    }
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => setStatus("idle"), 300)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/9cc86063-ce52-4b62-be9c-0f5283362165.jpg"
          alt="Кухни на заказ в Кемерово"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-left md:text-center max-w-5xl py-20 sm:py-16 md:py-[66px]">
        <h1 className="text-white leading-[1.1] tracking-tight text-balance pt-10 pb-6 font-thin text-left md:text-center text-4xl sm:text-5xl md:text-6xl">
          Кухни на заказ в Кемерово🔥
        </h1>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 text-white font-normal text-left md:text-center">
          Проектируем, изготавливаем и монтируем кухни любой сложности. От эконома до премиум — с гарантией 3 года по договору.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-center mb-10">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 text-foreground px-6 sm:px-8 text-sm tracking-widest uppercase font-medium hover:bg-amber-500 transition-colors duration-300 py-4 sm:py-5 bg-[#ffa800]"
          >
            Рассчитать стоимость
          </button>
          <a
            href="https://max.ru/id421714233013_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/40 px-6 sm:px-8 tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 text-sm font-extrabold text-[#ffa800] py-4 sm:py-5"
          >
            Получить концепцию в MAX
          </a>
        </div>

        <div className="grid grid-cols-2 justify-items-start md:flex md:flex-wrap md:justify-center gap-x-6 gap-y-2 md:gap-x-8 md:gap-y-3">
          {["Собственное производство", "Фиксированная стоимость", "Замер бесплатно", "Эконом — Premium"].map((text) => (
            <div key={text} className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
              <span className="text-[#ffa800]">✓</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Попап */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="relative bg-background w-full max-w-md p-8 md:p-10 shadow-2xl">
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <p className="text-2xl font-semibold mb-2">Заявка отправлена!</p>
                <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <p className="text-xs tracking-[0.3em] uppercase mb-2 text-foreground">Предварительный расчет и консультация</p>
                <h2 className="text-2xl font-medium tracking-tight mb-2 text-foreground">Рассчитать проект</h2>
                <p className="text-sm leading-relaxed mb-8 text-foreground">Оставьте заявку — свяжемся в течение 15 минут, обсудим ваш проект.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Дропдаун — что интересует */}
                  <div className="relative">
                    <label className="text-xs tracking-widest uppercase block mb-2 text-foreground">Какая мебель вас интересует?</label>
                    <button
                      type="button"
                      onClick={() => setFurnitureOpen(!furnitureOpen)}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm text-left flex items-center justify-between hover:border-foreground transition-colors"
                    >
                      <span className={selectedFurniture.length ? "text-foreground" : "text-muted-foreground"}>
                        {selectedFurniture.length ? selectedFurniture.join(", ") : "Выберите один или несколько вариантов"}
                      </span>
                      <ChevronDown className={`shrink-0 ml-2 w-4 h-4 transition-transform ${furnitureOpen ? "rotate-180" : ""}`} />
                    </button>
                    {furnitureOpen && (
                      <div className="absolute z-20 top-full left-0 right-0 bg-background border border-border shadow-lg">
                        {FURNITURE_OPTIONS.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleFurniture(item)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors flex items-center gap-2 ${selectedFurniture.includes(item) ? "font-medium text-foreground" : "text-muted-foreground"}`}
                          >
                            <span className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center text-xs ${selectedFurniture.includes(item) ? "border-foreground bg-foreground text-primary-foreground" : "border-border"}`}>
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
                    <label className="text-xs tracking-widest uppercase block mb-2 text-foreground">Ваше имя</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Иван"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="text-xs tracking-widest uppercase block mb-2 text-foreground">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+7 ___-___-__-__"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  {/* Способ связи */}
                  <div>
                    <label className="text-xs tracking-widest uppercase block mb-2 text-foreground">Способ связи</label>
                    <div className="flex gap-2">
                      {[{ value: "max", label: "MAX" }, { value: "telegram", label: "Telegram" }].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm({ ...form, messenger: opt.value })}
                          className={`flex-1 py-3 text-sm border transition-colors duration-200 ${
                            form.messenger === opt.value
                              ? "border-foreground bg-foreground text-primary-foreground"
                              : "border-border text-foreground hover:border-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Чекбоксы */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="mt-0.5 w-4 h-4 shrink-0 accent-foreground cursor-pointer"
                    />
                    <span className="text-xs leading-relaxed text-foreground">Я согласен(а) с политикой конфиденциальности</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeData}
                      onChange={(e) => setAgreeData(e.target.checked)}
                      className="mt-0.5 w-4 h-4 shrink-0 accent-foreground cursor-pointer"
                    />
                    <span className="text-xs leading-relaxed text-foreground">Я согласен(а) на обработку персональных данных</span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === "loading" || !agreePrivacy || !agreeData}
                    className="w-full bg-foreground text-primary-foreground py-4 text-sm tracking-widest uppercase font-medium hover:bg-foreground/90 transition-colors duration-300 mt-2 disabled:opacity-60"
                  >
                    {status === "loading" ? "Отправка..." : "Отправить заявку"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}