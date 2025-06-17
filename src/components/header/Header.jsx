import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { NavItems } from './NavItems'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { ModeToggle } from '@/components/mode-toggle.jsx'

export function Header() {
  const avatar = false
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="py-4 px-5 shadow-sm">
      <div className="max-w-[1400px] mx-auto">
        {/* Desktop Layout */}
        <section className="hidden md:flex items-center relative">
          {/* Logo Section */}
          <section className="flex-1">
            <div className="flex items-center gap-4 lg:gap-4">
              <img src={VetsyncLogo} className="w-10 lg:w-10" alt="Vetsync Logo" />
              <h1 className="text-xl lg:text-xl font-bold text-primary">Vet Sync</h1>
            </div>
          </section>

          {/* Navigation - Centered */}
          <section className="absolute left-1/2 transform -translate-x-1/2">
            <nav>
              <NavItems />
            </nav>
          </section>

          {/* Avatar & Auth Section */}
          <section className="flex-1 flex justify-end">
            <div className="flex items-center gap-2">
              {avatar ? (
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="transition-transform text-sm lg:text-md hover:cursor-pointer"
                  >
                    Iniciar sesión
                  </Button>
                  <Button className="transition-transform text-sm lg:text-md hover:cursor-pointer">
                    Registrarse
                  </Button>
                </>
              )}
              <ModeToggle />
            </div>
          </section>
        </section>

        {/* Mobile Layout */}
        <section className="md:hidden">
          {/* Top Bar */}
          <section className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={VetsyncLogo} className="w-8" alt="Vetsync Logo" />
              <h1 className="text-lg font-bold text-primary">Vet Sync</h1>
            </div>

            <div className="flex items-center gap-2">
              <ModeToggle />
              {/* Menu Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMenu}
                className="hover:bg-accent rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </Button>
            </div>
          </section>
        </section>

        {/* Mobile Menu Overlay */}
        <section
          className={`md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`absolute top-0 left-0 right-0 bg-background/90 backdrop-blur-md border-b shadow-lg transition-transform duration-300 ease-out ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header repetido para continuidad visual */}
            <div className="p-4 border-b border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={VetsyncLogo} className="w-8" alt="Vetsync Logo" />
                  <h1 className="text-lg font-bold text-primary">Vet Sync</h1>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Contenido del menú */}
            <div className="p-6 space-y-6">
              {/* Navigation */}
              <nav>
                <NavItems onNavItemClick={toggleMenu} />
              </nav>

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-border/20">
                {avatar ? (
                  <div className="flex items-center justify-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full hover:scale-105 transition-transform py-5">
                      Iniciar sesión
                    </Button>
                    <Button className="w-full hover:scale-105 transition-transform py-5">Registrarse</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  )
}
