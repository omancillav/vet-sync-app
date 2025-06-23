import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ServicesCard({ service }) {
  return (
    <Card key={service.id} className={`h-full flex flex-col overflow-hidden ${service.img_url ? 'pt-0' : ''}`}>
      {service.img_url && (
        <div className="w-full aspect-video overflow-hidden -mt-6">
          <img
            src={service.img_url}
            alt={service.nombre}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-md md:text-lg font-semibold">{service.nombre}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm md:text-base">{service.descripcion}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <section className="flex justify-between mb-4 bg-accent px-8 py-3 rounded-md text-center">
            <div className="flex flex-col justify-center">
              <p className="text-sm">Duración</p>
              <p className="font-semibold text-md">{service.duracion_estimada} min</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">Precio</p>
              <p className="font-semibold text-md">${service.precio}</p>
            </div>
          </section>
          <Button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors text-sm hover:cursor-pointer">
            Agendar Cita
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}
