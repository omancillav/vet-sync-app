import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { petSchema } from '@/schemas/petSchema'
import { LoaderCircle, HeartPlus } from 'lucide-react'
import { processImage } from '@/services/processImage'
import { PetNameField } from './fields/PetNameField'
import { PetImageField } from './fields/PetImageField'
import { SpeciesBreedFields } from './fields/SpeciesBreedFields'
import { AgeSexFields } from './fields/AgeSexFields'
import { useBreedSpecies } from '@/contexts/useBreedSpecies'
import { usePetsContext } from '@/contexts/PetsContext'

function FormContent() {
  const [selectedImage, setSelectedImage] = useState(null)
  const { loading: breedLoading, error: breedError } = useBreedSpecies()
  const { formState, submitForm, closeForm, loading } = usePetsContext()

  const { mode, selectedPet } = formState
  const isEditMode = mode === 'edit'

  const form = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      nombre: selectedPet?.nombre || '',
      edad: selectedPet?.edad || '',
      sexo: selectedPet?.sexo || 'M',
      especie_id: selectedPet?.especie_id || '',
      raza_id: selectedPet?.raza_id || ''
    }
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    control
  } = form

  const handleImageChange = (file) => {
    setSelectedImage(file)
  }

  const handleImageError = (errorMessage) => {
    setError('image', { message: errorMessage })
  }

  const onSubmit = async (data) => {
    try {
      let imageToUpload = null

      if (selectedImage) {
        try {
          const processedImage = await processImage(selectedImage)
          imageToUpload = new File([processedImage], selectedImage.name.replace(/\.[^/.]+$/, '.webp'), {
            type: 'image/webp'
          })
        } catch (imageError) {
          console.error('Error al procesar la imagen:', imageError)
          setError('image', {
            message: 'Error al procesar la imagen. Por favor, intenta con otra imagen.'
          })
          return
        }
      }

      await submitForm(data, imageToUpload)
      handleFormReset()
    } catch (error) {
      console.error('Error al procesar la mascota:', error)
      setError('root', {
        message: `Ocurrió un error al ${isEditMode ? 'actualizar' : 'registrar'} la mascota. Inténtalo de nuevo.`
      })
    }
  }

  const handleFormReset = () => {
    reset()
    setSelectedImage(null)
  }

  const handleCancel = () => {
    handleFormReset()
    closeForm()
  }
  console.log(selectedPet)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-6">
        {/* Campo de Nombre */}
        <PetNameField control={control} error={errors.nombre} initialValues={{ nombre: selectedPet?.nombre }} />

        {/* Campo de Imagen */}
        <PetImageField
          control={control}
          error={errors.image}
          onImageChange={handleImageChange}
          onImageError={handleImageError}
          initialImage={selectedPet?.img_url}
        />

        {/* Campos de Especie y Raza */}
        <SpeciesBreedFields
          control={control}
          errors={{
            especie_id: errors.especie_id,
            raza_id: errors.raza_id
          }}
          initialValues={{
            nombre_especie: selectedPet?.nombre_especie,
            nombre_raza: selectedPet?.nombre_raza
          }}
        />

        {/* Campos de Edad y Sexo */}
        <AgeSexFields
          control={control}
          errors={{
            edad: errors.edad,
            sexo: errors.sexo
          }}
          initialValues={{
            edad: selectedPet?.edad,
            sexo: selectedPet?.sexo
          }}
        />
      </div>

      {/* Error de carga */}
      {breedError && (
        <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">
          Error al cargar las opciones. Por favor, intenta de nuevo.
        </div>
      )}

      {/* Error general */}
      {errors.root && <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">{errors.root.message}</div>}

      <div className="grid grid-cols-1 justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting || loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || loading || breedLoading}>
          {isSubmitting
            ? isEditMode
              ? 'Actualizando'
              : 'Registrando'
            : isEditMode
              ? 'Actualizar Mascota'
              : 'Registrar Mascota'}
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <HeartPlus className="w-4 h-4" />}
        </Button>
      </div>
    </form>
  )
}

export default FormContent
