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

  // Estado para el formulario de nueva cita
  const [formState, setFormState] = useState({
    isOpen: false
  })

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

  const cancelAppointment = async (id) => {
    try {
      const { data } = await cancelAppointmentApi(id)
      toast.success('Cita cancelada exitosamente')
      return data
    } catch (error) {
      console.error('Error canceling appointment:', error)
      setError(error)
      toast.error('Error cancelando la cita')
      throw error
    } finally {
      await fetchAppointments()
    }
  }

  // Funciones para manejar el formulario
  const openForm = useCallback(() => {
    setFormState({
      isOpen: true
    })
  }, [])

  const closeForm = useCallback(() => {
    setFormState({
      isOpen: false
    })
  }, [])

  const value = {
    appointments,
    noAppointments,
    loading,
    error,
    initialized,
    fetchAppointments,
    cancelAppointment,
    initializeAppointments,

    // Estado del formulario
    formState,
    openForm,
    closeForm
  }

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>
}

export { AppointmentsContext }
