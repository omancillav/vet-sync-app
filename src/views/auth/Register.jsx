import { Link, useNavigate } from 'react-router-dom'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModeToggle } from '@/components/header/mode-toggle.jsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/schemas/registerSchema'
import { register as registerRequest } from '@/services/api/auth.js'
import { useAuth } from '@/hooks/useAuth'

export function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    try {
      // 1. Intenta registrar al usuario y obtener la sesión
      const sessionData = await registerRequest({ input: data })

      // 2. Guarda la sesión en el contexto y redirige
      login(sessionData)
      navigate('/')
    } catch (err) {
      console.error(err)
      // Maneja errores del registro (ej. email ya existe)
      setError('root.serverError', {
        type: 'manual',
        message: err.response?.data?.message || 'Hubo un error durante el registro. Por favor, inténtalo de nuevo.'
      })
    }
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-[1400px] flex-col items-center justify-start gap-4 p-4 pt-20 md:justify-center md:pt-4">
      <Link to="/" className="absolute left-4 top-4">
        <Button className="hover:cursor-pointer" variant="outline">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </Link>

      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <Card className="mx-auto w-full max-w-md">
        <Link to="/" className="flex items-center justify-center">
          <img src={VetsyncLogo} className="w-12 lg:w-18" alt="Vetsync Logo" />
        </Link>

        <CardHeader>
          <CardTitle className="text-center uppercase font-bold">Crea una cuenta</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" type="text" placeholder="Juan" {...register('nombre')} />
                  {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input id="apellido" type="text" placeholder="Perez" {...register('apellido')} />
                  {errors.apellido && <p className="text-sm text-red-500">{errors.apellido.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
                <div className="grid gap-2 md:col-span-6">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="correo@ejemplo.com" {...register('email')} />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2 md:col-span-4">
                  <Label htmlFor="telefono">Teléfono (Opcional)</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="1234567890"
                    {...register('telefono')}
                    onChange={(e) => {
                      const { value } = e.target
                      e.target.value = value.replace(/[^0-9]/g, '').slice(0, 10)
                      register('telefono').onChange(e)
                    }}
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
                    className="pr-10 font-mono"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
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
                />
                {errors.direccion && <p className="text-sm text-red-500">{errors.direccion.message}</p>}
              </div>
              {errors.root?.serverError && <p className="text-sm text-red-500">{errors.root.serverError.message}</p>}
            </div>
            <CardFooter className="mt-4 flex-col gap-2 p-0">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : 'Registrarse'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <Link to="/login">
        ¿Ya tienes una cuenta? <span className="underline">Inicia sesión</span>
      </Link>
    </div>
  )
}
