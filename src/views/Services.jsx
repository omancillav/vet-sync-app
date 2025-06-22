import { useServices } from '@/hooks/useServices.js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppointmentCard } from '@/components/Appointments/AppointmentCard.jsx'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorCard } from '@/components/ErrorCard'

export function Services() {
  const { services, loading, error } = useServices()

  const filterServicesByCategory = (category) =>
    services.filter((service) =>
      category === 'Veterinaria' ? service.categoria_id === 1 : service.categoria_id === 2
    )

  if (loading) return <LoadingSpinner message="Cargando servicios..." className="min-h-[60vh]" />
  if (error)
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ErrorCard
          title="Error al cargar los servicios"
          message={
            error.message ||
            'Ocurrió un error al intentar cargar los servicios. Por favor, inténtalo de nuevo más tarde.'
          }
          className="my-8"
        />
      </div>
    )

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nuestros Servicios</h1>
          <p className="text-muted-foreground">Servicios veterinarios completos para el cuidado de tu mascota</p>
        </div>

        <Tabs defaultValue="Veterinaria" className="w-full mx-auto items-center gap-10">
          <div className="w-full mx-auto flex justify-center">
            <TabsList className="w-full max-w-2xl h-10">
              <TabsTrigger value="Veterinaria" className="hover:cursor-pointer">Veterinaria</TabsTrigger>
              <TabsTrigger value="Estética" className="hover:cursor-pointer">Estética</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="Veterinaria" className="w-full">
            {filterServicesByCategory('Veterinaria').length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {filterServicesByCategory('Veterinaria').map((service, index) => (
                  <AppointmentCard key={index} service={service} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hay servicios de veterinaria disponibles en este momento.
              </p>
            )}
          </TabsContent>

          <TabsContent value="Estética" className="w-full">
            {filterServicesByCategory('Estética').length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {filterServicesByCategory('Estética').map((service, index) => (
                  <AppointmentCard key={index} service={service} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hay servicios de estética disponibles en este momento.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
