import api from './client'
import Cookies from 'js-cookie'

export const getAppointments = async () => {
  const userDataCookie = Cookies.get('userData')
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null
  const clienteId = userData?.id

  try {
    const config = {
      params: { clienteId },
      requiresAuth: true
    }
    const { data } = await api.get('/appointments/detailed', config)
    return data
  } catch (error) {
    console.error('Error getting appointments:', error)
    throw error
  }
}
