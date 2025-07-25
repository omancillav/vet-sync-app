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

function FormContent({ onPetAdded, setIsOpen, initialData = null, isEditMode = false }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const { loading, error } = useBreedSpecies()

  const form = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      nombre: initialData?.nombre || '',
      edad: initialData?.edad || '',
      sexo: initialData?.sexo || 'M',
      especie_id: initialData?.especie_id || '',
      raza_id: initialData?.raza_id || '',
      ...initialData
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
      if (onPetAdded) {
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

        await onPetAdded(data, imageToUpload)
        handleFormReset()
      }
    } catch (error) {
      console.error('Error al registrar la mascota:', error)
      setError('root', {
        message: 'Ocurrió un error al registrar la mascota. Inténtalo de nuevo.'
      })
    }
  }

  const handleFormReset = () => {
    reset()
    setSelectedImage(null)
    setIsOpen(false)
  }

  const handleCancel = () => {
    handleFormReset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-6">
        {/* Campo de Nombre */}
        <PetNameField control={control} error={errors.nombre} initialValues={{ nombre: initialData?.nombre }} />

        {/* Campo de Imagen */}
        <PetImageField
          control={control}
          error={errors.image}
          onImageChange={handleImageChange}
          onImageError={handleImageError}
          initialImage={initialData?.imagen_url}
        />

        {/* Campos de Especie y Raza */}
        <SpeciesBreedFields
          control={control}
          errors={{
            especie_id: errors.especie_id,
            raza_id: errors.raza_id
          }}
          initialValues={{
            especie_id: initialData?.especie_id,
            raza_id: initialData?.raza_id
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
            edad: initialData?.edad,
            sexo: initialData?.sexo
          }}
        />
      </div>

      {/* Error de carga */}
      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">
          Error al cargar las opciones. Por favor, intenta de nuevo.
        </div>
      )}

      {/* Error general */}
      {errors.root && <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">{errors.root.message}</div>}

      <div className="grid grid-cols-1 justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || loading}>
          {isSubmitting ? 'Registrando' : isEditMode ? 'Actualizar Mascota' : 'Registrar Mascota'}
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <HeartPlus className="w-4 h-4" />}
        </Button>
      </div>
    </form>
  )
}

export default FormContent
