import { createContext, useReducer, useCallback } from 'react'

// 1. Crear el contexto
const PetFormContext = createContext(undefined)

// Estado inicial
const initialState = {
  formData: {
    nombre: '',
    edad: '',
    sexo: 'M',
    especie_id: '',
    raza_id: ''
  },
  isEditMode: false,
  currentPetId: null,
  loading: false,
  error: null,
  species: [],
  breeds: [],
  filteredBreeds: []
}

// 2. Crear el reducer para manejar el estado
function petFormReducer(state, action) {
  switch (action.type) {
  case 'SET_FIELD':
    return {
      ...state,
      formData: {
        ...state.formData,
        [action.field]: action.value
      }
    }

  case 'SET_SPECIES':
    return {
      ...state,
      species: action.payload,
      loading: false
    }

  case 'SET_BREEDS':
    return {
      ...state,
      breeds: action.payload,
      filteredBreeds: action.payload,
      loading: false
    }

  case 'FILTER_BREEDS':
    return {
      ...state,
      filteredBreeds: state.breeds.filter((breed) => breed.especie_id === action.speciesId),
      formData: {
        ...state.formData,
        raza_id: ''
      }
    }

  case 'SET_EDIT_MODE':
    return {
      ...state,
      isEditMode: true,
      currentPetId: action.payload.id,
      formData: {
        ...state.formData,
        ...action.payload
      },
      loading: false
    }

  case 'SET_LOADING':
    return {
      ...state,
      loading: action.payload
    }

  case 'SET_ERROR':
    return {
      ...state,
      error: action.payload,
      loading: false
    }

  case 'RESET':
    return {
      ...initialState,
      species: state.species,
      breeds: state.breeds
    }

  default:
    return state
  }
}

// 3. Crear el proveedor del contexto
export function PetFormProvider({ children }) {
  const [state, dispatch] = useReducer(petFormReducer, initialState)

  const setField = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })

    if (field === 'especie_id') {
      dispatch({ type: 'FILTER_BREEDS', speciesId: value })
    }
  }, [])

  const setSpecies = useCallback((species) => {
    dispatch({ type: 'SET_SPECIES', payload: species })
  }, [])
  const setBreeds = useCallback((breeds) => {
    dispatch({ type: 'SET_BREEDS', payload: breeds })
  }, [])

  const setEditMode = useCallback((petData) => {
    dispatch({
      type: 'SET_EDIT_MODE',
      payload: petData
    })

    if (petData.especie_id) {
      dispatch({
        type: 'FILTER_BREEDS',
        speciesId: petData.especie_id
      })
    }
  }, [])

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading })
  }, [])
  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }, [])

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const contextValue = {
    ...state,
    setField,
    setSpecies,
    setBreeds,
    setEditMode,
    setLoading,
    setError,
    reset: resetForm
  }

  return <PetFormContext.Provider value={contextValue}>{children}</PetFormContext.Provider>
}

export { PetFormContext }
