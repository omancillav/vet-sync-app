import { NavButton } from './NavButton'

export const NavItems = () => (
  <ul className="flex flex-col md:flex-row items-center gap-2">
    <li className="w-full md:w-auto">
      <NavButton isActive={true}>
          Inicio
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton>
          Mascotas
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton>
          Citas
      </NavButton>
    </li>
    <li className="w-full md:w-auto">
      <NavButton>
          Servicios
      </NavButton>
    </li>
  </ul>
)
