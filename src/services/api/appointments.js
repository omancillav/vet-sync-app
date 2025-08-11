import api from './client'
import Cookies from 'js-cookie'

const userDataCookie = Cookies.get('userData')
const userData = userDataCookie ? JSON.parse(userDataCookie) : null
const clienteId = userData?.id

export const getAppointments = async () => {
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

export const cancelAppointment = async (id) => {
  try {
    const config = {
      requiresAuth: true
    }

    const body = {
      status: 'Cancelada'
    }
    const { data } = await api.patch(`/appointments/${id}`, body, config)
    return data
  } catch (error) {
    console.error('Error cancelling appointment:', error)
    throw error
  }
}
