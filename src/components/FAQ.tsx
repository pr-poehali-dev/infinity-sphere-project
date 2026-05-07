import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Вы работаете только по Красноярску или по всей России?",
    answer:
      "Наше производство находится в Красноярске. Доставку осуществляем по всему Красноярскому краю и ряду других регионов. Для уточнения стоимости и сроков доставки в ваш город — свяжитесь с нами.",
  },
  {
    question: "Сколько времени занимает изготовление мебели на заказ?",
    answer:
      "Сроки зависят от сложности и объёма заказа. В среднем: кухня или шкаф-купе — от 3 до 5 недель, мягкая мебель — от 2 до 4 недель, крупные гарнитуры — от 4 до 8 недель. Точные сроки обсуждаем при оформлении заказа.",
  },
  {
    question: "Делаете ли вы замер и дизайн-проект?",
    answer:
      "Да, наш замерщик приезжает бесплатно. На основе замеров мы разрабатываем 3D-визуализацию будущей мебели, согласовываем с вами каждый элемент — и только потом запускаем производство.",
  },
  {
    question: "Какие материалы вы используете?",
    answer:
      "Работаем с ЛДСП, МДФ, массивом дерева, натуральным шпоном. Фурнитура — Blum, Hettich, Grass. Фасады — акриловые, эмаль, пластик, шпон. Подбираем материалы под бюджет и задачи клиента.",
  },
  {
    question: "Есть ли гарантия на мебель?",
    answer:
      "Да, даём гарантию 2 года на все изделия. Гарантия распространяется на конструктивные элементы и фурнитуру. Также работаем с гарантийными обращениями оперативно — без лишней бюрократии.",
  },
  {
    question: "Как оформить заказ?",
    answer:
      "Позвоните или напишите нам — мы договоримся о бесплатном замере. После замера получите коммерческое предложение и 3D-визуализацию. При подтверждении — заключаем договор и вносится предоплата для запуска производства.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}