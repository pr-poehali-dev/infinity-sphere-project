import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import { ArrowRight } from "lucide-react"

export function CallToAction() {
  const [form, setForm] = useState({ name: "", phone: "", comment: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus("loading")
    try {
      await new Promise((r) => setTimeout(r, 800))
      setStatus("success")
      setForm({ name: "", phone: "", comment: "" })
    } catch {
      setStatus("error")
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
            <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-8 py-10 max-w-xl mx-auto">
              <p className="text-2xl font-medium mb-2">Заявка отправлена!</p>
              <p className="text-primary-foreground/70">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left max-w-xl mx-auto">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя *"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40 px-5 py-4 text-base outline-none focus:border-primary-foreground/70 transition-colors rounded-sm"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Номер телефона *"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40 px-5 py-4 text-base outline-none focus:border-primary-foreground/70 transition-colors rounded-sm"
              />
              <textarea
                name="comment"
                placeholder="Комментарий (необязательно)"
                value={form.comment}
                onChange={handleChange}
                rows={3}
                className="w-full bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40 px-5 py-4 text-base outline-none focus:border-primary-foreground/70 transition-colors rounded-sm resize-none"
              />
              {status === "error" && (
                <p className="text-red-400 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground font-medium px-8 py-4 text-sm hover:bg-primary-foreground/90 transition-colors duration-300 disabled:opacity-60 rounded-sm group"
                >
                  {status === "loading" ? "Отправка..." : "Получить расчёт проекта"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="https://max.ru/id421714233013_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-6 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300 rounded-sm"
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
