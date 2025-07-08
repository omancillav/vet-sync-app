import { useState, useCallback, useEffect } from 'react'
import { getPets, addPet as addPetApi, deletePet as deletePetApi } from '@/services/api/pets'
import { useAuth } from '@/contexts/auth'

export function usePets() {
  const { isAuthenticated } = useAuth()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [noPets, setNoPets] = useState(false)

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getPets()
      setPets(data)
      setNoPets(data.length === 0)
      return data
    } catch (error) {
      console.error('Error fetching pets:', error)
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const addPet = useCallback(async (petData) => {
    try {
      setLoading(true)
      const { data: newPet } = await addPetApi(petData)
      const updatedPets = await fetchPets()
      setPets(updatedPets)
      setNoPets(false)
      return newPet
    } catch (error) {
      console.error('Error adding pet:', error)
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [fetchPets])

  const deletePet = useCallback(async (petId) => {
    try {
      setLoading(true)
      await deletePetApi(petId)
      setPets(prevPets => {
        const updatedPets = prevPets.filter(pet => pet.id !== petId)
        setNoPets(updatedPets.length === 0)
        return updatedPets
      })
    } catch (error) {
      console.error('Error deleting pet:', error)
      setError(error)
      throw error
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
    error,
    noPets,
    fetchPets,
    addPet,
    deletePet
  }
}
