import { useState, useEffect } from 'react'
import { getBreeds, getSpecies } from '@/services/api/breeds'

// Variables globales para cache
let breedsData = null
let speciesData = null
let isInitialized = false
let initPromise = null

async function initializeData() {
  if (isInitialized) {
    return { breeds: breedsData, species: speciesData }
  }

  if (initPromise) {
    return initPromise
  }

  initPromise = Promise.all([
    getBreeds(),
    getSpecies()
  ]).then(([breedsResponse, speciesResponse]) => {
    breedsData = breedsResponse.data
    speciesData = speciesResponse.data
    isInitialized = true
    return { breeds: breedsData, species: speciesData }
  })

  return initPromise
}

export function useBreeds() {
  const [breeds, setBreeds] = useState(breedsData || [])
  const [species, setSpecies] = useState(speciesData || [])
  const [loading, setLoading] = useState(!isInitialized)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isInitialized) {
      setBreeds(breedsData)
      setSpecies(speciesData)
      setLoading(false)
      return
    }

    initializeData()
      .then(({ breeds, species }) => {
        setBreeds(breeds)
        setSpecies(species)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading breeds/species:', err)
        setError(err)
        setLoading(false)
      })
  }, [])

  return {
    breeds,
    species,
    loading,
    error
  }
}
