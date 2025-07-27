import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoAppointments } from '@/components/appointments/NoAppointments'

export function Appointments() {
  const [appointments, setAppointments] = useState([])
  const { isAuthenticated } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Citas</h1>
          <p className="text-muted-foreground">Administra todas tus citas veterinarias</p>
        </div>

        {isAuthenticated ? (
          <div className="grid gap-6">
            {/* Próximas citas */}

            {appointments.length === 0 ? (
              <NoAppointments
                onNewAppointment={() => {
                  /* TODO new appointment */
                }}
              />
            ) : (
              // TODO: render appointments list here once data is fetched
              <div>{/* Aquí irá la lista de citas */}</div>
            )}
          </div>
        ) : (
          <AuthPrompt icon="📅" message="Debes iniciar sesión para agendar y ver tus citas" />
        )}
      </div>
    </div>
  )
}
