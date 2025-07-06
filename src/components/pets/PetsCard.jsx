import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Ellipsis, Calendar1, Mars, Venus, UserRound, PenLine, Trash } from 'lucide-react'

export function PetsCard({ pet }) {
  return (
    <Card className="py-2 overflow-hidden">
      <CardContent className="flex md:flex-row flex-col gap-3 md:gap-6 relative">
        <div className="absolute top-2 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="text-muted-foreground hover:cursor-pointer" size={22} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="hover:cursor-pointer my-0.5">
                <PenLine className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer my-0.5" variant="destructive">
                <Trash className="w-5 h-5" aria-hidden="true" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex items-center">
          <img className="w-40 aspect-square object-cover rounded-full" src={pet.img_url} alt={pet.nombre} />
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden items-center gap-4">
          <img
            className="w-22 aspect-square object-cover rounded-full flex-shrink-0"
            src={pet.img_url}
            alt={pet.nombre}
          />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{pet.nombre}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {pet.nombre_especie} • {pet.nombre_raza}
            </p>
          </div>
        </div>

        <article className="flex flex-col py-2 gap-4">
          {/* Desktop header */}
          <header className="hidden md:block">
            <CardTitle className="text-xl">{pet.nombre}</CardTitle>
            <p className="text-base text-muted-foreground">
              {pet.nombre_especie} • {pet.nombre_raza}
            </p>
          </header>

          <div className="flex flex-wrap md:gap-1 gap-2 px-1 md:px-0 justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <Calendar1 className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              {pet.edad} años
            </div>

            <div className="flex items-center gap-2">
              {pet.sexo === 'M' ? (
                <Mars className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              ) : (
                <Venus className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              )}
              {pet.sexo === 'M' ? 'Macho' : 'Hembra'}
            </div>

            <div className="flex items-center gap-2">
              <UserRound className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              {pet.nombre_cliente.split(' ')[0]}
            </div>
          </div>

          <div>
            <Badge className="bg-sky-100 text-sky-800 rounded-lg px-3 py-1 text-sm font-normal w-full">
              {pet.sexo === 'M' ? 'Registrado' : 'Registrada'} el{' '}
              {new Date(pet.fecha_registro).toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Badge>
          </div>
        </article>
      </CardContent>
    </Card>
  )
}
