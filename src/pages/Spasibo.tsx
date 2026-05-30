import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Spasibo() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ym = (window as any).ym
    if (typeof ym === "function") {
      ym(109491748, "reachGoal", "spasibo")
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://cdn.poehali.dev/projects/2eda4cc8-0def-4c23-8229-1f3dd04a0411/bucket/4518ab70-17cf-418a-a793-c475fbfecca2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "zoomOut 10s ease-out forwards",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center max-w-md">
        <div className="w-16 h-16 bg-white flex items-center justify-center mx-auto mb-8">
          <span className="text-foreground text-3xl font-light">✓</span>
        </div>
        <h1 className="text-3xl font-semibold mb-4 text-white">Спасибо за заявку!</h1>
        <p className="text-white/70 text-base leading-relaxed mb-10">
          Свяжемся с вами в течение 15 минут.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#ffa800] text-foreground text-sm tracking-widest uppercase font-medium hover:bg-amber-500 transition-colors duration-300"
        >
          На главную
        </Link>
      </div>
      <style>{`
        @keyframes zoomOut {
          from { transform: scale(1.2); }
          to { transform: scale(1); }
        }
      `}</style>
    </main>
  )
}