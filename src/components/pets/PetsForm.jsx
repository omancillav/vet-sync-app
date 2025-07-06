import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export function PetsForm({ children, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
    setIsOpen(false)
    if (onSuccess) onSuccess()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Mascota</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="species">Especie</Label>
              <Select name="species" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una especie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Perro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                  <SelectItem value="other">Otra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="breed">Raza</Label>
              <Input id="breed" name="breed" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
              <Input id="birthdate" name="birthdate" type="date" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notas</Label>
              <Input id="notes" name="notes" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar Mascota</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
