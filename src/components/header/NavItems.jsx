import { NavLink } from 'react-router-dom'

const NavButton = ({ children, to, ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const base = 'w-full text-center transition-colors text-base block px-4 py-2'
        const mobile = 'rounded-md'
        const desktop = 'md:w-auto md:rounded-full'

        const inactive = 'hover:bg-accent hover:text-accent-foreground'
        const active = 'font-semibold text-primary md:bg-primary md:text-primary-foreground md:font-normal'

        return `${base} ${mobile} ${desktop} ${isActive ? active : inactive}`
      }}
      {...props}
    >
      {children}
    </NavLink>
  )
}

export const NavItems = ({ onNavItemClick }) => (
  <ul className="flex flex-col md:flex-row items-center gap-2">
    <li className="w-full md:w-auto">
      <NavButton to="/" onClick={onNavItemClick}>
        Inicio
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton to="/mascotas" onClick={onNavItemClick}>
        Mascotas
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton to="/citas" onClick={onNavItemClick}>
        Citas
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton to="/servicios" onClick={onNavItemClick}>
        Servicios
      </NavButton>
    </li>
  </ul>
)
