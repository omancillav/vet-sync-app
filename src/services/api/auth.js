import api from './client'

export const login = async ({ input }) => {
  try {
    const response = await api.post('/auth/login', input)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const register = async ({ input }) => {
  try {
    const response = await api.post('/auth/register', input)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
