import { useServices } from '@/hooks/useServices.js'
import { AppointmentCard } from '@/components/Appointments/AppointmentCard.jsx'

export function Services() {
  const { services, loading, error } = useServices()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

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
