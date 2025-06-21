import { useServices } from '@/hooks/useServices.js'

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{service.nombre}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{service.descripcion}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Precio:</span>
                  <span className="font-medium">${service.precio}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duración:</span>
                  <span className="font-medium">{service.duracion_estimada} minutos</span>
                </div>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors text-sm hover:cursor-pointer">
                Agendar Cita
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
