import { useContext } from 'react'
import { PetFormContext } from '@/contexts/PetFormContext'

export function usePetForm() {
  const context = useContext(PetFormContext)

  if (context === undefined) {
    throw new Error('usePetForm debe ser usado dentro de un PetFormProvider')
  }

  return context
}
