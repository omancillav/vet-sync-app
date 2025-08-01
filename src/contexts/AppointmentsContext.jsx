import { createContext, useCallback, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getAppointments as getAppointmentsApi } from '@/services/api/appointments'

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

  const value = {
    appointments,
    noAppointments,
    loading,
    error,
    initialized,
    fetchAppointments,
    initializeAppointments
  }

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>
}

export { AppointmentsContext }
