import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PawPrint, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HeroSection() {
  return (
    <section className="w-full py-12 md:min-h-[90vh] px-4 bg-background flex items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[6fr_4fr] gap-14 items-center">
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-4 text-sm">
              <PawPrint className="w-4 h-4 mr-1" />
              Plataforma Veterinaria Digital
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground/85 mb-6 leading-tight">
              El cuidado de tus mascotas,
              <span className="text-primary block">simplificado.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              VetSync conecta a dueños de mascotas con servicios veterinarios de calidad. Gestiona citas, historial
              médico y servicios en una sola plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base">
                <Link to="/register">
                  Registrarse
                  <ArrowRight className="ml-1 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="text-base">
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center items-center px-4 lg:px-0">
            <div className="relative w-full max-w-md aspect-[3/2]">
              <div className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 w-full h-full bg-primary/20 rounded-3xl transform -rotate-1 lg:-rotate-3 transition-transform duration-500 group-hover:rotate-0"></div>
              <img
                src="https://loxqcjbiwieeukymlbdp.supabase.co/storage/v1/object/sign/imagenes/hero.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81Y2Q3YTZkZS05OTMwLTQxODItODY2Ny02YjAzZDZkYmZiMWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZW5lcy9oZXJvLmpwZWciLCJpYXQiOjE3NTEwOTkwNTMsImV4cCI6MjA2NjQ1OTA1M30.jKJ39qk5tkrIep3bR1Zs0REvRfHQKvtiHToSkNc3rXQ"
                alt="Veterinaria cuidando a un perro"
                className="relative w-full h-full rounded-3xl shadow-lg object-cover z-10 transform rotate-2 transition-transform duration-500 group-hover:rotate-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
