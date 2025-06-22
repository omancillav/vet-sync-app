import { useServices } from '@/hooks/useServices.js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppointmentCard } from '@/components/Appointments/AppointmentCard.jsx'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorCard } from '@/components/ErrorCard'
import { filterServicesByCategory } from '@/lib/utils'

export function Services() {
  const { services, loading, error } = useServices()

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
        <Tabs defaultValue="Veterinaria" className="w-full gap-3 md:gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-2 md:mb-2.5 lg:mb-5">
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold text-foreground mb-2">Nuestros Servicios</h1>
              <p className="text-muted-foreground">Servicios veterinarios completos para el cuidado de tu mascota</p>
            </div>

            <div className="lg:w-1/2">
              <TabsList className="w-full">
                <TabsTrigger value="Veterinaria" className="hover:cursor-pointer w-1/2">
                  Veterinaria
                </TabsTrigger>
                <TabsTrigger value="Estética" className="hover:cursor-pointer w-1/2">
                  Estética
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="Veterinaria" className="w-full">
            {filterServicesByCategory(services, 'Veterinaria').length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {filterServicesByCategory(services, 'Veterinaria').map((service, index) => (
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
            {filterServicesByCategory(services, 'Estética').length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {filterServicesByCategory(services, 'Estética').map((service, index) => (
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
