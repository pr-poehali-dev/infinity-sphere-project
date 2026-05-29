import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

type Project = {
  id: number
  title: string
  style: string
  price: string
  days: string
  image?: string
  images?: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Кухня в Кедровом бульваре",
    style: "Современный минимализм",
    price: "до 650 000 ₽",
    days: "45 дней",
    image: "https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/e2ae5c44-64a2-4bf8-996a-c8309352e257.png",
  },
  {
    id: 5,
    title: "ЖК Томь",
    style: "Современный минимализм",
    price: "380 000 ₽",
    days: "40 дней",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/70168c0b-2a3a-4b5d-8463-9b8dbc7cc330.png",
  },
  {
    id: 2,
    title: "МКР Лесная Поляна",
    style: "Скандинавский стиль",
    price: "480 000 ₽",
    days: "35 дней",
    images: [
      "https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/8c53bb01-c1d6-4050-a9d0-cbf968f02c17.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/4d36750d-53b0-4c20-b3be-17fed01690a2.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/72086471-819d-49b1-a7f2-7820552b5cde.png",
    ],
  },
  {
    id: 3,
    title: "Кухня на бульваре Строителей",
    style: "Неоклассика",
    price: "300 000 ₽",
    days: "35 дней",
    image: "https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/06057cfc-bd55-4854-99e8-5f6ede0ac743.png",
  },
  {
    id: 4,
    title: "ЖК Бизнес класса",
    style: "Лофт",
    price: "от 320 000 ₽",
    days: "30 дней",
    image: "https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/ff0ee8cf-d257-45a5-9042-54bdb1634fc7.png",
  },
  {
    id: 6,
    title: "Ваш проект",
    style: "Стиль по вашему выбору",
    price: "под ключ",
    days: "от 30 дней",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/bc220291-cf07-4c52-9e6b-0898b5af84d7.png",
  },
  {
    id: 7,
    title: "Ваш проект",
    style: "Стиль по вашему выбору",
    price: "под ключ",
    days: "от 30 дней",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/7bb2e738-f3c7-4824-9b91-0eeffd726645.png",
  },
  {
    id: 8,
    title: "Ваш проект",
    style: "Стиль по вашему выбору",
    price: "под ключ",
    days: "от 30 дней",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/9f89ab7d-44be-4af7-a5b8-3d89ea54f698.png",
  },
]

function getImages(project: Project): string[] {
  if (project.images && project.images.length > 0) return project.images
  if (project.image) return [project.image]
  return []
}

function ProjectCard({
  project,
  revealed,
  cardRef,
}: {
  project: Project
  revealed: boolean
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const images = getImages(project)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((i) => (i + 1) % images.length)
  }

  return (
    <article
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={cardRef} className="relative overflow-hidden aspect-[4/3] mb-6">
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}
          />
        ) : (
          <div className="w-full h-full bg-secondary flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border">
            <span className="text-4xl">📸</span>
            <p className="text-muted-foreground text-sm">Фото скоро появится</p>
          </div>
        )}
        <div
          className="absolute inset-0 bg-primary origin-top"
          style={{
            transform: revealed ? "scaleY(0)" : "scaleY(1)",
            transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white">
            <p className="text-sm text-white/70 mb-1">{project.style}</p>
            <p className="text-lg font-medium">{project.price}</p>
            <p className="text-sm text-white/70">Срок: {project.days}</p>
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === currentIndex ? "bg-white scale-125" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
          <p className="text-muted-foreground text-sm">{project.style}</p>
        </div>
        <span className="text-muted-foreground/60 text-sm">{project.days}</span>
      </div>
    </article>
  )
}

export function Projects() {
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-20 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Реализованные проекты</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши кухни в Кемерово</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Обсудить ваш проект
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              revealed={revealedImages.has(project.id)}
              cardRef={(el) => { imageRefs.current[index] = el }}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-16">
          <button
            onClick={() => window.dispatchEvent(new Event("open-lead-form"))}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-5 text-sm tracking-widest uppercase font-extrabold hover:opacity-90 transition-colors duration-300 bg-[#ffa800] text-foreground"
          >
            Рассчитать стоимость
          </button>
          <a
            href="https://max.ru/id421714233013_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-border px-6 sm:px-8 tracking-widest uppercase hover:bg-secondary transition-colors duration-300 text-sm font-extrabold text-foreground py-4 sm:py-5"
          >
            Получить концепцию в MAX
          </a>
        </div>
      </div>
    </section>
  )
}