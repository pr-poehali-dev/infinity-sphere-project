import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит кухня на заказ в Кемерово?",
    answer:
      "Стоимость зависит от размера, материалов и конфигурации. Кухня эконом-класса — от 120 000 ₽, среднего сегмента — от 250 000 ₽, премиум — от 500 000 ₽. Точную сумму рассчитываем после замера и обсуждения вашего проекта.",
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
      "Оставьте заявку на сайте или позвоните нам. Свяжемся в течение 15 минут, обсудим проект и назначим бесплатный выезд на замер. После замера — получите готовую смету и 3D-визуализацию в течение 2 рабочих дней.",
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