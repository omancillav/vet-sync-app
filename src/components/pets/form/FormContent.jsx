import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { petSchema } from '@/schemas/petSchema'
import { LoaderCircle, Check, ChevronsUpDown, HeartPlus } from 'lucide-react'
import { addPet } from '@/services/api/pets'
import { cn } from '@/lib/utils'

export function FormContent({ breeds, species, loading, error, onPetAdded, setIsOpen }) {
  const [breedComboOpen, setBreedComboOpen] = useState(false)
  const [selectedSpecies, setSelectedSpecies] = useState(null)
  const [selectedBreed, setSelectedBreed] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue
  } = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      edad: '',
      sexo: 'M'
    }
  })

  const filteredBreeds = selectedSpecies ? breeds.filter((breed) => breed.especie_id === selectedSpecies) : []

  const handleSpeciesChange = (value) => {
    const speciesId = Number(value)
    setSelectedSpecies(speciesId)
    setValue('especie_id', speciesId)

    setSelectedBreed(null)
    setValue('raza_id', '')
  }

  const handleBreedSelect = (breedId, breedName) => {
    setSelectedBreed({ id: breedId, nombre: breedName })
    setValue('raza_id', breedId)
    setBreedComboOpen(false)
  }

  const onSubmit = async (data) => {
    try {
      console.log('Datos de la mascota:', data)
      const response = await addPet(data)
      console.log('Respuesta de la API:', response)
      setIsOpen(false)
      reset()
      setSelectedSpecies(null)
      setSelectedBreed(null)

      if (onPetAdded) {
        await onPetAdded()
      }
    } catch (error) {
      console.error('Error al registrar la mascota:', error)
      setError('root', {
        message: 'Ocurrió un error al registrar la mascota. Inténtalo de nuevo.'
      })
    }
  }

  const handleCancel = () => {
    reset()
    setSelectedSpecies(null)
    setSelectedBreed(null)
    setIsOpen(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-6">
        {/* Nombre */}
        <div className="grid gap-2 w-full">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            type="text"
            placeholder="Nombre de la mascota"
            {...register('nombre')}
            className={`text-sm ${errors.nombre ? 'border-red-500' : ''}`}
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
        </div>

        {/* Cliente ID (oculto, se establecerá desde el contexto) */}
        <input type="hidden" {...register('cliente_id')} value="1" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {/* Especie */}
          <div className="grid gap-2 w-full">
            <Label htmlFor="especie_id">Especie</Label>
            <Select onValueChange={handleSpeciesChange} disabled={loading}>
              <SelectTrigger className={`w-full ${errors.especie_id ? 'border-red-500' : ''}`}>
                <SelectValue placeholder={loading ? 'Cargando...' : 'Selecciona una especie'} />
              </SelectTrigger>
              <SelectContent>
                {species.map((especie) => (
                  <SelectItem key={especie.id} value={especie.id.toString()}>
                    {especie.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.especie_id && <p className="text-sm text-red-500">{errors.especie_id.message}</p>}
          </div>

          {/* Raza */}
          <div className="grid gap-2 w-full">
            <Label htmlFor="raza_id">Raza</Label>
            <Popover open={breedComboOpen} onOpenChange={setBreedComboOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={breedComboOpen}
                  className={cn(
                    'w-full justify-between text-left font-normal h-10 px-3 overflow-hidden',
                    errors.raza_id && 'border-red-500'
                  )}
                  disabled={loading || !selectedSpecies || filteredBreeds.length === 0}
                >
                  <span className="truncate flex-1 min-w-0">
                    {selectedBreed ? selectedBreed.nombre : loading ? 'Cargando...' : 'Buscar raza...'}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0 overflow-hidden">
                <Command className="max-h-[160px] lg:max-h-[280px] max-w-[280px]">
                  <CommandInput placeholder="Buscar raza..." className="h-9" />
                  <CommandList className="overflow-y-auto">
                    <CommandEmpty>No se encontraron razas.</CommandEmpty>
                    <CommandGroup>
                      {filteredBreeds.map((breed) => (
                        <CommandItem
                          key={breed.id}
                          value={breed.nombre}
                          onSelect={() => handleBreedSelect(breed.id, breed.nombre)}
                          className="flex items-center justify-between px-2 py-1.5"
                        >
                          <span className="truncate flex-1 min-w-0 pr-2">{breed.nombre}</span>
                          <Check
                            className={cn(
                              'h-4 w-4 flex-shrink-0',
                              selectedBreed?.id === breed.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.raza_id && <p className="text-sm text-red-500">{errors.raza_id.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Edad */}
          <div className="grid gap-2">
            <Label htmlFor="edad">Edad (años)</Label>
            <Input
              id="edad"
              type="number"
              placeholder="Edad en años"
              {...register('edad', { valueAsNumber: true })}
              className={`text-sm ${errors.edad ? 'border-red-500' : ''}`}
            />
            {errors.edad && <p className="text-sm text-red-500">{errors.edad.message}</p>}
          </div>

          {/* Sexo */}
          <div className="grid gap-4 sm:gap-2">
            <Label>Sexo</Label>
            <RadioGroup
              defaultValue="M"
              className="flex items-center w-full"
              onValueChange={(value) => setValue('sexo', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="M" id="M" />
                <Label htmlFor="M">Macho</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="H" id="H" />
                <Label htmlFor="H">Hembra</Label>
              </div>
            </RadioGroup>
            {errors.sexo && <p className="text-sm text-red-500">{errors.sexo.message}</p>}
          </div>
        </div>
      </div>

      {/* Error de carga */}
      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">
          Error al cargar las opciones. Por favor, intenta de nuevo.
        </div>
      )}

      {/* Error general */}
      {errors.root && <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">{errors.root.message}</div>}

      <div className="grid grid-cols-1 justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || loading}>
          {isSubmitting ? 'Registrando...' : 'Registrar Mascota'}
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <HeartPlus className="w-4 h-4" />}
        </Button>
      </div>
    </form>
  )
}
