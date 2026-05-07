import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Кухня с островом",
    category: "Кухни на заказ",
    location: "Красноярск",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/7afd1844-3eda-4283-9f94-34082f6cbc09.jpg",
  },
  {
    id: 2,
    title: "Кухня «Бетон»",
    category: "Кухни на заказ",
    location: "Красноярск",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/014fd6a0-cd33-4208-9bc8-c90abeb3c103.jpg",
  },
  {
    id: 3,
    title: "Кухня «Мрамор»",
    category: "Кухни на заказ",
    location: "Красноярск",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/3c8ffc47-f131-403b-968d-d296cd8b4e39.jpg",
  },
  {
    id: 4,
    title: "Кухня «Дерево»",
    category: "Кухни на заказ",
    location: "Красноярск",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/005366de-b051-45fc-91ba-bcbc1baaa8f6.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
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
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Избранные работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши изделия</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть весь каталог
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}