import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE = import.meta.env.VITE_API_BASE_URL

// Crea una instancia de Axios para centralizar configuración e interceptores
const api = axios.create({
  baseURL: API_BASE
})

let isRefreshing = false
let refreshQueue = []

const processQueue = (error, newToken = null) => {
  refreshQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(newToken)
  })
  refreshQueue = []
}

// === Request interceptor: añade accessToken si existe ===
api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// === Response interceptor: maneja expiración y refresh ===
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Detectar token expirado una sola vez por request
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      // Evitar múltiples refresh simultáneos
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true
      const refreshToken = Cookies.get('refreshToken')
      if (!refreshToken) {
        isRefreshing = false
        return Promise.reject(error)
      }

      try {
        // Usa axios base para evitar ciclo de interceptores
        const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken })
        const { accessToken, refreshToken: newRefreshToken } = data

        // Actualizar cookies
        const accessExpires = new Date(Date.now() + 15 * 60 * 1000) // 15 min
        Cookies.set('accessToken', accessToken, { expires: accessExpires, secure: true, sameSite: 'strict' })
        const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        Cookies.set('refreshToken', newRefreshToken, { expires: refreshExpires, secure: true, sameSite: 'strict' })

        processQueue(null, accessToken)
        isRefreshing = false

        // Reintentar petición original con nuevo token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        isRefreshing = false
        // Limpia cookies y propaga error
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userData')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
