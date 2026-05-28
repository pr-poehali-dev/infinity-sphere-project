import { useState } from "react"
import { X } from "lucide-react"

export function Hero() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", messenger: "max" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus("loading")
    await new Promise((r) => setTimeout(r, 800))
    setStatus("success")
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
          <div className="bg-white rounded-lg w-full max-w-md p-8 relative shadow-2xl">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <p className="text-2xl font-semibold text-gray-800 mb-2">Заявка отправлена!</p>
                <p className="text-gray-500">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Рассчитать стоимость кухни</h3>
                <p className="text-gray-500 text-sm mb-6">Заполните форму — ответим в течение 15 минут</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя *"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#ffa800] transition-colors text-sm"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Номер телефона *"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#ffa800] transition-colors text-sm"
                  />

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Как с вами связаться?</p>
                    <div className="flex gap-3">
                      {[{ value: "max", label: "MAX" }, { value: "vk", label: "ВКонтакте" }].map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex-1 flex items-center justify-center border rounded py-2.5 cursor-pointer text-sm font-medium transition-colors ${
                            form.messenger === opt.value
                              ? "border-[#ffa800] bg-[#ffa800]/10 text-[#ffa800]"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="messenger"
                            value={opt.value}
                            checked={form.messenger === opt.value}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#ffa800] text-foreground font-medium py-3 rounded hover:bg-amber-500 transition-colors disabled:opacity-60 text-sm mt-1"
                  >
                    {status === "loading" ? "Отправка..." : "Отправить заявку"}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
