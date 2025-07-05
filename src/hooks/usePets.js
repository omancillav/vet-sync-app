import { useState, useCallback, useEffect } from 'react'
import { getPets } from '@/services/api/pets'
import { useAuth } from '@/contexts/auth'

export function usePets() {
  const { isAuthenticated } = useAuth()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getPets()
      setPets(data)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchPets()
    }
  }, [fetchPets, isAuthenticated])

  return {
    pets,
    loading,
    error
  }
}
