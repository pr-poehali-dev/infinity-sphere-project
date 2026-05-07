import { useState, useEffect, MouseEvent } from "react"
import { cn } from "../lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 my-0 py-0 rounded-none",
        scrolled || mobileMenuOpen
          ? "bg-primary backdrop-blur-md py-4 top-4 left-4 right-4 rounded-2xl"
          : "bg-transparent py-4 top-0 left-0 right-0",
      )}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between md:px-6">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
            <img src="https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/8fefa419-df8f-4cf9-874f-e130e35d655c.png" alt="Мастерская современной мебели" className="w-auto h-12 md:h-16" />
            <div className="flex flex-col leading-tight">
              <span className="text-white text-[11px] sm:text-sm font-medium tracking-wide leading-tight">Мастерская<br className="sm:hidden" /> Современной Мебели</span>
              <span className="text-white/60 text-[10px] sm:text-xs tracking-wide">г. Новокузнецк</span>
            </div>
          </a>
          <div className="flex items-center gap-1 ml-1">
            <a
              href="https://max.ru/id421714233013_biz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              title="MAX"
            >
              <svg role="img" viewBox="0 0 24 24" fill="white" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.215 0A2.215 2.215 0 0 0 0 2.215v19.57A2.215 2.215 0 0 0 2.215 24h19.57A2.215 2.215 0 0 0 24 21.785V2.215A2.215 2.215 0 0 0 21.785 0zm7.386 6.005h1.633c.26 0 .357.106.463.344l1.917 4.407 1.917-4.407c.106-.238.203-.344.463-.344h1.633c.26 0 .373.106.373.373v11.244c0 .267-.113.373-.373.373h-1.562c-.267 0-.373-.106-.373-.373V10.15l-1.439 3.24c-.12.267-.24.352-.479.352h-.718c-.239 0-.36-.085-.479-.352l-1.44-3.24v7.472c0 .267-.105.373-.372.373H9.601c-.268 0-.373-.106-.373-.373V6.378c0-.267.105-.373.373-.373z"/>
              </svg>
            </a>
            <a
              href="https://vk.com/mebel.kuhni.skaf.novokuzneck"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              title="ВКонтакте"
            >
              <svg role="img" viewBox="0 0 24 24" fill="white" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.745-.576.745z"/>
              </svg>
            </a>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
          {[
            { label: "Главная", href: "#hero" },
            { label: "О нас", href: "#about" },
            { label: "Каталог", href: "#projects" },
            { label: "Услуги", href: "#services" },
            { label: "Вопросы", href: "#faq" },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="hover:text-[rgb(251,146,60)] transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[rgb(251,146,60)] after:transition-all after:duration-300 text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={cn(
            "hidden md:inline-flex items-center gap-2 text-sm px-5 py-2.5 transition-all duration-300",
            scrolled
              ? "bg-white text-foreground border border-foreground/20 hover:bg-foreground hover:text-white"
              : "bg-white text-foreground border border-foreground/20 hover:bg-foreground hover:text-white",
          )}
        >
          Заказать замер
        </a>

        <button
          className="md:hidden z-50 transition-colors duration-300 text-white"
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto px-6">
          <ul className="flex flex-col gap-6 mb-8">
            {[
              { label: "Главная", href: "#hero" },
              { label: "О нас", href: "#about" },
              { label: "Каталог", href: "#projects" },
              { label: "Услуги", href: "#services" },
              { label: "Вопросы", href: "#faq" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-[rgb(251,146,60)] transition-colors duration-300 text-white text-4xl font-light block"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 bg-white text-foreground border border-foreground/20 hover:bg-foreground hover:text-white transition-all duration-300 mb-4"
            onClick={closeMobileMenu}
          >
            Заказать замер
          </a>
        </div>
      </div>
    </header>
  )
}