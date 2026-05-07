import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Качество без компромиссов",
    description:
      "Используем только проверенные материалы: массив дерева, натуральный шпон, качественная фурнитура. Каждое изделие проходит строгий контроль перед отправкой клиенту.",
  },
  {
    title: "Индивидуальный подход",
    description:
      "Разрабатываем мебель под конкретное пространство и задачи. Учитываем планировку, стиль интерьера и пожелания заказчика — от эскиза до готового изделия.",
  },
  {
    title: "Собственное производство",
    description:
      "Всё изготавливаем на своём производстве под Красноярском. Это позволяет контролировать сроки, качество и держать адекватные цены без посредников.",
  },
  {
    title: "Долговечность",
    description: "Создаём мебель на десятилетия. Продуманные конструкции, надёжные соединения и качественные покрытия — чтобы мебель служила и радовала годами.",
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
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши принципы</p>
            <h2 className="text-4xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Мебель с
              <br />
              <HighlightedText>характером</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/images/exterior.png"
                alt="Архитектурный эскиз рабочего пространства"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Мебель — это больше чем предметы в комнате. Это атмосфера, в которой вы живёте каждый день. Мы создаём изделия, которые радуют и служат десятилетиями.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
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