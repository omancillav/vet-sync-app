import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function NoAppointments({ onNewAppointment }) {
  return (
    <Card className="text-center items-center p-8 gap-6">
      <div className="text-5xl" role="img" aria-label="calendar">
        📅
      </div>
      <CardContent className="flex flex-col items-center gap-4 p-0">
        <h3 className="text-xl font-semibold">No tienes citas programadas</h3>
        <p className="text-muted-foreground mb-2">Programa tu primera cita veterinaria</p>
        <Button onClick={onNewAppointment}>Nueva Cita</Button>
      </CardContent>
    </Card>
  )
}
