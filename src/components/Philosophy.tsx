import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Новостройки",
    description:
      "Помогаем жильцам новых ЖК въехать в полностью готовую квартиру с красивой кухней. Берём на себя всё — от обмеров до последней ручки на фасаде.",
  },
  {
    title: "Семейные квартиры",
    description:
      "Продумываем пространство с учётом реальной жизни семьи: удобные кухни с большим количеством хранения, качественные фасады, встроенная техника.",
  },
  {
    title: "Студии под аренду",
    description:
      "Создаём стильное и долговечное кухонное оснащение для арендных квартир. Быстро, практично и в рамках бюджета.",
  },
  {
    title: "Премиальные интерьеры",
    description:
      "Индивидуальные дизайнерские решения для тех, кто ценит материалы и детали. Авторские фасады, натуральный камень, нестандартные конфигурации.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 md:py-29">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Для кого мы работаем</p>
            <h2 className="text-4xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Кухня
              <br />
              <HighlightedText>готова</HighlightedText>
            </h2>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="relative overflow-hidden rounded">
                <img
                  src="https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/0cb2e1ac-ae81-407f-b437-1218443d02bc.png"
                  alt="До — пустое помещение"
                  className="w-full h-full object-cover aspect-square"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded"></span>
              </div>
              <div className="relative overflow-hidden rounded">
                <img
                  src="https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/789ddcd5-9f6c-47be-912a-71fb1f0d88fa.png"
                  alt="После — готовая кухня"
                  className="w-full h-full object-cover aspect-square"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded"></span>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">Мы работаем с жителями Новокузнецка, которые хотят красивую функциональную кухню  без бесконечных поездок по магазинам и стресса с подрядчиками.</p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => { itemRefs.current[index] = el }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}