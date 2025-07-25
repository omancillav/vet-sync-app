import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function PetNameField({ control, error, initialValues = {} }) {
  return (
    <div className="grid gap-2 w-full">
      <Label htmlFor="nombre">Nombre</Label>
      <Controller
        name="nombre"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="nombre"
            type="text"
            placeholder="Nombre de la mascota"
            className={`text-sm ${error ? 'border-red-500' : ''}`}
            defaultValue={initialValues.nombre}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}
