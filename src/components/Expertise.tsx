import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const services = [
  {
    title: "Кухни на заказ",
    description: "Проектируем и изготавливаем кухни под размеры вашей квартиры — любая конфигурация, фасады, столешницы, встроенная техника.",
    icon: "ChefHat",
  },
  {
    title: "Шкафы и гардеробные",
    description: "Встроенные шкафы-купе и гардеробные комнаты с умной системой хранения. От эскиза до монтажа.",
    icon: "Layers",
  },
  {
    title: "Мебель для всей квартиры",
    description: "Диваны, кровати, столы, стеллажи — комплектуем квартиру целиком, подбирая единый стиль и цветовую гамму.",
    icon: "Sofa",
  },
  {
    title: "Комплектация техникой",
    description: "Подбираем бытовую технику ведущих брендов, организуем доставку и подключение всех приборов.",
    icon: "Zap",
  },
  {
    title: "Дизайн-проект",
    description: "Разрабатываем реалистичные 3D-визуализации каждого помещения до начала производства, чтобы вы точно видели результат.",
    icon: "PenTool",
  },
  {
    title: "Авторское сопровождение",
    description: "Дизайнер ведёт проект от первого замера до финальной приёмки. Один подрядчик — полная ответственность.",
    icon: "Star",
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
    <section id="services" ref={sectionRef} className="py-20 md:py-29">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-3xl mb-12 md:mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Что мы делаем</p>
          <h2 className="text-4xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Услуги</HighlightedText> под
            <br />
            ключ
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Один подрядчик — вся квартира. Не нужно искать отдельно кухню, шкафы и диван. Мы делаем всё сами, от дизайна до монтажа.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {services.map((area, index) => (
            <div
              key={area.title}
              ref={(el) => { itemRefs.current[index] = el }}
              data-index={index}
              className={`relative pl-8 border-l border-border transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Icon name={area.icon} size={40} className="mb-4 text-foreground" />
              <h3 className="text-xl font-medium mb-4">{area.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-16">
          <a
            href="https://max.ru/id421714233013_bot"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => (window as { ym?: (id: number, goal: string, target: string) => void }).ym?.(109491748, 'reachGoal', 'max_calc_click')}
            className="inline-flex items-center justify-center gap-2 border border-border px-8 tracking-widest uppercase hover:bg-secondary transition-colors duration-300 text-sm font-extrabold py-5 text-foreground"
          >
            Рассчитать в МАХ
          </a>
        </div>
      </div>
    </section>
  )
}