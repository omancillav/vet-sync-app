import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import { LogoutDialog } from './LogoutDialog'
import { useAuth } from '@/contexts/auth.jsx'

export function UserNav() {
  const { isAuthenticated, user, logout } = useAuth()
  const userInitials =
    user?.nombre && user?.apellido
      ? `${user.nombre.charAt(0).toUpperCase()}${user.apellido.charAt(0).toUpperCase()}`
      : 'U'

  const [menuOpen, setMenuOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const handleLogoutClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen(false) // Cerrar el dropdown primero
    setLogoutDialogOpen(true) // Luego abrir el dialog
  }

  const handleLogoutConfirm = () => {
    logout()
    setLogoutDialogOpen(false)
  }

  if (isAuthenticated) {
    return (
      <>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="hover:cursor-pointer">
                <AvatarImage src={`https://api.dicebear.com/9.x/glass/svg?seed=${user.email}`} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.nombre + ' ' + user?.apellido}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogoutClick}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <LogoutDialog
          open={logoutDialogOpen}
          onOpenChange={setLogoutDialogOpen}
          onConfirm={handleLogoutConfirm}
        ></LogoutDialog>
      </>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" className="transition-transform text-sm lg:text-md hover:cursor-pointer">
        <Link to="/login">Iniciar sesión</Link>
      </Button>
      <Button asChild className="transition-transform text-sm lg:text-md hover:cursor-pointer">
        <Link to="/register">Registrarse</Link>
      </Button>
    </div>
  )
}
