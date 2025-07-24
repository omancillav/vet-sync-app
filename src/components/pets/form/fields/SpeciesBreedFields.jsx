import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useBreedSpecies } from '@/contexts/useBreedSpecies'
import { usePetForm } from '@/contexts/UsePetForm'

export function SpeciesBreedFields() {
  const [breedComboOpen, setBreedComboOpen] = useState(false)
  const [selectedBreed, setSelectedBreed] = useState(null)

  const { formData, setField } = usePetForm()
  const { breeds, species, loading, error } = useBreedSpecies()

  // Obtener la especie seleccionada
  const selectedSpeciesId = formData?.especie_id

  // Filtrar razas según la especie seleccionada
  const filteredBreeds = selectedSpeciesId
    ? breeds.filter((breed) => breed.especie_id === Number(selectedSpeciesId))
    : []

  // Resetear raza cuando se cambia la especie
  useEffect(() => {
    if (selectedSpeciesId && selectedBreed?.especie_id !== Number(selectedSpeciesId)) {
      setSelectedBreed(null)
      setField('raza_id', '')
    }
  }, [selectedSpeciesId, selectedBreed, setField])

  // Establecer raza inicial si existe
  useEffect(() => {
    if (formData?.raza_id && breeds.length > 0 && !selectedBreed) {
      const initialBreed = breeds.find((breed) => breed.id === formData.raza_id)
      if (initialBreed) {
        setSelectedBreed(initialBreed)
      }
    }
  }, [formData?.raza_id, breeds, selectedBreed])

  const handleBreedSelect = (breedId) => {
    const breed = breeds.find((b) => b.id === breedId)
    setSelectedBreed(breed)
    setField('raza_id', breedId)
    setBreedComboOpen(false)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Especie</Label>
          <div className="h-10 w-full rounded-md border border-input bg-muted animate-pulse" />
        </div>
        <div className="space-y-2">
          <Label>Raza</Label>
          <div className="h-10 w-full rounded-md border border-input bg-muted animate-pulse" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-destructive text-sm p-2 border border-destructive rounded-md">
        Error al cargar las especies y razas. Intenta recargar la página.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {/* Especie */}
      <div className="space-y-2">
        <Label htmlFor="especie_id">Especie</Label>
        <Select
          value={formData?.especie_id || ''}
          onValueChange={(value) => setField('especie_id', value)}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una especie" />
          </SelectTrigger>
          <SelectContent>
            {species.map((specie) => (
              <SelectItem key={specie.id} value={String(specie.id)}>
                {specie.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Raza */}
      <div className="space-y-2">
        <Label htmlFor="raza_id">Raza</Label>
        <Popover open={breedComboOpen} onOpenChange={setBreedComboOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'w-full justify-between',
                !formData?.raza_id && 'text-muted-foreground'
              )}
              disabled={!selectedSpeciesId || loading}
            >
              {selectedBreed ? (
                <span className="truncate">{selectedBreed.nombre}</span>
              ) : (
                'Selecciona una raza'
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Buscar raza..." />
              <CommandEmpty>No se encontraron razas</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {filteredBreeds.map((breed) => (
                    <CommandItem
                      key={breed.id}
                      value={breed.nombre}
                      onSelect={() => handleBreedSelect(breed.id)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          formData?.raza_id === breed.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {breed.nombre}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
