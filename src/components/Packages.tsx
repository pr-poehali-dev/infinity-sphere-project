import { Check } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const packages = [
  {
    name: "START",
    subtitle: "Для студий и аренды",
    description: "Быстрое и стильное кухонное оснащение. Всё необходимое для комфортного проживания или сдачи в аренду.",
    price: "от 120 000 ₽",
    features: ["Кухонный гарнитур под размер", "Фасады ЛДСП или плёнка", "Столешница постформинг", "Встройка под технику", "Монтаж и установка"],
    featured: false,
  },
  {
    name: "COMFORT",
    subtitle: "Для семейных квартир",
    description: "Полноценная кухня с дизайн-проектом. Качественные материалы, удобное хранение, встроенная техника.",
    price: "от 280 000 ₽",
    features: ["Дизайн-проект + 3D-визуализация", "Фасады МДФ или эмаль", "Столешница HPL или акрил", "Встроенная техника", "Система хранения", "Авторский надзор"],
    featured: true,
  },
  {
    name: "PREMIUM",
    subtitle: "Индивидуальный дизайн",
    description: "Авторские решения для тех, кто ценит детали. Уникальная кухня, премиальные материалы, полное сопровождение.",
    price: "от 600 000 ₽",
    features: ["Полный дизайн-проект", "Авторские фасады на заказ", "Натуральный камень / шпон", "Техника премиум-брендов", "Эксклюзивный декор", "Гарантия 5 лет"],
    featured: false,
  },
]

export function Packages() {
  return (
    <section id="packages" className="py-32 bg-secondary/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Форматы сотрудничества</p>
          <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-6 lg:text-7xl">
            Три <HighlightedText>пакета</HighlightedText>
            <br />под любой бюджет
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col p-8 md:p-10 ${
                pkg.featured
                  ? "bg-foreground text-primary-foreground"
                  : "bg-background border border-border"
              }`}
            >
              {pkg.featured && <div className="absolute top-0 left-0 right-0 h-0.5 bg-stone-400" />}

              <div className="mb-6">
                <p className={`text-xs tracking-[0.4em] uppercase mb-2 ${pkg.featured ? "text-stone-400" : "text-muted-foreground"}`}>
                  {pkg.subtitle}
                </p>
                <h3 className={`text-4xl font-medium tracking-tight ${pkg.featured ? "text-white" : "text-foreground"}`}>
                  {pkg.name}
                </h3>
              </div>

              <p className={`text-sm leading-relaxed mb-8 ${pkg.featured ? "text-stone-300" : "text-muted-foreground"}`}>
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className={`flex items-center gap-3 text-sm ${pkg.featured ? "text-stone-200" : "text-foreground/80"}`}>
                    <Check className={`w-4 h-4 flex-shrink-0 ${pkg.featured ? "text-stone-400" : "text-foreground/50"}`} strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className={`mt-auto pt-6 border-t ${pkg.featured ? "border-white/10" : "border-foreground/10"}`}>
                <p className={`text-xl font-medium mb-4 ${pkg.featured ? "text-white" : "text-foreground"}`}>{pkg.price}</p>
                <a
                  href="#contact"
                  className={`inline-flex w-full items-center justify-center text-sm px-6 py-3 transition-all duration-300 tracking-wide ${
                    pkg.featured
                      ? "bg-white text-foreground hover:bg-stone-100"
                      : "border border-foreground text-foreground hover:bg-foreground hover:text-white"
                  }`}
                >
                  Выбрать пакет
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
