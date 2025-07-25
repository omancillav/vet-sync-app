import { useContext } from 'react'
import { BreedSpeciesContext } from './BreedSpeciesContext'

export function useBreedSpecies() {
  const context = useContext(BreedSpeciesContext)
  if (context === undefined) {
    throw new Error('useBreedSpecies debe usarse dentro de un BreedSpeciesProvider')
  }
  return context
}
