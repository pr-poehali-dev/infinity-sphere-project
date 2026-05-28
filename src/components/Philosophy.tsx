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

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <img
                    src="https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/1c5d2c6f-23ed-4763-891c-95f02094b164.png"
                    alt="До — пустое помещение"
                    className="w-full h-full object-cover rounded aspect-square"
                  />
                </div>
                <div className="relative">
                  <img
                    src="https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/887f3d22-f288-4f04-87ee-33af2854f6a3.png"
                    alt="После — готовая кухня"
                    className="w-full h-full object-cover rounded aspect-square"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Мы работаем с жителями Кемерово, которые хотят красивую функциональную кухню — без бесконечных поездок
              по магазинам и стресса с подрядчиками.
            </p>

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