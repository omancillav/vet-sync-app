import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema.js'
import { ModeToggle } from '@/components/header/mode-toggle.jsx'
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { login as loginRequest } from '@/services/api/auth.js'
import { useAuth } from '@/hooks/useAuth'

const getErrorMessage = (error) => {
  if (!error.response) {
    return 'Error de conexión. Por favor, verifica tu conexión a internet.'
  }

  const status = error.response.status
  const apiMessage = error.response.data?.message

  const errorMap = {
    404: {
      'Email not found': 'No existe una cuenta asociada a este correo electrónico.'
    },
    401: {
      'Invalid password': 'La contraseña ingresada es incorrecta.',
      'User is not active': 'Tu cuenta está inactiva. Contacta al administrador para reactivarla.'
    },
    500: {
      'Internal server error': 'Error interno del servidor. Por favor, inténtalo más tarde.'
    }
  }

  const statusErrors = errorMap[status]
  if (statusErrors && statusErrors[apiMessage]) {
    return statusErrors[apiMessage]
  }

  switch (status) {
  case 404:
    return 'No se encontró una cuenta con ese correo electrónico.'
  case 401:
    return 'Credenciales inválidas. Verifica tu correo y contraseña.'
  case 500:
    return 'Error interno del servidor. Por favor, inténtalo más tarde.'
  case 429:
    return 'Demasiados intentos de inicio de sesión. Espera unos minutos.'
  default:
    return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
  }
}

const getErrorType = (error) => {
  if (!error.response) return 'connection'

  const status = error.response.status
  const apiMessage = error.response.data?.message

  if (status === 404 && apiMessage === 'Email not found') return 'email'
  if (status === 401 && apiMessage === 'Invalid password') return 'password'
  if (status === 401 && apiMessage === 'User is not active') return 'account'

  return 'general'
}

export function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/')
    }
  }, [loading, isAuthenticated, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      clearErrors('root.serverError')

      const responseData = await loginRequest({ input: data })
      login(responseData)
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)

      const errorMessage = getErrorMessage(err)
      const errorType = getErrorType(err)

      setError('root.serverError', {
        type: 'manual',
        message: errorMessage,
        errorType
      })
    }
  }

  const handleInputChange = (fieldName) => {
    return (e) => {
      if (errors.root?.serverError) {
        clearErrors('root.serverError')
      }
      return register(fieldName).onChange(e)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-[1400px] flex-col items-center justify-start gap-4 p-4 pt-20 md:justify-center md:pt-4">
      <Link to="/" className="absolute left-4 top-4">
        <Button className="hover:cursor-pointer" variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </Link>

      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <Card className="mx-auto w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center">
          <img src={VetsyncLogo} className="w-14 md:w-20" alt="Vetsync Logo" />
        </Link>

        <CardHeader>
          <CardTitle className="text-center uppercase font-bold">Bienvenido de vuelta</CardTitle>
          <CardDescription className="text-center">Inicia sesión en tu cuenta de Vetsync</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  {...register('email')}
                  onChange={handleInputChange('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  {/* <Link to="/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link> */}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`pr-10 font-mono ${errors.password ? 'border-red-500' : ''}`}
                    {...register('password')}
                    onChange={handleInputChange('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500 hover:cursor-pointer" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 hover:cursor-pointer" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {/* Error del servidor */}
              {errors.root?.serverError && (
                <p className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-950/10 p-3 rounded-md border border-red-200 dark:border-red-800">
                  {errors.root.serverError.message}
                </p>
              )}
            </div>

            <CardFooter className="mt-4 flex-col gap-2 p-0">
              <Button type="submit" className="w-full hover:cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </CardFooter>
          </form>

          <Link to="/register" className="text-center text-sm">
            ¿No tienes una cuenta? <span className="underline">Regístrate</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
