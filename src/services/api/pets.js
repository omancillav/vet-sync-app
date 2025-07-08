import api from './client'
import Cookies from 'js-cookie'

export const getPets = async () => {
  const userDataCookie = Cookies.get('userData')
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null
  const clienteId = userData?.id

  try {
    const { data } = await api.get('/pets/detail', { params: { clienteId }, requiresAuth: true })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const addPet = async (petData) => {
  const userDataCookie = Cookies.get('userData')
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null
  const clienteId = userData?.id

  const requestBody = {
    nombre: petData.nombre,
    cliente_id: clienteId,
    especie_id: petData.especie_id,
    raza_id: petData.raza_id,
    edad: petData.edad,
    sexo: petData.sexo
  }

  try {
    const { data } = await api.post('/pets', requestBody, { requiresAuth: true })
    return data
  } catch (error) {
    console.error('Error adding pet:', error)
    throw error
  }
}

export const deletePet = async (petId) => {
  try {
    const { data } = await api.delete(`/pets/${petId}`, { requiresAuth: true })
    return data
  } catch (error) {
    console.error('Error deleting pet:', error)
    throw error
  }
}
