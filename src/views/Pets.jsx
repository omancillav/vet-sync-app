import { useAuth } from '@/contexts/auth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoPets } from '@/components/pets/NoPets'

export function Pets() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Mascotas</h1>
          <p className="text-muted-foreground">Gestiona la información de todas tus mascotas</p>
        </div>

        {isAuthenticated ? (
          <NoPets onAddPet={() => {/* TODO: open create pet modal */}} />
        ) : (
          <AuthPrompt
            icon="🐾"
            message="Debes iniciar sesión para ver tus mascotas"
          />
        )}
      </div>
    </div>
  )
}
