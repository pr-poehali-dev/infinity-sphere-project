import { useState, useRef, useCallback, useEffect } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react"

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
    images: [
      "https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/e2ae5c44-64a2-4bf8-996a-c8309352e257.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/471b8e12-5a75-4c8c-96d4-a1854f2e9f31.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/d14232df-5345-489f-9732-52baca8daed4.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/d1cbc7ea-e0dc-4b4d-9111-9fb6c90b44fa.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/4ee4b9f6-23f4-4978-904d-3f0eba0c437e.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/5760a168-7011-455c-8e65-3b6fae02497f.jpg",
    ],
  },
  {
    id: 5,
    title: "ЖК Томь",
    style: "Современный минимализм",
    price: "380 000 ₽",
    days: "40 дней",
    images: [
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/b97da7e8-9edc-4280-96b3-523d96a7d005.png",

      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/1b615c40-995e-4e20-8c62-4a14cdf9b590.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/8576899d-188b-4c9b-a55c-b3c2a7adefbe.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/862d73be-fde9-4379-9858-b3057616e6f0.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/25b8bfcc-450d-4fab-9a7f-cf0ac9570e1f.png",
    ],
  },
  {
    id: 2,
    title: "МКР Лесная Поляна",
    style: "Скандинавский стиль",
    price: "480 000 ₽",
    days: "35 дней",
    images: [
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/8a4396b9-d824-4c4b-853e-aa17853ecde6.png",
      "https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/8c53bb01-c1d6-4050-a9d0-cbf968f02c17.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/95cbe8f0-6687-473c-ba29-f54d5b468225.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/b0065eb7-54b1-4e60-8a8c-03275ea56705.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/40eaeccb-6446-481c-bc78-f8878c65928c.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/c7197e55-4828-4d66-9819-7047ec9050b1.png",
    ],
  },
  {
    id: 3,
    title: "Кухня Осенний бульвар",
    style: "Неоклассика",
    price: "350 000 ₽",
    days: "30 дней",
    images: [
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/6deb478b-726f-4a0f-846c-8b9fea7869f6.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/f24dd6b0-c595-4642-b7c9-5f90ff666b1c.JPG",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/2653d2c4-b81b-40ca-8ee8-12e5c4822b7f.JPG",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/6be6115d-1fc0-4097-8a20-9173de476ab9.JPG",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/2caa5a78-8552-45a8-aad7-619dc40298f8.JPG",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/ee22056a-a475-4f0b-99cc-1f79ebf874c9.JPG",
    ],
  },
  {
    id: 4,
    title: "ЖК Бизнес класса",
    style: "Лофт",
    price: "от 355 000 ₽",
    days: "30 дней",
    images: [
      "https://cdn.poehali.dev/projects/4b174f8a-7b40-422d-92f3-3d0d5ddcf97f/bucket/ff0ee8cf-d257-45a5-9042-54bdb1634fc7.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/ef1c8ebb-9cf4-4c85-824a-76b28d72a97b.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/f6d55a7b-43fc-48e6-b879-7bb149efd888.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/814e50a6-e361-4215-b6ee-1d64b3d3e335.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/2e3e1ea8-9def-464f-b4c8-b2549f0095e6.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/1166a461-3344-4819-8c68-496f0cfc3831.jpg",
    ],
  },
  {
    id: 6,
    title: "ЖК Притомский",
    style: "Современный минимализм",
    price: "от 440 000 ₽",
    days: "от 30 дней",
    image: "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/bc220291-cf07-4c52-9e6b-0898b5af84d7.png",
  },
  {
    id: 7,
    title: "Микрорайон Лесная поляна",
    style: "Минимализм с островом",
    price: "от 390 000 ₽",
    days: "от 30 дней",
    images: [
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/7bb2e738-f3c7-4824-9b91-0eeffd726645.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/f41c9aec-c0a7-4da7-a9eb-66b57105fa5d.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/86041fa1-b2b4-4d54-9e91-0a7ac8244a27.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/9c7cb1f1-3aac-41db-9981-c9e5276d494c.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/3886d5f6-4f7d-4eb8-96ff-a5fcc1c02574.jpg",
    ],
  },
  {
    id: 8,
    title: "ЖК Бульвар",
    style: "Современный минимализм",
    price: "от 390 000 ₽",
    days: "от 30 дней",
    images: [
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/9f89ab7d-44be-4af7-a5b8-3d89ea54f698.png",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/ff06e8a0-1e81-461b-a5e4-1333f7903964.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/3807197d-7750-4e24-a34d-fa1259893c49.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/fd972c3e-99ec-45b9-a28e-da901fa0ba57.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/71771132-8d84-4ffa-8462-51561394b2c5.jpg",
      "https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/30506ac0-d479-4fd2-8c09-be322fc10e5a.jpg",
    ],
  },
]

function getImages(project: Project): string[] {
  if (project.images && project.images.length > 0) return project.images
  if (project.image) return [project.image]
  return []
}

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex)
  const touchStartX = useRef<number | null>(null)

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [prev, next, onClose])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev() }
    touchStartX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
      >
        <X className="w-7 h-7" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <img
        src={images[index]}
        alt=""
        className="max-h-[90vh] max-w-[92vw] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIndex(i) }}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${i === index ? "bg-white scale-125" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const images = getImages(project)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
      <div
        className="relative overflow-hidden aspect-[4/3] mb-6 cursor-zoom-in"
        onClick={() => images.length > 0 && setLightboxIndex(currentIndex)}
      >
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={project.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}
          />
        ) : (
          <div className="w-full h-full bg-secondary flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border">
            <span className="text-4xl">📸</span>
            <p className="text-muted-foreground text-sm">Фото скоро появится</p>
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </article>
  )
}

export function Projects() {

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
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-16">
          <button
            onClick={() => window.dispatchEvent(new Event("open-lead-form"))}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-5 text-sm tracking-widest uppercase font-extrabold hover:opacity-90 transition-colors duration-300 bg-[#ffa800] text-foreground"
          >отправить заявку</button>
          <a
            href="https://max.ru/id421714233013_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-border px-6 sm:px-8 tracking-widest uppercase hover:bg-secondary transition-colors duration-300 text-sm font-extrabold text-foreground py-4 sm:py-5"
          >рассчитать в МАХ</a>
        </div>
      </div>
    </section>
  )
}