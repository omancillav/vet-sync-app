import api from './client'
import Cookies from 'js-cookie'

export const getPets = async () => {
  try {
    const userDataCookie = Cookies.get('userData')
    const userData = userDataCookie ? JSON.parse(userDataCookie) : null
    const clienteId = userData?.id
    const { data } = await api.get('/pets/detail', { params: { clienteId }, requiresAuth: true })

    if (data && data.error === 'Pets not found') {
      return []
    }
    return data
  } catch (error) {
    if (error.response?.data?.error === 'Pets not found') {
      return []
    }
    console.error(error)
    throw error
  }
}
