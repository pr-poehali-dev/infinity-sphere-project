import { useState } from "react"
import { HighlightedText } from "./HighlightedText"

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
    <section id="contact" className="py-20 md:py-28 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Заказать мебель</p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight mb-6 text-balance">
            Хотите мебель,
            <br />
            созданную <HighlightedText>специально</HighlightedText> для вас?
          </h2>

          <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Оставьте заявку — приедем на замер, сделаем 3D-проект и рассчитаем стоимость.
          </p>

          {status === "success" ? (
            <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-8 py-10">
              <p className="text-2xl font-medium mb-2">Заявка отправлена!</p>
              <p className="text-primary-foreground/70">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
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
                rows={4}
                className="w-full bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40 px-5 py-4 text-base outline-none focus:border-primary-foreground/70 transition-colors rounded-sm resize-none"
              />
              {status === "error" && (
                <p className="text-red-400 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary-foreground text-foreground font-medium px-8 py-4 text-base hover:bg-primary-foreground/90 transition-colors duration-300 disabled:opacity-60 rounded-sm"
              >
                {status === "loading" ? "Отправка..." : "Получить расчёт"}
              </button>
              <p className="text-primary-foreground/40 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
