import { useEffect, useRef, useState } from "react"
import { Sofa, UtensilsCrossed, BedDouble, Briefcase } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const expertiseAreas = [
  {
    title: "Мягкая мебель",
    description: "Диваны, кресла, пуфы — создаём комфортные и стильные изделия под любой интерьер. Собственные ткани и кожа, широкий выбор наполнителей.",
    icon: Sofa,
  },
  {
    title: "Кухни на заказ",
    description:
      "Проектируем и изготавливаем кухни любой сложности: от классики до минимализма. Фасады, столешницы, встроенная техника — всё под ключ.",
    icon: UtensilsCrossed,
  },
  {
    title: "Спальные гарнитуры",
    description:
      "Кровати, шкафы-купе, комоды, тумбочки — создаём гармоничные комплекты для спальни, которые служат годами.",
    icon: BedDouble,
  },
  {
    title: "Офисная мебель",
    description:
      "Рабочие места, переговорные, Reception — оснащаем офисы функциональной и представительной мебелью с учётом корпоративного стиля.",
    icon: Briefcase,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Что мы делаем</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Мебель</HighlightedText> для любого
            <br />
            пространства
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Производим мебель на заказ для квартир, домов и офисов. Каждое изделие — результат опыта, точных замеров и внимания к деталям.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="w-10 h-10 mb-4 text-foreground" strokeWidth={1} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}