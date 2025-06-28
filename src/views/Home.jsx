import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Stethoscope, Users, Clock, Shield, Star, ArrowRight, PawPrint, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full flex items-center justify-center text-center bg-cover bg-center min-h-[60vh] py-24"
        style={{
          backgroundImage:
            'url(https://loxqcjbiwieeukymlbdp.supabase.co/storage/v1/object/sign/imagenes/hero.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81Y2Q3YTZkZS05OTMwLTQxODItODY2Ny02YjAzZDZkYmZiMWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZW5lcy9oZXJvLndlYnAiLCJpYXQiOjE3NTEwOTY2MjIsImV4cCI6MjA2NjQ1NjYyMn0.TN9W0zKNPQFcoo6sKDTnKPzawHNRNt6ZLCa8TEDng7A)'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto max-w-4xl px-4">
          <Badge
            variant="secondary"
            className="mb-4 text-sm bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            <PawPrint className="w-4 h-4 mr-1" />
            Plataforma Veterinaria Digital
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            El cuidado de tus mascotas,
            <span className="text-primary block">simplificado</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            VetSync conecta a dueños de mascotas con servicios veterinarios de calidad. Gestiona citas, historial médico
            y servicios en una sola plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link to="/register">
                Crear Cuenta
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-3">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Todo lo que necesitas para cuidar a tus mascotas
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Una plataforma completa que simplifica la gestión veterinaria para dueños y profesionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Gestión de Mascotas',
                description: 'Registra y administra toda la información de tus mascotas en un perfil completo.',
                link: '/mascotas',
                linkText: 'Ver Mascotas',
                color: 'text-green-500',
                bgColor: 'bg-green-500/10'
              },
              {
                icon: Calendar,
                title: 'Citas Inteligentes',
                description: 'Agenda citas veterinarias de manera rápida y recibe recordatorios automáticos.',
                link: '/citas',
                linkText: 'Agendar Cita',
                color: 'text-blue-500',
                bgColor: 'bg-blue-500/10'
              },
              {
                icon: Stethoscope,
                title: 'Servicios Completos',
                description: 'Accede a una amplia gama de servicios veterinarios especializados.',
                link: '/servicios',
                linkText: 'Ver Servicios',
                color: 'text-purple-500',
                bgColor: 'bg-purple-500/10'
              },
              {
                icon: Clock,
                title: 'Historial Médico',
                description: 'Mantén un registro completo del historial médico y tratamientos.',
                color: 'text-orange-500',
                bgColor: 'bg-orange-500/10'
              },
              {
                icon: Shield,
                title: 'Datos Seguros',
                description: 'Tu información y la de tus mascotas está protegida con los más altos estándares.',
                color: 'text-red-500',
                bgColor: 'bg-red-500/10'
              },
              {
                icon: Star,
                title: 'Profesionales Certificados',
                description: 'Conecta con veterinarios certificados y especialistas de confianza.',
                color: 'text-yellow-500',
                bgColor: 'bg-yellow-500/10'
              }
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm md:text-base">{feature.description}</CardDescription>
                </CardHeader>
                {feature.link && (
                  <CardContent>
                    <Button asChild variant="ghost" className="p-0 h-auto">
                      <Link to={feature.link} className="flex items-center text-primary hover:underline py-2">
                        {feature.linkText} <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Servicios Veterinarios</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Cuidado integral para todas las necesidades de tus mascotas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Veterinaria</h3>
              <div className="space-y-4">
                {[
                  'Consulta Médica General',
                  'Vacunación Completa',
                  'Desparasitación',
                  'Esterilización',
                  'Análisis de Sangre'
                ].map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm md:text-base text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Estética</h3>
              <div className="space-y-4">
                {[
                  'Baño Básico',
                  'Corte de Pelo',
                  'Limpieza de Oídos',
                  'Cepillado de Dientes',
                  'Tratamiento Antpulgas'
                ].map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm md:text-base text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="text-base px-8 py-3">
              <Link to="/servicios">
                Ver Todos los Servicios
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-15 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            ¿Listo para simplificar el cuidado de tus mascotas?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/80">
            Únete a miles de dueños de mascotas que ya confían en VetSync para el cuidado de sus compañeros
          </p>
        </div>
      </section>
    </div>
  )
}
