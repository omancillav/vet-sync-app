import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Ellipsis, PenLine, Trash } from 'lucide-react'
import { DeleteDialog } from '../DeleteDialog'

export function ActionMenu({ pet, deletePet, onEdit }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="text-muted-foreground hover:cursor-pointer" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="hover:cursor-pointer my-0.5"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(pet)
          }}
        >
          <PenLine className="w-5 h-5 text-muted-foreground mr-2" aria-hidden="true" />
          Editar
        </DropdownMenuItem>
        <DeleteDialog onConfirm={() => deletePet(pet.id)}>
          <DropdownMenuItem
            className="hover:cursor-pointer my-0.5"
            variant="destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash className="w-5 h-5" aria-hidden="true" />
            Eliminar
          </DropdownMenuItem>
        </DeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
