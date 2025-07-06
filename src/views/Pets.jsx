import { useAuth } from '@/contexts/auth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoPets } from '@/components/pets/NoPets'
import { usePets } from '@/hooks/usePets'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorCard } from '@/components/ErrorCard'
import { PetsCard } from '@/components/pets/PetsCard'

export function Pets() {
  const { pets, loading, error } = usePets()
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

    if (pets.length === 0) {
      return (
        <NoPets
          onAddPet={() => {
            /* TODO: open create pet modal */
          }}
        />
      )
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {pets.map((pet) => (
            <PetsCard pet={pet} />
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Mascotas</h1>
          <p className="text-muted-foreground">Gestiona la información de todas tus mascotas</p>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}
