import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AppointmentCard({ service }) {
  return (
    <Card key={service.id}>
      <CardHeader>
        <CardTitle>{service.nombre}</CardTitle>
        <CardDescription>{service.descripcion}</CardDescription>
      </CardHeader>
      <CardContent>
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
        <Button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors text-sm hover:cursor-pointer">
          Agendar Cita
        </Button>
      </CardContent>
    </Card>
  )
}
