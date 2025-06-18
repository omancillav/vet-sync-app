import axios from 'axios'
import { API_BASE } from '../../../config.js'

export const login = async ({ input }) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, input)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
