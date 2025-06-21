import axios from 'axios'
import Cookies from 'js-cookie'
const API_BASE = import.meta.env.VITE_API_BASE_URL

export const getServices = async () => {
  try {
    const token = Cookies.get('accessToken')
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await axios.get(`${API_BASE}/services/active/true`, config)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
