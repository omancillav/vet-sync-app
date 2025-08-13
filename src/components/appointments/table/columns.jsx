import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, CalendarX, NotebookPen } from 'lucide-react'
import { CancelDialog } from '@/components/appointments/CancelDialog'

export const createColumns = (cancelAppointment) => [
  {
    accessorKey: 'nombre_mascota',
    header: 'Mascota'
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => {
      return (
        <Button
          variant="primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-medium"
        >
          Fecha
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
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
    },
    sortingFn: (a, b) => {
      const dateA = new Date(a.getValue('fecha'))
      const dateB = new Date(b.getValue('fecha'))
      return dateB.getTime() - dateA.getTime()
    }
  },
  {
    accessorKey: 'hora_inicio',
    header: () => <div>Hora</div>,
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
    accessorKey: 'nombre_servicio',
    header: 'Servicio'
  },
  {
    accessorKey: 'nombre_profesional',
    header: 'Profesional'
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status')

      const statusColors = {
        Programada: 'text-blue-500 border-blue-500 dark:text-blue-400 dark:border-blue-400',
        Completada: 'text-green-600 border-green-600',
        Cancelada: 'text-red-600 border-red-600',
        Reprogramada: 'text-yellow-400 border-yellow-400',
        'No asistió': 'text-red-600 border-red-600',
        'En Curso': 'text-primary border-primary'
      }

      const colorClass = statusColors[status] || 'text-gray-500 border-gray-500'

      return (
        <Badge variant="outline" className={`${colorClass} font-medium text-sm`}>
          {status}
        </Badge>
      )
    }
  },
  {
    id: 'acciones',
    cell: ({ row }) => {
      const appointment = row.original
      const actionableStatuses = ['Programada', 'Reprogramada']
      const canPerformActions = actionableStatuses.includes(appointment.status)

      if (!canPerformActions) {
        return null
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center text-black dark:text-white cursor-pointer">
              <NotebookPen className="h-4 w-4 mr-1 stroke-black dark:stroke-white" />
              Modificar
            </DropdownMenuItem>
            <CancelDialog onConfirm={() => cancelAppointment(appointment.id)}>
              <DropdownMenuItem
                className="flex items-center !text-red-500 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <CalendarX className="h-4 w-4 mr-1 stroke-red-500" />
                Cancelar
              </DropdownMenuItem>
            </CancelDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
