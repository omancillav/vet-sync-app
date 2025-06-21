import { useState, useCallback, useEffect } from 'react'
import { getServices } from '@/services/api/services.js'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchServices = useCallback(async () => {
    try {
      console.log('Fetching services...')
      setLoading(true)
      const response = await getServices()
      setServices(response.data)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return {
    services,
    loading,
    error
  }
}
