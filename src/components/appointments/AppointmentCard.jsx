import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Stethoscope, UserRound, CalendarX, NotebookPen } from 'lucide-react'
import { PetImage } from '@/components/pets/card/PetImage'
import { formatDate } from '@/lib/utils.js'

export function AppointmentCard({ appointment }) {
  return (
    <Card className="">
      <CardHeader className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <div className="w-18 p-0">
            <PetImage src={appointment.img_url} alt={appointment.nombre_mascota} className="rounded-full" />
          </div>
          <div className="flex flex-col justify-center">
            <CardTitle className="text-xl font-bold">{appointment.nombre_mascota}</CardTitle>
            <CardDescription className="text-md">{appointment.nombre_cliente}</CardDescription>
          </div>
        </div>
        <div>
          <Badge variant="outline" className="text-sm text-primary border-primary bg-transparent px-3 py-1">
            {appointment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Fecha</span>
              <span>{formatDate(appointment.fecha)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Hora</span>
              <span>
                {appointment.hora_inicio.slice(0, -3)} - {appointment.hora_fin.slice(0, -3)}
              </span>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-5 h-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Servicio</span>
              {appointment.nombre_servicio}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserRound className="w-5 h-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Profesional</span>
              {appointment.nombre_profesional}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button variant="outline">
          <CalendarX className="h-4 w-4" />
          Cancelar
        </Button>
        <Button variant="default">
          Modificar
          <NotebookPen className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
