import axios from 'axios'
import Cookies from 'js-cookie'
const API_BASE = import.meta.env.VITE_API_BASE_URL

const accessToken = Cookies.get('accessToken')
const userDataCookie = Cookies.get('userData')
const userData = JSON.parse(userDataCookie)
const clienteId = userData.id

export const getPets = async () => {
  try {
    const response = await axios.get(`${API_BASE}/pets/detail`, {
      params: { clienteId },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

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
