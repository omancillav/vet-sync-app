import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PawPrint } from 'lucide-react'
import { FormContent } from './FormContent'

export function PetsForm({
  children,
  breeds,
  species,
  loading,
  error,
  onPetAdded,
  onPetUpdated,
  initialData = null,
  isEditMode = false,
  isOpen: isOpenProp,
  onOpenChange: onOpenChangeProp
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const isOpen = isOpenProp !== undefined ? isOpenProp : internalIsOpen
  const setIsOpen = (open) => {
    if (onOpenChangeProp) {
      onOpenChangeProp(open)
    } else {
      setInternalIsOpen(open)
    }
  }

  const formTitle = isEditMode ? 'Editar Mascota' : 'Agregar Mascota'

  const formContent = (
    <FormContent
      breeds={breeds}
      species={species}
      loading={loading}
      error={error}
      onPetAdded={onPetAdded}
      onPetUpdated={onPetUpdated}
      setIsOpen={setIsOpen}
      initialData={initialData}
      isEditMode={isEditMode}
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
        <DialogContent className="sm:max-w-[500px] gap-8 max-h-[98vh] overflow-y-auto">
          <DialogHeader className="gap-3">
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5" />
              <DialogTitle>{formTitle}</DialogTitle>
            </div>
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
        <SheetHeader>
          <div className="flex items-center gap-4">
            <PawPrint className="w-4 h-4" />
            <SheetTitle>{formTitle}</SheetTitle>
          </div>
        </SheetHeader>
        {formContent}
      </SheetContent>
    </Sheet>
  )
}
