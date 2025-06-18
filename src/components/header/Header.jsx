import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { NavItems } from './NavItems'
import { ModeToggle } from './mode-toggle.jsx'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { UserNav } from './UserNav'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="py-4 px-5 shadow-sm">
      <div className="max-w-[1400px] mx-auto">
        {/* Desktop Layout */}
        <section className="hidden lg:flex items-center relative">
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-4">
              <img src={VetsyncLogo} className="w-10" alt="Vetsync Logo" />
              <h1 className="text-xl font-bold text-primary">Vet Sync</h1>
            </Link>
          </div>

          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <NavItems />
          </nav>

          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-2">
              <UserNav />
              <ModeToggle />
            </div>
          </div>
        </section>

        {/* Mobile Layout */}
        <section className="lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={VetsyncLogo} className="w-8" alt="Vetsync Logo" />
              <h1 className="text-lg font-bold text-primary">Vet Sync</h1>
            </Link>

            <div className="flex items-center gap-2">
              <ModeToggle />
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
          </div>
        </section>

        <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      </div>
    </header>
  )
}
