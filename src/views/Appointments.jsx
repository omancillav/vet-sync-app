import { useAuth } from '@/contexts/auth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoAppointments } from '@/components/appointments/NoAppointments'

export function Appointments() {
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
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Citas Próximas</h3>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm">
                  Nueva Cita
                </button>
              </div>

              <NoAppointments onNewAppointment={() => {/* TODO new appointment */}} />
            </div>

            {/* Historial */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Historial de Citas</h3>
            </div>
          </div>
        ) : (
          <AuthPrompt
            icon="📅"
            message="Debes iniciar sesión para ver tus citas"
          />
        )}
      </div>
    </div>
  )
}
