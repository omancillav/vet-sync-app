import { useEffect, useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentSchema } from '@/schemas/appointmentSchema'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LoaderCircle, CalendarPlus, Stethoscope, Bubbles, Clock } from 'lucide-react'
import { usePets } from '@/hooks/usePets'
import { useServices } from '@/hooks/useServices'
import { useAppointments } from '@/hooks/useAppointments'
import { getCurrentDateInCDMX, generateTimeSlots } from '@/lib/utils'
import { Image } from '@unpic/react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { ConfirmationDialog } from '../ConfirmationDialog'

export function FormContent() {
  const { pets, loading: petsLoading, initializePets } = usePets()
  const { services, loading: servicesLoading, initializeServices } = useServices()
  const { addAppointment, getBlockedSlots } = useAppointments()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [blockedSlots, setBlockedSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [validatedData, setValidatedData] = useState(null)

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: 'onChange',
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
    trigger,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = form

  const fetchBlockedSlots = useCallback(async () => {
    const currentDate = getValues('fecha')
    const currentServiceId = getValues('servicio_id')

    if (currentDate && currentServiceId) {
      try {
        setLoadingSlots(true)
        const { blocked_slots } = await getBlockedSlots(Number(currentServiceId), currentDate)
        setBlockedSlots(blocked_slots || [])
      } catch (error) {
        console.error('Error fetching blocked slots:', error)
        setBlockedSlots([])
      } finally {
        setLoadingSlots(false)
      }
    } else {
      setBlockedSlots([])
    }
  }, [getBlockedSlots, getValues])

  useEffect(() => {
    initializePets()
    initializeServices()
  }, [initializePets, initializeServices])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'fecha' || name === 'servicio_id') {
        fetchBlockedSlots()
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, fetchBlockedSlots])

  useEffect(() => {
    const fecha = getValues('fecha')
    const servicioId = getValues('servicio_id')
    if (fecha && servicioId) {
      fetchBlockedSlots()
    }
  }, [getValues, fetchBlockedSlots])

  useEffect(() => {
    const currentTime = getValues('hora_inicio')
    if (currentTime && blockedSlots.includes(currentTime)) {
      setValue('hora_inicio', '')
    }
  }, [blockedSlots, getValues, setValue])

  const nextStep = async (event) => {
    event?.preventDefault()
    let fieldsToValidate = []

    if (currentStep === 1) {
      fieldsToValidate = ['mascota_id', 'servicio_id']
    } else if (currentStep === 2) {
      fieldsToValidate = ['fecha']
    } else if (currentStep === 3) {
      fieldsToValidate = ['hora_inicio']
    }

    const isStepValid = await trigger(fieldsToValidate)

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = (event) => {
    event?.preventDefault()
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFormSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        servicio_id: Number(data.servicio_id)
      }
      setValidatedData(formData)
      setShowConfirmDialog(true)
    } catch (error) {
      console.error('Error al validar los datos:', error)
    }
  }

  const handleConfirmAppointment = async () => {
    try {
      await addAppointment(validatedData)
      setShowConfirmDialog(false)
      navigate('/citas')
    } catch (error) {
      console.error('Error al procesar la cita:', error)
    }
  }

  const StepIndicator = () => (
    <div className="mb-6">
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index < currentStep ? 'bg-white' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
    case 1:
      return <Step1Content />
    case 2:
      return <Step2Content />
    case 3:
      return <Step3Content />
    case 4:
      return <Step4Content />
    default:
      return <Step1Content />
    }
  }

  // Componente para el Paso 1: Selección de Mascota y Servicio
  const Step1Content = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Selecciona tu mascota y servicio</h3>

      <div className="grid gap-6">
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
                  onValueChange={(val) => {
                    const serviceId = Number(val)
                    onChange(serviceId)
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
    </div>
  )

  // Componente para el Paso 2: Selección de Fecha
  const Step2Content = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Selecciona la fecha de tu cita</h3>

      <div className="flex justify-center">
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
                toYear={new Date().getFullYear() + 1}
                onSelect={(date) => {
                  if (date) {
                    // Formatear fecha usando zona horaria local para evitar desfases
                    const year = date.getFullYear()
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const day = String(date.getDate()).padStart(2, '0')
                    const formattedDate = `${year}-${month}-${day}`
                    onChange(formattedDate)
                  }
                }}
                disabled={(date) => {
                  const today = new Date(getCurrentDateInCDMX() + 'T00:00:00')
                  return date < today
                }}
                className="rounded-md border"
                classNames={{
                  today:
                    'bg-accent/50 text-accent-foreground rounded-full data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:rounded-full'
                }}
              />
            </div>
          )}
        />
      </div>
      {errors.fecha && <p className="text-sm text-red-500 text-center">{errors.fecha.message}</p>}
    </div>
  )

  // Componente para el Paso 3: Selección de Horario
  const Step3Content = () => {
    const selectedDate = getValues('fecha')
    const selectedServiceId = getValues('servicio_id')
    const selectedService = services.find((service) => service.id === Number(selectedServiceId))
    const duration = selectedService?.duracion_estimada || 30

    const availableSlots = generateTimeSlots(selectedDate, duration)
    const filteredSlots = availableSlots.filter((slot) => !blockedSlots.includes(slot))

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Selecciona el horario de tu cita</h3>

        <Controller
          name="hora_inicio"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="border rounded-md max-h-[300px] min-h-[120px] overflow-hidden">
              {loadingSlots ? (
                <div className="flex items-center justify-center h-[120px] p-6">
                  <LoaderCircle className="h-6 w-6 animate-spin" />
                  <span className="ml-2 text-sm text-muted-foreground">Cargando horarios...</span>
                </div>
              ) : filteredSlots.length === 0 ? (
                <div className="flex items-center flex-col justify-center h-[120px] p-6 gap-4">
                  <Clock className="w-10 h-10 text-muted-foreground" />
                  <span className="text-sm text-center text-muted-foreground">
                    No hay horarios disponibles para la fecha seleccionada
                  </span>
                </div>
              ) : (
                <ScrollArea className="h-[360px] w-full">
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {filteredSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={value === slot ? 'default' : 'outline'}
                          size="sm"
                          className="h-10 text-sm font-medium min-w-0 flex-shrink-0"
                          onClick={() => onChange(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              )}
            </div>
          )}
        />
        {errors.hora_inicio && <p className="text-sm text-red-500 text-center">{errors.hora_inicio.message}</p>}
      </div>
    )
  }
  // Componente para el Paso 4: Motivo de Consulta
  const Step4Content = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Describe el motivo de la consulta</h3>

      <Controller
        name="motivo_consulta"
        control={control}
        render={({ field: { onChange, value } }) => (
          <textarea
            value={value}
            onChange={onChange}
            placeholder="Describe el motivo de la consulta..."
            className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
              errors.motivo_consulta ? 'border-red-500' : ''
            }`}
            rows={5}
          />
        )}
      />
      {errors.motivo_consulta && <p className="text-sm text-red-500">{errors.motivo_consulta.message}</p>}

      <div className="text-sm text-muted-foreground text-center">
        <p>Este campo es opcional. Si no tienes un motivo específico, puedes dejarlo vacío y continuar.</p>
      </div>
    </div>
  )

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <StepIndicator />

        <div>{renderStepContent()}</div>

        {errors.root && (
          <div className="rounded-md bg-red-400/20 p-4 text-red-600 border border-red-600">{errors.root.message}</div>
        )}

        <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} gap-2.5 md:pt-4`}>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button
                className="w-full md:w-auto"
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                Anterior
              </Button>
            )}
          </div>

          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep} disabled={isSubmitting || petsLoading || servicesLoading}>
              Siguiente
            </Button>
          ) : (
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
          )}
        </div>
      </form>

      {/* Dialog de Confirmación */}
      <ConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmAppointment}
        appointmentData={validatedData}
      />
    </>
  )
}
