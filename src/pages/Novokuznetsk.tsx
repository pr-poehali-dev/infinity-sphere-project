import { useState, useEffect } from "react"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Philosophy } from "../components/Philosophy"
import { Projects } from "../components/Projects"
import { Expertise } from "../components/Expertise"
import { Packages } from "../components/Packages"
import { Process } from "../components/Process"
import { FAQ } from "../components/FAQ"
import { CallToAction } from "../components/CallToAction"
import { Footer } from "../components/Footer"
import { CalcBanner } from "../components/CalcBanner"
import Icon from "@/components/ui/icon"

export default function Novokuznetsk() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <main className="min-h-screen">
      <Header city="novokuznetsk" />
      <Hero city="novokuznetsk" />
      <Philosophy />
      <Projects />
      <Expertise />
      <Packages />
      <Process />
      <FAQ />
      <CallToAction city="novokuznetsk" />
      <Footer city="novokuznetsk" />
      <CalcBanner />
      <button
        aria-label="Наверх"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center bg-foreground text-primary-foreground shadow-lg hover:bg-foreground/80 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <Icon name="ChevronUp" size={20} />
      </button>
    </main>
  )
}
