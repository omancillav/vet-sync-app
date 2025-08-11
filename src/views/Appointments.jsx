import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoAppointments } from '@/components/appointments/NoAppointments'
import { useAppointments } from '@/hooks/useAppointments'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner.jsx'
import { ErrorCard } from '@/components/ErrorCard'
import { Button } from '@/components/ui/button'
import { CalendarPlus } from 'lucide-react'
import { toast } from 'sonner'
import { columns } from '@/components/appointments/table/columns'
import { DataTable } from '@/components/appointments/table/data-table'
import { sortAppointmentsByDate } from '@/lib/utils.js'

export function Appointments() {
  const { appointments, noAppointments, loading, error, initializeAppointments } = useAppointments()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && !loading) {
      initializeAppointments()
    }
  }, [isAuthenticated, loading, initializeAppointments])

  const renderContent = () => {
    if (!isAuthenticated) {
      return <AuthPrompt icon="📅" message="Debes iniciar sesión para agendar y ver tus citas" />
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      )
    }

    if (error) {
      return <ErrorCard message="No se pudieron cargar tus citas. Inténtalo de nuevo." />
    }

    if (noAppointments) return <NoAppointments />

    const sortedAppointments = sortAppointmentsByDate(appointments)

    return (
      <>
        <DataTable columns={columns} data={sortedAppointments} />
      </>
    )
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end mb-4 md:mb-8">
          <section className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mis Citas</h1>
            <p className="text-muted-foreground">Administra tus citas veterinarias de forma sencilla.</p>
          </section>
          <section className="w-full md:w-1/2 md:flex md:justify-end">
            {isAuthenticated && (
              <Button
                onClick={() => toast.warning('Funcionalidad de agendar cita en desarrollo')}
                className="w-full md:w-auto"
              >
                Agendar Cita
                <CalendarPlus className="h-4 w-4" />
              </Button>
            )}
          </section>
        </div>
        {renderContent()}
      </div>
    </div>
  )
}
