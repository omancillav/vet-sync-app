import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ServicesCard({ service }) {
  return (
    <Card key={service.id} className="h-full flex flex-col">
      <CardHeader className="flex-1">
        <CardTitle className="text-md md:text-lg font-semibold">{service.nombre}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm md:text-base">{service.descripcion}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <section className="flex justify-between mb-4 bg-accent px-5 py-3 rounded-md text-center">
          <div className="flex flex-col justify-center">
            <p className="text-sm">Duración</p>
            <p className="font-semibold">{service.duracion_estimada} min</p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm">Precio</p>
            <p className="font-semibold">${service.precio}</p>
          </div>
        </section>
        <Button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors text-sm hover:cursor-pointer">
          Agendar Cita
        </Button>
      </CardContent>
    </Card>
  )
}
