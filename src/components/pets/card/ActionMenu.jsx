import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Ellipsis, PenLine, Trash } from 'lucide-react'
import { DeleteDialog } from '../DeleteDialog'

export function ActionMenu({ petId, deletePet }) {
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
        <DeleteDialog onConfirm={() => deletePet(petId)}>
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
