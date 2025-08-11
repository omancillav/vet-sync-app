import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Stethoscope, UserRound, CalendarX, NotebookPen } from 'lucide-react'
import { PetImage } from '@/components/pets/card/PetImage'
import { formatDate } from '@/lib/utils.js'
import { useAppointments } from '@/hooks/useAppointments'
import { CancelDialog } from './CancelDialog'

const statusColors = {
  Programada: 'text-blue-500 border-blue-500 dark:text-blue-400 dark:border-blue-400',
  Completada: 'text-green-600 border-green-600',
  Cancelada: 'text-red-600 border-red-600',
  Reprogramada: 'text-yellow-400 border-yellow-400',
  'No asistió': 'text-red-600 border-red-600',
  'En Curso': 'text-primary border-primary'
}

export function AppointmentCard({ appointment, isPast = false }) {
  const { cancelAppointment } = useAppointments()
  const badgeColor = statusColors[appointment.status] || 'text-muted-foreground border-muted-foreground'

  return (
    <Card className="" role="article" aria-labelledby={`appointment-${appointment.nombre_mascota}`}>
      <CardHeader className="flex items-center justify-between ">
        <header className="flex items-center gap-3">
          <figure className="w-20 p-0">
            <PetImage src={appointment.img_url} alt={appointment.nombre_mascota} className="rounded-full" />
          </figure>
          <hgroup className="flex flex-col justify-center">
            <CardTitle id={`appointment-${appointment.nombre_mascota}`} className="text-xl font-bold">
              {appointment.nombre_mascota}
            </CardTitle>
            <CardDescription className="text-md">{appointment.nombre_cliente}</CardDescription>
          </hgroup>
        </header>
        <aside>
          <Badge variant="outline" className={`text-sm px-3 py-1 ${badgeColor}`}>
            {appointment.status}
          </Badge>
        </aside>
      </CardHeader>
      <Separator />
      <CardContent>
        <section className="grid grid-cols-2" aria-label="Información de fecha y hora">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Fecha</span>
              <time dateTime={appointment.fecha}>{formatDate(appointment.fecha)}</time>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Hora</span>
              <time>
                {appointment.hora_inicio.slice(0, -3)} - {appointment.hora_fin.slice(0, -3)}
              </time>
            </div>
          </div>
        </section>
        <Separator className="my-4" />
        <section className="grid grid-cols-2 gap-4" aria-label="Información del servicio">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-5 h-5 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Servicio</span>
              {appointment.nombre_servicio}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserRound className="w-5 h-5 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Profesional</span>
              {appointment.nombre_profesional}
            </div>
          </div>
        </section>
      </CardContent>
      {!isPast && (
        <CardFooter className="grid grid-cols-2 gap-4">
          <CancelDialog onConfirm={() => cancelAppointment(appointment.id)}>
            <Button variant="outline" aria-label="Cancelar cita">
              <CalendarX className="h-4 w-4" aria-hidden="true" />
              Cancelar
            </Button>
          </CancelDialog>
          <Button variant="default" aria-label="Modificar cita">
            Modificar
            <NotebookPen className="h-4 w-4" aria-hidden="true" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
