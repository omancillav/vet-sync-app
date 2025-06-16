import { NavLink } from 'react-router-dom'

const NavButton = ({ children, to, ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const baseClasses = 'w-full md:w-auto px-4 py-2 rounded-full transition-colors block text-center'
        const activeClasses = 'bg-primary text-primary-foreground text-sm hover:bg-primary/90'
        const inactiveClasses = 'hover:bg-accent hover:text-accent-foreground hover:cursor-pointer'

        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }}
      {...props}
    >
      {children}
    </NavLink>
  )
}

export const NavItems = () => (
  <ul className="flex flex-col md:flex-row items-center gap-2">
    <li className="w-full md:w-auto">
      <NavButton to="/">
        Inicio
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton to="/mascotas">
        Mascotas
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton to="/citas">
        Citas
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton to="/servicios">
        Servicios
      </NavButton>
    </li>
  </ul>
)
