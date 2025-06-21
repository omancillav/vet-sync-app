import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE_URL

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_BASE}/services/active/true`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
