import { createContext, useCallback, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getAppointments as getAppointmentsApi } from '@/services/api/appointments'
import { cancelAppointment as cancelAppointmentApi } from '@/services/api/appointments'
import { toast } from 'sonner'

const AppointmentsContext = createContext()

export function AppointmentsProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [noAppointments, setNoAppointments] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialized, setInitialized] = useState(false)

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getAppointmentsApi()
      setAppointments(data)
      setNoAppointments(data.length === 0)
      setInitialized(true)
      return data
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const initializeAppointments = useCallback(() => {
    if (!initialized && !loading && isAuthenticated) {
      fetchAppointments()
    }
  }, [initialized, loading, isAuthenticated, fetchAppointments])

  const cancelAppointment = (async (id) => {
    try {
      const { data } = await cancelAppointmentApi(id)
      return data
    } catch (error) {
      console.error('Error canceling appointment:', error)
      setError(error) |
      toast.error('Error cancelando la cita')
      throw error
    } finally {
      await fetchAppointments()
      toast.success('Cita cancelada exitosamente')
    }
  })

  const value = {
    appointments,
    noAppointments,
    loading,
    error,
    initialized,
    fetchAppointments,
    cancelAppointment,
    initializeAppointments
  }

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>
}

export { AppointmentsContext }
