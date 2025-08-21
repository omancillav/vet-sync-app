import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentSchema } from '@/schemas/appointmentSchema'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { LoaderCircle, CalendarPlus, Stethoscope, Bubbles } from 'lucide-react'
import { usePets } from '@/hooks/usePets'
import { useServices } from '@/hooks/useServices'
import { useAppointments } from '@/hooks/useAppointments'
import { getCurrentDateInCDMX } from '@/lib/utils'
import { Image } from '@unpic/react'

export function FormContent() {
  const { pets, loading: petsLoading, initializePets } = usePets()
  const { services, loading: servicesLoading, initializeServices } = useServices()
  const { addAppointment, closeForm, getBlockedSlots } = useAppointments()
  const navigate = useNavigate()

  const checkAndFetchBlockedSlots = async () => {
    const currentDate = form.getValues('fecha')
    const currentServiceId = form.getValues('servicio_id')

    if (currentDate && currentServiceId) {
      try {
        const { blocked_slots } = await getBlockedSlots(Number(currentServiceId), currentDate)
        console.log('Blocked slots for', currentDate, 'with service', currentServiceId, ':', blocked_slots)
      } catch (error) {
        console.error('Error fetching blocked slots:', error)
      }
    }
  }

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      mascota_id: '',
      servicio_id: '',
      status: 'Programada',
      fecha: getCurrentDateInCDMX(),
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
      await addAppointment(formData)
      navigate('/citas')
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
                  <SelectTrigger
                    className={`${errors.mascota_id ? 'border-red-500' : ''} w-full overflow-hidden min-h-12`}
                  >
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
                            className="rounded-full w-9 h-9"
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
              render={({ field: { onChange, value } }) => {
                const selectedService = services.find((service) => service.id === Number(value))

                return (
                  <Select
                    value={value?.toString() || ''}
                    onValueChange={async (val) => {
                      const serviceId = Number(val)
                      onChange(serviceId)
                      await checkAndFetchBlockedSlots()
                    }}
                    disabled={servicesLoading || services.length === 0}
                  >
                    <SelectTrigger
                      className={`${errors.servicio_id ? 'border-red-500' : ''} w-full overflow-hidden min-h-12`}
                    >
                      {selectedService ? (
                        <div className="flex items-center gap-2">
                          {selectedService.categoria_id === 1 && <Stethoscope size={18} />}
                          {selectedService.categoria_id === 2 && <Bubbles size={18} />}
                          <span>
                            <strong className="font-semibold">{selectedService.nombre}</strong> - $
                            {selectedService.precio}
                          </span>
                        </div>
                      ) : (
                        <SelectValue
                          placeholder={
                            servicesLoading
                              ? 'Cargando servicios...'
                              : services.length === 0
                                ? 'No hay servicios disponibles'
                                : 'Selecciona un servicio'
                          }
                        />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          <div className="flex items-center gap-3">
                            {service.categoria_id === 1 && <Stethoscope size={24} />}
                            {service.categoria_id === 2 && <Bubbles size={24} />}
                            <div className="flex flex-col">
                              <span>
                                <strong className="font-semibold">{service.nombre}</strong> - ${service.precio}
                              </span>
                              <p>{service.descripcion}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
              }}
            />
            {errors.servicio_id && <p className="text-sm text-red-500">{errors.servicio_id.message}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Fecha de la Cita */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="fecha">Fecha de la Cita</Label>
            <Controller
              name="fecha"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Calendar
                    mode="single"
                    selected={value ? new Date(value + 'T00:00:00') : undefined}
                    captionLayout="dropdown"
                    fromDate={new Date(getCurrentDateInCDMX() + 'T00:00:00')}
                    fromYear={new Date().getFullYear()}
                    toYear={new Date().getFullYear() + 2}
                    onSelect={async (date) => {
                      if (date) {
                        // Formatear fecha usando zona horaria local para evitar desfases
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        const formattedDate = `${year}-${month}-${day}`
                        onChange(formattedDate)
                        await checkAndFetchBlockedSlots()
                      }
                    }}
                    disabled={(date) => {
                      const today = new Date(getCurrentDateInCDMX() + 'T00:00:00')
                      return date < today
                    }}
                    className="rounded-md border"
                    classNames={{
                      today:
                        'bg-accent/50 text-accent-foreground rounded-md data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:rounded-md'
                    }}
                  />
                </div>
              )}
            />
            {errors.fecha && <p className="text-sm text-red-500">{errors.fecha.message}</p>}
          </div>

          {/* Hora de Inicio */}
          <div className=" flex flex-col gap-2 w-full">
            <Label htmlFor="hora_inicio">Hora de la Cita</Label>
            <Controller
              name="hora_inicio"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="time"
                  id="hora_inicio"
                  value={value}
                  onChange={onChange}
                  className={`bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${
                    errors.hora_inicio ? 'border-red-500' : ''
                  }`}
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
      {errors.root && (
        <div className="rounded-md bg-red-400/20 p-4 text-red-600 border border-red-600">{errors.root.message}</div>
      )}

      {/* Botones */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="secondary" disabled={isSubmitting} onClick={closeForm}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || petsLoading || servicesLoading}>
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
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
