import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { AuthContext } from './auth'

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get('accessToken')
      const userData = Cookies.get('userData')

      if (token && userData) {
        try {
          setIsAuthenticated(true)
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error('Failed to parse user data from cookies:', error)
          // Limpiar cookies si los datos están corruptos
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          Cookies.remove('userData')
          setIsAuthenticated(false)
          setUser(null)
        }
      } else {
        // Intentar renovar usando refreshToken
        const refreshToken = Cookies.get('refreshToken')
        if (refreshToken) {
          try {
            const API_BASE = import.meta.env.VITE_API_BASE_URL
            const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken })
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data

            // Guardar nuevas cookies
            const accessExpires = new Date(Date.now() + 15 * 60 * 1000)
            Cookies.set('accessToken', newAccessToken, {
              expires: accessExpires,
              secure: true,
              sameSite: 'strict'
            })
            const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            Cookies.set('refreshToken', newRefreshToken, {
              expires: refreshExpires,
              secure: true,
              sameSite: 'strict'
            })

            // Derivar userData decodificando el JWT (payload base64)
            const payload = JSON.parse(atob(newAccessToken.split('.')[1]))
            Cookies.set('userData', JSON.stringify(payload), {
              expires: accessExpires,
              secure: true,
              sameSite: 'strict'
            })

            setIsAuthenticated(true)
            setUser(payload)
          } catch (err) {
            console.error('Refresh token failed on mount:', err)
            // refresh inválido → limpiar todo
            Cookies.remove('refreshToken')
            setIsAuthenticated(false)
            setUser(null)
          }
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      }
      setLoading(false)
    }

    checkLogin()
  }, [])

  const login = (data) => {
    const { accessToken, refreshToken, userData } = data
    // expiresIn puede ser '15m'. Necesitamos convertirlo a un valor para la cookie
    // Por ejemplo, 15 minutos a partir de ahora.
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000)

    Cookies.set('accessToken', accessToken, { expires, secure: true, sameSite: 'strict' })
    Cookies.set('refreshToken', refreshToken, { expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), secure: true, sameSite: 'strict' }) // Refresh token por 7 días
    Cookies.set('userData', JSON.stringify(userData), { expires, secure: true, sameSite: 'strict' })

    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('userData')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
