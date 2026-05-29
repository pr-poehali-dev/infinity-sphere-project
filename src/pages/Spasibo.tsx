import { Link } from "react-router-dom"

export default function Spasibo() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-foreground flex items-center justify-center mx-auto mb-8">
          <span className="text-primary-foreground text-3xl font-light">✓</span>
        </div>
        <h1 className="text-3xl font-semibold mb-4 text-foreground">Спасибо за заявку!</h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          Свяжемся с вами в течение 15 минут.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-primary-foreground text-sm tracking-widest uppercase font-medium hover:bg-foreground/90 transition-colors duration-300"
        >
          На главную
        </Link>
      </div>
    </main>
  )
}
