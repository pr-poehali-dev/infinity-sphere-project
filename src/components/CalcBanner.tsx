import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function CalcBanner() {
  const [visible, setVisible] = useState(false)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!closed) setVisible(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [closed])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => setClosed(true), 400)
  }

  if (closed) return null

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 w-72 rounded-xl overflow-hidden shadow-2xl transition-all duration-400 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      style={{
        backgroundImage: "url('https://master-mebel42.ru/wp-content/uploads/2022/10/calc-banner-bg-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative bg-black/50 p-5 py-0 px-[30px] my-0 mx-0">
        {/* Кнопка закрыть */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Картинка планшета */}
        <img
          src="https://master-mebel42.ru/wp-content/uploads/2023/04/tablet-kitch.png"
          alt="Онлайн-калькулятор стоимости кухни на заказ в Кемерово"
          className="w-28 mx-auto mb-3 drop-shadow-lg"
        />

        {/* Заголовок */}
        <h3 className="text-white font-bold text-center text-base leading-snug mb-1 uppercase">
          Рассчитайте стоимость<br />кухни + получите подарок
        </h3>

        {/* Подпись */}
        <p className="text-white/70 text-xs text-center mb-4">Всего пару секунд!</p>

        {/* Кнопка */}
        <a
          href="#contact"
          onClick={handleClose}
          className="flex items-center justify-center gap-2 bg-[#ffa800] hover:bg-amber-500 text-foreground text-sm font-medium py-2.5 px-4 rounded transition-colors w-full"
        >
          Начать расчет
          <span className="text-base">↗</span>
        </a>
      </div>
    </div>
  )
}