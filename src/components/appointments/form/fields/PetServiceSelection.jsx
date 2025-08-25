import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Stethoscope, Bubbles } from 'lucide-react'
import { Image } from '@unpic/react'

export function PetServiceSelection({ control, errors, pets, services, petsLoading, servicesLoading }) {
  return (
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
              const selectedService = services.find((service) => service.id.toString() === value?.toString())

              return (
                <Select
                  key={value ? `service-select-${value}` : undefined}
                  value={value?.toString() || ''}
                  onValueChange={onChange}
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
}
