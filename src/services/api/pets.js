import api from './client'
import Cookies from 'js-cookie'

export const getPets = async () => {
  try {
    const userDataCookie = Cookies.get('userData')
    const userData = userDataCookie ? JSON.parse(userDataCookie) : null
    const clienteId = userData?.id

    const { data } = await api.get('/pets/detail', { params: { clienteId }, requiresAuth: true })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
