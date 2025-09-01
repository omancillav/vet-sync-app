import { Link, useNavigate } from 'react-router-dom'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModeToggle } from '@/components/header/mode-toggle.jsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/schemas/registerSchema.js'
import { register as registerRequest } from '@/services/api/auth.js'
import { useAuth } from '@/hooks/useAuth'

const getErrorMessage = (error) => {
  if (!error.response) {
    return 'Error de conexión. Por favor, verifica tu conexión a internet.'
  }

  const status = error.response.status
  const apiMessage = error.response.data?.message
  const apiError = error.response.data?.error

  if (status === 422 && apiError) {
    const validationErrors = Object.values(apiError).flat()
    return validationErrors.join('. ')
  }

  const errorMap = {
    409: {
      'Email already registered':
        'Ya existe una cuenta registrada con este correo electrónico. ¿Quieres iniciar sesión?'
    },
    422: {
      default: 'Los datos ingresados no son válidos. Por favor, revisa la información.'
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
  case 409:
    return 'Ya existe una cuenta con este correo electrónico.'
  case 422:
    return 'Los datos ingresados no son válidos. Por favor, revisa la información.'
  case 500:
    return 'Error interno del servidor. Por favor, inténtalo más tarde.'
  case 429:
    return 'Demasiados intentos de registro. Espera unos minutos.'
  default:
    return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
  }
}

const isEmailDuplicateError = (error) => {
  return error.response?.status === 409 && error.response?.data?.message === 'Email already registered'
}

export function Register() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  if (isAuthenticated) navigate('/')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    try {
      clearErrors('root.serverError')

      const sessionData = await registerRequest({ input: data })
      login(sessionData)
      navigate('/')
    } catch (err) {
      console.error('Register error:', err)

      const errorMessage = getErrorMessage(err)

      setError('root.serverError', {
        type: 'manual',
        message: errorMessage
      })
    }
  }

  const handleInputChange = (fieldName) => {
    return (e) => {
      if (errors.root?.serverError) {
        clearErrors('root.serverError')
      }
      if (errors[fieldName]) {
        clearErrors(fieldName)
      }
      return register(fieldName).onChange(e)
    }
  }

  const handleTelephoneChange = (e) => {
    const { value } = e.target
    e.target.value = value.replace(/[^0-9]/g, '').slice(0, 10)

    if (errors.root?.serverError) {
      clearErrors('root.serverError')
    }
    if (errors.telefono) {
      clearErrors('telefono')
    }

    register('telefono').onChange(e)
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

      <Card className="mx-auto w-full max-w-md">
        <Link to="/" className="flex items-center justify-center">
          <img src={VetsyncLogo} className="w-14 md:w-20" alt="Vetsync Logo" />
        </Link>

        <CardHeader>
          <CardTitle className="text-center uppercase font-bold">Crea una cuenta</CardTitle>
          <CardDescription className="text-center">Regístrate para ser parte de Vetsync</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Juan"
                    {...register('nombre')}
                    onChange={handleInputChange('nombre')}
                    className={errors.nombre ? 'border-red-500' : ''}
                  />
                  {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    type="text"
                    placeholder="Perez"
                    {...register('apellido')}
                    onChange={handleInputChange('apellido')}
                    className={errors.apellido ? 'border-red-500' : ''}
                  />
                  {errors.apellido && <p className="text-sm text-red-500">{errors.apellido.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
                <div className="grid gap-2 md:col-span-6">
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
                <div className="grid gap-2 md:col-span-4">
                  <Label htmlFor="telefono">Teléfono (Opcional)</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="5512345678"
                    {...register('telefono')}
                    onChange={handleTelephoneChange}
                    className={errors.telefono ? 'border-red-500' : ''}
                  />
                  {errors.telefono && <p className="text-sm text-red-500">{errors.telefono.message}</p>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
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

              <div className="grid gap-2">
                <Label htmlFor="direccion">Dirección (Opcional)</Label>
                <Input
                  id="direccion"
                  type="text"
                  placeholder="Calle 123, Colonia, Ciudad, Estado"
                  {...register('direccion')}
                  onChange={handleInputChange('direccion')}
                  className={errors.direccion ? 'border-red-500' : ''}
                />
                {errors.direccion && <p className="text-sm text-red-500">{errors.direccion.message}</p>}
              </div>

              {/* Error del servidor */}
              {errors.root?.serverError && (
                <p className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-950/10 p-3 rounded-md border border-red-200 dark:border-red-800">
                  {errors.root.serverError.message}
                  {isEmailDuplicateError({
                    response: { status: 409, data: { message: 'Email already registered' } }
                  }) &&
                    errors.root.serverError.message.includes('correo electrónico') && (
                    <span className="block mt-1">
                      <Link to="/login" className="underline hover:no-underline">
                          Ir al inicio de sesión
                      </Link>
                    </span>
                  )}
                </p>
              )}
            </div>

            <CardFooter className="mt-4 flex-col gap-2 p-0">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  'Registrarse'
                )}
              </Button>
            </CardFooter>
          </form>

          <Link to="/login" className="text-center text-sm">
            ¿Ya tienes una cuenta? <span className="underline">Inicia sesión</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
