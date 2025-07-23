import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PawPrint } from 'lucide-react'
import { FormContent } from './FormContent'

export function PetsForm({ children, breeds, species, loading, error, onPetAdded }) {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const formContent = (
    <FormContent
      breeds={breeds}
      species={species}
      loading={loading}
      error={error}
      onPetAdded={onPetAdded}
      setIsOpen={setIsOpen}
    />
  )

  if (isDesktop) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!loading) {
            setIsOpen(open)
          }
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px] gap-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="gap-3">
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5" />
              <DialogTitle>Agregar Mascota</DialogTitle>
            </div>
            <DialogDescription>
              Llena la información de tu mascota para poder guardarla en tu perfil. Puedes agregar una imagen opcional.
            </DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-4 overflow-y-auto">
        <SheetHeader className="mb-4">
          <div className="flex items-center gap-4">
            <PawPrint className="w-4 h-4" />
            <SheetTitle>Agregar Mascota</SheetTitle>
          </div>
        </SheetHeader>
        {formContent}
      </SheetContent>
    </Sheet>
  )
}
