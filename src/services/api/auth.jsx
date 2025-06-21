import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE_URL

export const login = async ({ input }) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, input)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const register = async ({ input }) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, input)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
