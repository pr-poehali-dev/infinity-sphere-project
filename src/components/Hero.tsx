import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { LeadForm } from "./LeadForm"

export function Hero() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("open-lead-form", handler)
    return () => window.removeEventListener("open-lead-form", handler)
  }, [])

  const handleClose = () => setOpen(false)

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/ca833cae-fc01-465b-a0ef-6a511b4d40d8.png"
          alt="Кухни на заказ в Кемерово"
          className="w-full h-full object-cover object-[70%_center] md:object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-left md:text-center max-w-5xl py-20 sm:py-16 md:py-[66px]">
        <h1 className="text-white leading-[1.1] tracking-tight text-balance pt-10 pb-6 font-thin text-left md:text-center text-4xl sm:text-5xl md:text-6xl">Кухни на заказ в Кемерово.</h1>
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
            href="https://t.me/kuhniotproizvNOVOKUZNECK_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/40 px-6 sm:px-8 tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 text-sm font-extrabold text-[#ffa800] py-4 sm:py-5"
          >Получить расчет в Telegram</a>
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
          <div className="relative bg-background w-full max-w-md p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-xs tracking-[0.3em] uppercase mb-2 text-foreground">Предварительный расчет и консультация</p>
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-foreground">Рассчитать проект</h2>
            <p className="text-sm leading-relaxed mb-8 text-muted-foreground">Оставьте заявку — свяжемся в течение 15 минут, обсудим ваш проект.</p>
            <LeadForm onSuccess={handleClose} />
          </div>
        </div>
      )}
    </section>
  )
}