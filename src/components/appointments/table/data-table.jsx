import { useState } from 'react'
import {
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {} from 'lucide-react'
import { ChevronLeft, ChevronRight, SlidersHorizontal, Search, CalendarPlus } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  const isMobile = useMediaQuery('(max-width: 768px)')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination
    }
  })

  return (
    <div className="flex flex-col gap-5">
      <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center'}`}>
        {isMobile && (
          <div>
            <Button onClick={() => toast.warning('Funcionalidad de agendar cita en desarrollo')} className="w-full">
              Agendar Cita
              <CalendarPlus className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 w-full">
          <div className={`relative ${isMobile ? 'flex-1' : 'w-sm'}`}>
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5" />
            <Input
              placeholder="Filtrar mascotas..."
              value={table.getColumn('nombre_mascota')?.getFilterValue() ?? ''}
              onChange={(event) => table.getColumn('nombre_mascota')?.setFilterValue(event.target.value)}
              className="pr-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={!isMobile ? 'ml-auto' : ''}>
                {!isMobile && 'Columnas'}
                <SlidersHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const columnLabels = {
                    fecha: 'Fecha',
                    hora_inicio: 'Hora',
                    nombre_mascota: 'Mascota',
                    nombre_profesional: 'Profesional',
                    nombre_servicio: 'Servicio',
                    status: 'Estado'
                  }

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {columnLabels[column.id] || column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {!isMobile && (
            <div>
              <Button
                onClick={() => toast.warning('Funcionalidad de agendar cita en desarrollo')}
                className="w-auto ml-1"
              >
                Agendar Cita
                <CalendarPlus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'} items-center gap-2`}>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft />
        </Button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: table.getPageCount() }, (_, index) => {
            const pageNumber = index + 1
            const currentPage = table.getState().pagination.pageIndex + 1
            const isCurrentPage = pageNumber === currentPage

            const maxVisiblePages = isMobile ? 1 : 2
            const shouldShow =
              pageNumber === 1 ||
              pageNumber === table.getPageCount() ||
              Math.abs(pageNumber - currentPage) <= maxVisiblePages

            if (!shouldShow) {
              const ellipsisDistance = isMobile ? 2 : 3
              if (pageNumber === currentPage - ellipsisDistance || pageNumber === currentPage + ellipsisDistance) {
                return (
                  <span key={pageNumber} className="px-2 text-muted-foreground">
                    ...
                  </span>
                )
              }
              return null
            }

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? 'default' : 'outline'}
                size="sm"
                className={`w-8 h-8 p-0 ${isCurrentPage ? 'pointer-events-none' : ''}`}
                onClick={() => table.setPageIndex(index)}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
