import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { petSchema } from '@/schemas/petSchema'
import { PawPrint, LoaderCircle } from 'lucide-react'

export function PetsForm({ children, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue
  } = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      edad: '',
      sexo: 'M'
    }
  })

  const onSubmit = async (data) => {
    try {
      console.log('Datos de la mascota:', data)
      // Aquí iría la llamada a la API
      // await createPet(data)
      setIsOpen(false)
      reset()
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error al registrar la mascota:', error)
      setError('root', {
        message: 'Ocurrió un error al registrar la mascota. Inténtalo de nuevo.'
      })
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4">
        {/* Nombre */}
        <div className="grid gap-2 w-full">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            type="text"
            placeholder="Nombre de la mascota"
            {...register('nombre')}
            className={errors.nombre ? 'border-red-500' : ''}
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
        </div>

        {/* Cliente ID (oculto, se establecerá desde el contexto) */}
        <input type="hidden" {...register('cliente_id')} value="1" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {/* Especie */}
          <div className="grid gap-2 w-full">
            <Label htmlFor="especie_id">Especie</Label>
            <Select
              onValueChange={(value) => setValue('especie_id', Number(value))}
            >
              <SelectTrigger className={`w-full ${errors.especie_id ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Selecciona una especie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Perro</SelectItem>
                <SelectItem value="2">Gato</SelectItem>
                <SelectItem value="3">Ave</SelectItem>
              </SelectContent>
            </Select>
            {errors.especie_id && <p className="text-sm text-red-500">{errors.especie_id.message}</p>}
          </div>

          {/* Raza */}
          <div className="grid gap-2 w-full">
            <Label htmlFor="raza_id">Raza</Label>
            <Select
              onValueChange={(value) => setValue('raza_id', Number(value))}
            >
              <SelectTrigger className={`w-full ${errors.raza_id ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Selecciona una raza" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Labrador</SelectItem>
                <SelectItem value="2">Pastor Alemán</SelectItem>
                <SelectItem value="3">Siamés</SelectItem>
                <SelectItem value="4">Persa</SelectItem>
              </SelectContent>
            </Select>
            {errors.raza_id && <p className="text-sm text-red-500">{errors.raza_id.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Edad */}
          <div className="grid gap-2">
            <Label htmlFor="edad">Edad (años)</Label>
            <Input
              id="edad"
              type="number"
              placeholder="Edad en años"
              {...register('edad', { valueAsNumber: true })}
              className={errors.edad ? 'border-red-500' : ''}
            />
            {errors.edad && <p className="text-sm text-red-500">{errors.edad.message}</p>}
          </div>

          {/* Sexo */}
          <div className="grid gap-4 sm:gap-2">
            <Label>Sexo</Label>
            <RadioGroup
              defaultValue="M"
              className="flex items-center w-full"
              onValueChange={(value) => setValue('sexo', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="M" id="M" />
                <Label htmlFor="M">Macho</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="H" id="H" />
                <Label htmlFor="H">Hembra</Label>
              </div>
            </RadioGroup>
            {errors.sexo && <p className="text-sm text-red-500">{errors.sexo.message}</p>}
          </div>
        </div>
      </div>

      {/* Error general */}
      {errors.root && <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">{errors.root.message}</div>}

      <div className="grid grid-cols-1 justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset()
            setIsOpen(false)
          }}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar Mascota'}
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <PawPrint className="w-4 h-4" />}
        </Button>
      </div>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px] gap-8">
          <DialogHeader>
            <DialogTitle>Agregar Mascota</DialogTitle>
            <DialogDescription>Llena la información de tu mascota para poder guardarla en tu perfil.</DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader>
          <SheetTitle>Agregar Mascota</SheetTitle>
        </SheetHeader>
        {formContent}
      </SheetContent>
    </Sheet>
  )
}
