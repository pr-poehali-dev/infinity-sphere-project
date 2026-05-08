import { useState } from "react"
import { ArrowDown, X } from "lucide-react"

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
          src="https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/0a9f701f-3fc2-4d93-ab20-594bc637cd54.png"
          alt="Меблировка квартир под ключ в Кемерово"
          className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] md:object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl">
          <h1 className="sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] my-[83px] font-normal text-left text-[#dccaab] text-3xl">
            Меблировка квартир под ключ в Кемерово от 300 000 руб.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8">
            За 30 дней, из разных по качеству материалов, с гарантией 3 года по договору.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-block bg-white font-medium text-base px-8 hover:bg-white/90 transition-colors rounded-[0.25rem] py-2.5 mx-0 my-[50px] text-[#970000]"
          >
            Получить расчёт
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-30">
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
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
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Получить расчёт</h3>
                <p className="text-gray-500 text-sm mb-6">Заполните форму — ответим в течение 15 минут</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя *"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#970000] transition-colors text-sm"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Номер телефона *"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#970000] transition-colors text-sm"
                  />

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Как с вами связаться?</p>
                    <div className="flex gap-3">
                      <label className={`flex-1 flex items-center justify-center gap-2 border rounded py-2.5 cursor-pointer text-sm font-medium transition-colors ${form.messenger === "max" ? "border-[#970000] bg-[#970000]/5 text-[#970000]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                        <input
                          type="radio"
                          name="messenger"
                          value="max"
                          checked={form.messenger === "max"}
                          onChange={handleChange}
                          className="hidden"
                        />
                        Max
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-2 border rounded py-2.5 cursor-pointer text-sm font-medium transition-colors ${form.messenger === "vk" ? "border-[#970000] bg-[#970000]/5 text-[#970000]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                        <input
                          type="radio"
                          name="messenger"
                          value="vk"
                          checked={form.messenger === "vk"}
                          onChange={handleChange}
                          className="hidden"
                        />
                        ВКонтакте
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#970000] text-white font-medium py-3 rounded hover:bg-[#7a0000] transition-colors disabled:opacity-60 text-sm mt-1"
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
