const steps = [
  { num: "01", title: "Консультация", desc: "Обсуждаем вашу кухню, пожелания и бюджет. Бесплатно, без обязательств." },
  { num: "02", title: "Замер", desc: "Выезжаем на объект, снимаем точные размеры помещения." },
  { num: "03", title: "Дизайн-концепция", desc: "Создаём реалистичные 3D-визуализации. Вы видите результат до старта." },
  { num: "04", title: "Расчёт стоимости", desc: "Фиксируем полную смету без скрытых доплат. Цена не меняется в процессе." },
  { num: "05", title: "Производство", desc: "Изготавливаем кухню на собственном производстве под точные размеры." },
  { num: "06", title: "Доставка и монтаж", desc: "Привозим, собираем и устанавливаем всё «под ключ» в согласованные сроки." },
  { num: "07", title: "Приёмка", desc: "Принимаете готовую кухню. Всё работает. Живёте и готовите с удовольствием." },
]

export function Process() {
  return (
    <section id="process" className="py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Как мы работаем</p>
            <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-6 lg:text-7xl">
              7 шагов<br />до готовой<br />кухни
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Прозрачный процесс, чёткие сроки и один ответственный за всё. Вы не теряете время — мы делаем работу.
            </p>
          </div>

          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className={`relative flex gap-8 pb-10 border-l border-border ml-5 ${
                  index === steps.length - 1 ? "" : ""
                }`}
              >
                <div className="absolute -left-5 top-0 w-10 h-10 bg-background border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-foreground/60">{step.num}</span>
                </div>
                <div className="pl-8">
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
