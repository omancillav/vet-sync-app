import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Ellipsis, Calendar1, Mars, Venus, UserRound } from 'lucide-react'

export function PetsCard({ pet }) {
  return (
    <Card className="p-0 overflow-hidden">
      <CardContent className="flex gap-4 relative p-0">
        <Ellipsis className="absolute top-4 right-4 text-muted-foreground hover:cursor-pointer" size={22} />
        <div className="flex items-center">
          <img className="md:w-40 w-24 aspect-square object-cover" src={pet.img_url} alt={pet.nombre} />
        </div>

        <article className="flex flex-col py-2 gap-4">
          <header>
            <CardTitle className="md:text-xl text-lg">{pet.nombre}</CardTitle>
            <p className="md:text-base text-sm text-muted-foreground">
              {pet.nombre_especie} • {pet.nombre_raza}
            </p>
          </header>

          <div className="flex flex-wrap gap-3">
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
              {pet.nombre_cliente}
            </div>
          </div>

          <div>
            <Badge className="bg-sky-100 text-sky-800 rounded-lg px-3 py-1 text-sm font-normal">
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
