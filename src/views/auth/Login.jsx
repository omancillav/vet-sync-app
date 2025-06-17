import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ModeToggle } from '@/components/header/mode-toggle.jsx'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start gap-4 p-4 pt-20 md:justify-center md:pt-4">
      <Link to="/" className="absolute left-4 top-4">
        <Button className="hover:cursor-pointer" variant="outline">
          <ArrowLeft className="h-4 w-4" />
          Inicio
        </Button>
      </Link>

      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <Card className="mx-auto w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center">
          <img src={VetsyncLogo} className="w-12 lg:w-18" alt="Vetsync Logo" />
        </Link>

        <CardHeader>
          <CardTitle className="text-center uppercase font-bold">
            Inicia sesión
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} className="pr-10 font-mono" required />
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
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={() => navigate('/')}>
            Login
          </Button>
        </CardFooter>
      </Card>

      <Link to="/register">
        No tienes una cuenta? <span className="underline">Registrate</span>
      </Link>
    </div>
  )
}
