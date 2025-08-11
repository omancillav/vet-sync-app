import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CalendarX, NotebookPen } from 'lucide-react'

export const columns = [
  {
    accessorKey: 'fecha',
    header: 'Fecha',
    cell: ({ row }) => {
      const fecha = row.getValue('fecha')
      const [year, month, day] = fecha.split('-').map(Number)
      const date = new Date(year, month - 1, day)

      const formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })

      return <div className="font-medium">{formattedDate}</div>
    }
  },
  {
    accessorKey: 'hora_inicio',
    header: () => <div>Hora Inicio</div>,
    cell: ({ row }) => {
      const hora_inicio = row.getValue('hora_inicio')
      const [hours, minutes] = hora_inicio.split(':').map(Number)
      const date = new Date()
      date.setHours(hours, minutes, 0, 0)

      const localTime = date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })

      return <div className="font-medium">{localTime}</div>
    }
  },
  {
    accessorKey: 'nombre_mascota',
    header: 'Mascota'
  },

  {
    accessorKey: 'nombre_profesional',
    header: 'Profesional'
  },
  {
    accessorKey: 'nombre_servicio',
    header: 'Servicio'
  },
  {
    accessorKey: 'status',
    header: 'Estado'
  },
  {
    id: 'actions',
    cell: () => {
      // const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center text-black dark:text-white">
              Modificar
              <NotebookPen className="h-4 w-4 stroke-black dark:stroke-white" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center !text-red-500">
              Cancelar
              <CalendarX className="h-4 w-4 stroke-red-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
