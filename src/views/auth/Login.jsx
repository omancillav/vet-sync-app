import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema'
import { ModeToggle } from '@/components/header/mode-toggle.jsx'
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { login as loginRequest } from '@/services/api/auth.js'
import { useAuth } from '@/hooks/useAuth'

export function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  if (isAuthenticated) navigate('/')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      const responseData = await loginRequest({ input: data })
      login(responseData)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('root.serverError', {
        type: 'manual',
        message: 'Correo o contraseña inválidos. Por favor, inténtalo de nuevo.'
      })
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
          <CardTitle className="text-center uppercase font-bold">Inicia sesión</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="correo@ejemplo.com" {...register('email')} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
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
              {errors.root?.serverError && <p className="text-sm text-red-500">{errors.root.serverError.message}</p>}
            </div>
            <CardFooter className="mt-4 flex-col gap-2 p-0">
              <Button type="submit" className="w-full hover:cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <Link to="/register">
        No tienes una cuenta? <span className="underline">Registrate</span>
      </Link>
    </div>
  )
}
