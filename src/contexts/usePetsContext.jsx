import { useContext } from 'react'
import { PetsContext } from '@/contexts/PetsContext'

export function usePetsContext() {
  const context = useContext(PetsContext)
  if (!context) {
    throw new Error('usePetsContext must be used within a PetsProvider')
  }
  return context
}
