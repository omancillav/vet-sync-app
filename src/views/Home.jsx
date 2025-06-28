import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Stethoscope,
  Users,
  Clock,
  Shield,
  Star,
  ArrowRight,
  PawPrint,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-0.5">
      {/* Hero Section */}
      <section className="w-full py-18 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-4 text-sm">
                <PawPrint className="w-4 h-4 mr-1" />
                Plataforma Veterinaria Digital
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                El cuidado de tus mascotas,
                <span className="text-primary block">simplificado</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                VetSync conecta a dueños de mascotas con servicios veterinarios de calidad. Gestiona citas, historial
                médico y servicios en una sola plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="text-base md:text-lg px-8 py-3">
                  <Link to="/register">
                    Crear Cuenta
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="text-base md:text-lg px-8 py-3">
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-[3/2]">
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/20 rounded-3xl transform -rotate-3 transition-transform duration-500 group-hover:rotate-0"></div>
                <img
                  src="https://loxqcjbiwieeukymlbdp.supabase.co/storage/v1/object/sign/imagenes/hero.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81Y2Q3YTZkZS05OTMwLTQxODItODY2Ny02YjAzZDZkYmZiMWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZW5lcy9oZXJvLmpwZWciLCJpYXQiOjE3NTEwOTkwNTMsImV4cCI6MjA2NjQ1OTA1M30.jKJ39qk5tkrIep3bR1Zs0REvRfHQKvtiHToSkNc3rXQ"
                  alt="Veterinaria cuidando a un perro"
                  className="relative w-full h-full rounded-3xl shadow-lg object-cover"
                />
              </div>
            </div>
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
            <Card className="relative group transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Veterinaria</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
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
              </CardContent>
              <Stethoscope className="absolute top-6 right-6 w-10 h-10 text-primary/20 group-hover:text-primary/50 transition-colors duration-300" />
            </Card>

            <Card className="relative group transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Estética</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
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
              </CardContent>
              <Sparkles className="absolute top-6 right-6 w-10 h-10 text-primary/20 group-hover:text-primary/50 transition-colors duration-300" />
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="text-base md:text-lg px-8 py-3">
              <Link to="/servicios">
                Ver Todos los Servicios
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 md:py-8 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-primary-foreground mb-4">
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
