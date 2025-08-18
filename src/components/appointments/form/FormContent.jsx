import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentSchema } from '@/schemas/appointmentSchema'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LoaderCircle, Calendar as CalendarIcon, CalendarPlus } from 'lucide-react'
import { usePets } from '@/hooks/usePets'
import { useServices } from '@/hooks/useServices'
import { useAuth } from '@/hooks/useAuth'
import { useAppointments } from '@/hooks/useAppointments'
import { Image } from '@unpic/react'

export function FormContent() {
  const { user } = useAuth()
  const { pets, loading: petsLoading, initializePets } = usePets()
  const { services, loading: servicesLoading, initializeServices } = useServices()
  const { closeForm } = useAppointments()

  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(undefined)

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      cliente_id: user?.id || '',
      mascota_id: '',
      servicio_id: '',
      status: 'Programada',
      fecha: '',
      hora_inicio: '',
      motivo_consulta: ''
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = form

  useEffect(() => {
    initializePets()
    initializeServices()
  }, [initializePets, initializeServices])

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        servicio_id: Number(data.servicio_id)
      }
      console.log('Datos del formulario:', formData)
    } catch (error) {
      console.error('Error al procesar la cita:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Selección de Mascota */}
          <div className="grid gap-2 w-full">
            <Label htmlFor="mascota_id">Mascota</Label>
            <Controller
              name="mascota_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={onChange} disabled={petsLoading || pets.length === 0}>
                  <SelectTrigger className={`${errors.mascota_id ? 'border-red-500' : ''} w-full overflow-hidden`}>
                    <SelectValue
                      placeholder={
                        petsLoading
                          ? 'Cargando mascotas...'
                          : pets.length === 0
                            ? 'No tienes mascotas registradas'
                            : 'Selecciona una mascota'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        <div className="flex items-center gap-3">
                          <Image
                            src={pet.img_url}
                            alt={pet.nombre}
                            width={100}
                            aspectRatio={1}
                            loading="lazy"
                            className="rounded-full w-7 h-7"
                          />
                          <span>{pet.nombre}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.mascota_id && <p className="text-sm text-red-500">{errors.mascota_id.message}</p>}
          </div>

          {/* Selección de Servicio */}
          <div className="grid gap-2 w-full">
            <Label htmlFor="servicio_id">Servicio</Label>
            <Controller
              name="servicio_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value?.toString() || ''}
                  onValueChange={(val) => onChange(Number(val))}
                  disabled={servicesLoading || services.length === 0}
                >
                  <SelectTrigger className={`${errors.servicio_id ? 'border-red-500' : ''} w-full overflow-hidden`}>
                    <SelectValue
                      placeholder={
                        servicesLoading
                          ? 'Cargando servicios...'
                          : services.length === 0
                            ? 'No hay servicios disponibles'
                            : 'Selecciona un servicio'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.nombre} - ${service.precio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.servicio_id && <p className="text-sm text-red-500">{errors.servicio_id.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Fecha de la Cita */}
          <div className="grid gap-2">
            <Label htmlFor="fecha">Fecha de la Cita</Label>
            <Controller
              name="fecha"
              control={control}
              render={({ field: { onChange } }) => (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="fecha"
                      className={`w-full justify-between font-normal ${errors.fecha ? 'border-red-500' : ''}`}
                    >
                      {selectedDate ? selectedDate.toLocaleDateString('es-ES') : 'Seleccionar fecha'}
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setSelectedDate(date)
                        setOpen(false)
                        if (date) {
                          const formattedDate = date.toISOString().split('T')[0]
                          onChange(formattedDate)
                        }
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.fecha && <p className="text-sm text-red-500">{errors.fecha.message}</p>}
          </div>

          {/* Hora de Inicio */}
          <div className="grid gap-2">
            <Label htmlFor="hora_inicio">Hora de la Cita</Label>
            <Controller
              name="hora_inicio"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="time"
                  value={value}
                  onChange={onChange}
                  className={`${errors.hora_inicio ? 'border-red-500' : ''}`}
                />
              )}
            />
            {errors.hora_inicio && <p className="text-sm text-red-500">{errors.hora_inicio.message}</p>}
          </div>
        </div>

        {/* Motivo de Consulta */}
        <div className="grid gap-2">
          <Label htmlFor="motivo_consulta">Motivo de Consulta (Opcional)</Label>
          <Controller
            name="motivo_consulta"
            control={control}
            render={({ field: { onChange, value } }) => (
              <textarea
                value={value}
                onChange={onChange}
                placeholder="Describe el motivo de la consulta..."
                className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
                  errors.motivo_consulta ? 'border-red-500' : ''
                }`}
                rows={3}
              />
            )}
          />
          {errors.motivo_consulta && <p className="text-sm text-red-500">{errors.motivo_consulta.message}</p>}
        </div>
      </div>

      {/* Error general */}
      {errors.root && <div className="rounded-md bg-red-50 p-4 text-red-600">{errors.root.message}</div>}

      {/* Botones */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="secondary" disabled={isSubmitting} onClick={closeForm}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || petsLoading || servicesLoading}>
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <>
              Agendar
              <CalendarPlus className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
