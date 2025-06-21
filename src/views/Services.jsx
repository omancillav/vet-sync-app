import { useServices } from '@/hooks/useServices.js'
import { AppointmentCard } from '@/components/Appointments/AppointmentCard.jsx'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorCard } from '@/components/ErrorCard'

export function Services() {
  const { services, loading, error } = useServices()

  if (loading) return <LoadingSpinner message="Cargando servicios..." className="min-h-[60vh]" />
  if (error) return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ErrorCard
        title="Error al cargar los servicios"
        message={error.message || 'Ocurrió un error al intentar cargar los servicios. Por favor, inténtalo de nuevo más tarde.'}
        className="my-8"
      />
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nuestros Servicios</h1>
          <p className="text-muted-foreground">Servicios veterinarios completos para el cuidado de tu mascota</p>
        </div>

        {services.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AppointmentCard key={index} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
