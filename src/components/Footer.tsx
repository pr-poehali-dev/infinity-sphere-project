export function Footer() {
  return (
    <footer className="py-12 md:py-20 border-t border-border">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <img
                src="https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/61052267-e6c5-4719-949e-d25cac3ec242.png"
                alt="Мастерская современной мебели"
                className="h-16 w-auto"
                loading="lazy"
              />
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Кухни на заказ в Кемерово. Проектируем, изготавливаем и монтируем — от замера до последней ручки на фасаде.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Навигация</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { label: "Проекты", href: "#projects" },
                { label: "Услуги", href: "#services" },
                { label: "Пакеты", href: "#packages" },
                { label: "Процесс", href: "#process" },
                { label: "Контакты", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:+79132968333" className="hover:text-foreground transition-colors">
                  +7 913 296-83-33
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/kuhniotproizvNOVOKUZNECK_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  MAX
                </a>
              </li>
              <li>
                <a
                  href="https://vk.com/mebel.kuhni.skaf.novokuzneck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  ВКонтакте
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border mb-8">
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3 max-w-4xl">
            <p>
              <strong className="text-foreground font-medium">Кухни на заказ в Кемерово</strong> от производителя —
              изготавливаем и устанавливаем кухонные гарнитуры под ключ за 35 дней. Работаем во всех районах города:
              Центральный, Ленинский, Заводский, Кировский и Рудничный. Бесплатный замер, дизайн-проект с 3D-визуализацией
              и точный расчёт стоимости до начала работ.
            </p>
            <p>
              Изготавливаем кухни любой сложности и размера: компактные кухни для квартир-студий, угловые и П-образные
              гарнитуры, кухни-гостиные и премиальные проекты. Используем качественные материалы — ЛДСП, МДФ, массив дерева,
              акриловые фасады и столешницы из искусственного камня. Фурнитура Blum и Hettich, гарантия 3 года. Возможна
              рассрочка. Закажите кухню мечты в Кемерово — оставьте заявку, и мы свяжемся с вами в течение 15 минут.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>MSM — Кухни на заказ в Кемерово</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/consent" className="hover:text-foreground transition-colors">
              Согласие на обработку данных
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}