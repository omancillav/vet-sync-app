import { createContext, useCallback, useState, useEffect } from 'react'
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

  const [formState, setFormState] = useState({
    isOpen: false
  })

  useEffect(() => {
    if (!isAuthenticated) {
      setAppointments([])
      setNoAppointments(false)
      setError(null)
      setInitialized(false)
      setFormState({ isOpen: false })
    }
  }, [isAuthenticated])

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
    console.log('AppointmentsContext: initializeAppointments called', {
      initialized,
      loading,
      isAuthenticated,
      appointmentsLength: appointments.length
    })
    if (!initialized && !loading && isAuthenticated) {
      console.log('AppointmentsContext: Fetching appointments...')
      fetchAppointments()
    }
  }, [initialized, loading, isAuthenticated, fetchAppointments, appointments.length])

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
