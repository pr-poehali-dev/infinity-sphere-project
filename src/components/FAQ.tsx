import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит кухня на заказ в Кемерово и Новокузнецке?",
    answer:
      "Стоимость зависит от размера, материалов и конфигурации. Кухня эконом-класса — от 180 000 ₽, среднего сегмента — от 280 000 ₽, премиум — от 600 000 ₽. Точную сумму рассчитываем после замера и обсуждения вашего проекта.",
  },
  {
    question: "Сколько времени занимает изготовление кухни?",
    answer:
      "В среднем 30–45 дней от подписания договора до монтажа. Кухня эконом — от 25 дней. Сложные конфигурации с нестандартными фасадами — до 60 дней. Сроки фиксируем в договоре.",
  },
  {
    question: "Делаете ли вы замер и дизайн-проект?",
    answer:
      "Да, делаем замер. На основе замеров разрабатываем 3D-визуализацию, согласовываем каждый элемент — и только потом делается расчет. Вы видите точный результат до начала работ и честную точную цену. Разработка 3D модели с визуалом оплачивается на этапе разработки проекта, в случае заказа кухни сумма включается в общую стоимость договора.",
  },
  {
    question: "Какие материалы вы используете?",
    answer:
      "Работаем с ЛДСП, МДФ, массивом дерева. Фасады — акриловые, эмаль, шпон, пластик. Столешницы — постформинг, HPL, акриловый камень, натуральный мрамор. Фурнитура Blum, Hettich. Подбираем под бюджет и задачи.",
  },
  {
    question: "Есть ли гарантия на кухню?",
    answer:
      "Гарантия на кухни собственного производства — 3 года. Всё прописывается в договоре. Гарантийное обслуживание — один звонок, мы приезжаем и решаем.",
  },
  {
    question: "Как начать сотрудничество?",
    answer:
      "Оставьте заявку на сайте или позвоните нам. Свяжемся в течение 15 минут, обсудим проект и назначим выезд специалиста на замер. После замера — получите готовую смету и 3D-визуализацию в течение 2 рабочих дней.",
  },
  {
    question: "В каких районах Кемерово и Новокузнецка вы работаете?",
    answer:
      "Работаем по всему Кемерово (Центральный, Ленинский, Заводский, Кировский, Рудничный) и по всему Новокузнецку. Выезжаем на замер по обоим городам и в пригород — замер включён в стоимость проекта.",
  },
  {
    question: "Можно ли сделать кухню в рассрочку?",
    answer:
      "Да, мы предлагаем рассрочку и работаем с банками-партнёрами. Условия рассрочки обсуждаются индивидуально после расчёта стоимости. Также возможна поэтапная оплата по договору.",
  },
  {
    question: "Делаете ли вы маленькие кухни для квартир-студий?",
    answer:
      "Конечно. Мы проектируем кухни любого размера — от компактных для студий и малогабаритных квартир до больших кухонь-гостиных. Для небольших помещений используем эргономичные решения и места для хранения по максимуму.",
  },
  {
    question: "Что входит в стоимость кухни под ключ?",
    answer:
      "В стоимость кухни под ключ входит: корпус, фасады, столешница, фурнитура Blum/Hettich, доставка и монтаж в Кемерово. По желанию добавляем встроенную технику, мойку, смеситель и подсветку. Никаких скрытых доплат — всё фиксируется в договоре.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы и ответы</p>
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
                  openIndex === index ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="leading-relaxed pb-6 pr-12 text-[#000000]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}