import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/4e367197-3c9e-4e9d-b633-d22b2a3d95a9.png"
          alt="Меблировка квартир под ключ в Кемерово"
          className="w-full h-full object-cover object-[center_60%] md:object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl">
          <h1 className="sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] text-balance my-[83px] text-4xl font-normal text-left">
            Меблировка квартир под ключ в Кемерово от 300 000 руб.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8">
            За 30 дней, из разных по качеству материалов, с гарантией 3 года по договору.
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-black font-medium text-base px-8 hover:bg-white/90 transition-colors rounded-[0.25rem] py-2.5 mx-0 my-[50px]"
          >
            Получить расчёт
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-30">
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  )
}