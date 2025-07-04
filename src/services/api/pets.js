import api from './client'
import Cookies from 'js-cookie'

export const getPets = async () => {
  try {
    const userDataCookie = Cookies.get('userData')
    const userData = userDataCookie ? JSON.parse(userDataCookie) : null
    const clienteId = userData?.id
    const response = await api.get('/pets/detail', { params: { clienteId }, auth: true })

    if (response.data && response.data.error === 'Pets not found') {
      return []
    }

    return response.data
  } catch (error) {
    if (error.response?.data?.error === 'Pets not found') {
      return []
    }
    console.error(error)
    throw error
  }
}
