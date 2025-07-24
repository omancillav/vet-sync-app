import { useState } from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PetImage } from './PetImage'
import { Calendar1, Mars, Venus, UserRound } from 'lucide-react'
import { ActionMenu } from './ActionMenu'
import { PetsForm } from '../form/PetsForm'

export function PetsCard({ pet, deletePet, onPetUpdated, updatePet, species = [], breeds = [], loading = false, error = null }) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handlePetUpdated = async (petId, petData, imageFile) => {
    try {
      await updatePet(petId, petData, imageFile)
      setIsEditOpen(false)
      onPetUpdated?.()
    } catch (error) {
      console.error('Error updating pet:', error)
    }
  }

  return (
    <>
      <Card className="overflow-hidden relative">
        <div className="absolute top-4 right-4">
          <ActionMenu
            pet={pet}
            deletePet={deletePet}
            onEdit={() => {
              setIsEditOpen(true)
            }}
          />
        </div>
        <CardContent className="flex lg:flex-row flex-col gap-3 lg:gap-6">
          {/* Desktop layout */}
          <div className="hidden lg:flex items-center">
            <PetImage className="w-40 aspect-square object-cover rounded-full" src={pet.img_url} alt={pet.nombre} />
          </div>

          {/* Mobile layout */}
          <div className="flex lg:hidden items-center gap-4">
            <PetImage
              className="w-22 aspect-square object-cover rounded-full flex-shrink-0"
              src={pet.img_url}
              alt={pet.nombre}
            />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg">{pet.nombre}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {pet.nombre_especie} • {pet.nombre_raza}
              </p>
            </div>
          </div>

          <div className="flex flex-col py-2 gap-4 flex-1">
            {/* Desktop header */}
            <header className="hidden lg:block">
              <CardTitle className="text-xl">{pet.nombre}</CardTitle>
              <p className="text-base text-muted-foreground">
                {pet.nombre_especie} • {pet.nombre_raza}
              </p>
            </header>

            <div className="flex flex-wrap gap-2 px-1 lg:px-0 justify-between lg:justify-start">
              <div className="flex items-center gap-2">
                <Calendar1 className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                {pet.edad} años
              </div>

              <div className="flex items-center gap-2">
                {pet.sexo === 'M' ? (
                  <Mars className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <Venus className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                )}
                {pet.sexo === 'M' ? 'Macho' : 'Hembra'}
              </div>

              <div className="flex items-center gap-2">
                <UserRound className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                {pet.nombre_cliente ? pet.nombre_cliente.split(' ')[0] : 'Sin dueño'}
              </div>
            </div>

            <div>
              <Badge className="bg-sky-100 text-sky-800 rounded-lg px-3 py-1 text-sm font-normal w-full">
                {pet.sexo === 'M' ? 'Registrado' : 'Registrada'} el{' '}
                {new Date(pet.fecha_registro).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Pet Form */}
      <PetsForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        isEditMode={true}
        initialData={{
          ...pet,
          // Map the pet data to match the form field names
          especie_id: pet.especie_id?.toString(),
          raza_id: pet.raza_id?.toString(),
          imagen_url: pet.imagen_url || pet.img_url // Handle both img_url and imagen_url for backward compatibility
        }}
        species={species}
        breeds={breeds}
        loading={loading}
        error={error}
        onPetUpdated={handlePetUpdated}
      />
    </>
  )
}
