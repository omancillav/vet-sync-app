import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import VetsyncLogo from '@/assets/vetsync_logo.webp'

export function Header() {
  const avatar = false

  return (
    <header className="p-4 shadow-sm relative">
      <div className="max-w-[1200px] mx-auto flex items-center">
        {/* Logo Section */}
        <div className="flex-1">
          <div className="flex items-center gap-6">
            <img src={VetsyncLogo} className="w-14" alt="Vetsync Logo" />
            <h1 className="text-2xl font-bold text-primary">Vet Sync</h1>
          </div>
        </div>

        {/* Navigation - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <nav>
            <ul className="flex items-center gap-2">
              <li className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors hover:cursor-pointer">
                Inicio
              </li>
              <li className="px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
                Mascotas
              </li>
              <li className="px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
                Citas
              </li>
              <li className="px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
                Servicios
              </li>
            </ul>
          </nav>
        </div>

        {/* Avatar Section */}
        <div className="flex-1 flex justify-end">
          {avatar ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center gap-2">
              <Button className="hover:cursor-pointer hover:scale-103">Sign Up</Button>
              <Button className="hover:cursor-pointer hover:scale-103" variant="outline">
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
