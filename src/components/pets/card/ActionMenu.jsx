import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Ellipsis, PenLine, Trash } from 'lucide-react'
import { deletePet } from '@/services/api/pets'

const handleDelete = async (petId) => {
  try {
    await deletePet(petId)
    console.log('Mascota eliminada exitosamente')
  } catch (error) {
    console.error('Error al eliminar la mascota:', error)
  }
}

export function ActionMenu({ petId }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="text-muted-foreground hover:cursor-pointer" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="hover:cursor-pointer my-0.5">
          <PenLine className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer my-0.5"
          variant="destructive"
          onClick={() => handleDelete(petId)}
        >
          <Trash className="w-5 h-5" aria-hidden="true" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
