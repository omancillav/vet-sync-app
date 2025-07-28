import api from './client'

export const getServices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  try {
    const response = await api.get('/services/active/true')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
