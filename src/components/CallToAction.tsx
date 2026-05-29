import { LeadForm } from "./LeadForm"

export function CallToAction() {
  return (
    <section id="contact" className="py-32 md:py-40 bg-foreground text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/50 text-sm tracking-[0.3em] uppercase mb-8">Начать проект</p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Получите кухню вашей мечты
            <br />
            <span className="text-stone-400">без стресса и лишних согласований</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Оставьте заявку — свяжемся в течение 15 минут, ответим на вопросы и назначим бесплатный замер.
          </p>
          <div className="max-w-xl mx-auto text-left">
            <LeadForm dark />
          </div>
          <p className="text-primary-foreground/40 text-xs text-center mt-4">
            Бесплатная консультация · Выезд на замер · Без обязательств
          </p>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <p className="text-primary-foreground/50 text-sm tracking-[0.3em] uppercase mb-6 text-center">Адрес офиса</p>
          <a
            href="https://yandex.ru/maps/?um=constructor%3Ab312bb11f026022e1a35c07b0fab0211aa512a6267f1099af98a7bb47b4264ac&source=constructorLink"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-primary-foreground/60 hover:text-primary-foreground text-sm mb-6 underline underline-offset-4 transition-colors"
          >
            Посмотреть расположение
          </a>
          <div className="rounded-2xl overflow-hidden">
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=98525116013"
              width="100%"
              height="400"
              frameBorder="0"
              title="Адрес офиса"
            />
          </div>
        </div>
      </div>
    </section>
  )
}