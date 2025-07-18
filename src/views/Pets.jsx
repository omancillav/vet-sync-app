import { useAuth } from '@/contexts/auth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoPets } from '@/components/pets/NoPets'
import { usePets } from '@/hooks/usePets'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorCard } from '@/components/ErrorCard'
import { PetsCard } from '@/components/pets/card/PetsCard'
import { Button } from '@/components/ui/button'
import { Plus, LoaderCircle } from 'lucide-react'
import { PetsForm } from '@/components/pets/form/PetsForm'
import { useBreeds } from '@/hooks/useBreeds'

export function Pets() {
  const { pets, loading, error, noPets, deletePet, addPet } = usePets()
  const { breeds, species, loading: breedsLoading, error: breedsError } = useBreeds()
  const { isAuthenticated } = useAuth()

  const renderContent = () => {
    if (!isAuthenticated) {
      return <AuthPrompt icon="🐾" message="Debes iniciar sesión para ver tus mascotas" />
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      )
    }

    if (error) {
      return <ErrorCard message="No se pudieron cargar tus mascotas. Inténtalo de nuevo." />
    }

    if (noPets) return <NoPets />

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {pets.map((pet) => (
            <PetsCard key={pet.id} pet={pet} deletePet={deletePet}/>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end mb-4 md:mb-8">
          <section className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mis Mascotas</h1>
            <p className="text-muted-foreground">Gestiona la información de todas tus mascotas</p>
          </section>
          <section className="w-full md:w-1/2 md:flex md:justify-end">
            {isAuthenticated && (
              <PetsForm
                breeds={breeds}
                species={species}
                loading={breedsLoading}
                error={breedsError}
                onPetAdded={async (petData) => {
                  await addPet(petData)
                  // No es necesario llamar a fetchPets aquí porque addPet ya actualiza el estado local
                }}
              >
                <Button className="w-full md:w-auto" disabled={breedsLoading || breedsError}>
                  {breedsLoading ? '' : 'Agregar Mascota'}
                  {breedsLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 ml-2" />
                  )}
                </Button>
              </PetsForm>
            )}
          </section>
        </div>
        {renderContent()}
      </div>
    </div>
  )
}
