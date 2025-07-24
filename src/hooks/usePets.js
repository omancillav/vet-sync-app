import { useState, useCallback, useEffect } from 'react'
import { getPets, addPet as addPetApi, uploadPetImage, deletePet as deletePetApi, updatePet as updatePetApi } from '@/services/api/pets'
import { useAuth } from '@/contexts/auth'
import { toast } from 'sonner'

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

  const addPet = useCallback(async (petData, imageFile = null) => {
    try {
      setLoading(true)

      const response = await addPetApi(petData)

      if (imageFile && response.data?.data?.[0]?.id) {
        try {
          const petId = response.data.data[0].id
          await uploadPetImage(petId, imageFile)
          toast.success(`${petData.nombre} ha sido registrado(a) exitosamente.`)
        } catch (imageError) {
          console.error('Error uploading image:', imageError)
          // La mascota se creó pero falló la imagen
          toast.warning(`${petData.nombre} fue registrado(a) pero no se pudo subir la imagen.`)
        }
      } else {
        toast.success(`${petData.nombre} ha sido registrado(a) exitosamente.`)
      }

      // 3. Actualizar la lista de mascotas
      const updatedPets = await fetchPets()
      setPets(updatedPets)
      setNoPets(false)

      return response
    } catch (error) {
      console.error('Error adding pet:', error)
      setError(error)

      toast.error('No se pudo registrar la mascota. Por favor, inténtalo de nuevo.')

      throw error
    } finally {
      setLoading(false)
    }
  }, [fetchPets])

  const deletePet = useCallback(async (petId) => {
    try {
      setLoading(true)
      const petToDelete = pets.find(pet => pet.id === petId)

      await deletePetApi(petId)
      setPets(prevPets => {
        const updatedPets = prevPets.filter(pet => pet.id !== petId)
        setNoPets(updatedPets.length === 0)
        return updatedPets
      })

      if (petToDelete) {
        toast.success('Mascota eliminada correctamente', {
        })
      }
    } catch (error) {
      console.error('Error deleting pet:', error)
      setError(error)
      toast.error('No se pudo eliminar la mascota. Por favor, inténtalo de nuevo.')

      throw error
    } finally {
      setLoading(false)
    }
  }, [pets])

  const updatePet = useCallback(async (petId, petData, imageFile = null) => {
    try {
      setLoading(true)
      // First update the basic pet data
      const response = await updatePetApi(petId, petData)

      // If there's a new image, upload it
      if (imageFile) {
        try {
          await uploadPetImage(petId, imageFile)
          // After successful image upload, update the local state with the new image
          setPets(prevPets =>
            prevPets.map(pet =>
              pet.id === petId
                ? { ...pet, ...petData, imagen_url: URL.createObjectURL(imageFile) }
                : pet
            )
          )
        } catch (imageError) {
          console.error('Error updating image:', imageError)
          // Even if image upload fails, we still update the pet data
          setPets(prevPets =>
            prevPets.map(pet =>
              pet.id === petId ? { ...pet, ...petData } : pet
            )
          )
          toast.warning('La mascota se actualizó pero no se pudo actualizar la imagen.')
        }
      } else {
        // If no new image, just update the pet data
        setPets(prevPets =>
          prevPets.map(pet =>
            pet.id === petId ? { ...pet, ...petData } : pet
          )
        )
      }

      toast.success('Mascota actualizada correctamente')
      return response
    } catch (error) {
      console.error('Error updating pet:', error)
      toast.error('No se pudo actualizar la mascota. Por favor, inténtalo de nuevo.')
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
    updatePet,
    deletePet
  }
}
