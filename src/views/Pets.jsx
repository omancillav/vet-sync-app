import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoPets } from '@/components/pets/NoPets'
import { getPets } from '@/services/api/pets'

export function Pets() {
  const [pets, setPets] = useState([])
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchPets = async () => {
      try {
        const newPets = await getPets()
        console.log(newPets)
        setPets(newPets)
      } catch (err) {
        console.error('Failed to fetch pets:', err)
      }
    }

    fetchPets()
  }, [isAuthenticated])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Mascotas</h1>
          <p className="text-muted-foreground">Gestiona la información de todas tus mascotas</p>
        </div>

        {isAuthenticated ? (
          pets.length === 0 ? (
            <NoPets
              onAddPet={() => {
                /* TODO: open create pet modal */
              }}
            />
          ) : (
            // TODO: render pets list here once data is fetched
            <div>{/* Aquí irá la lista de mascotas */}</div>
          )
        ) : (
          <AuthPrompt icon="🐾" message="Debes iniciar sesión para registrar tus mascotas" />
        )}
      </div>
    </div>
  )
}
