import { lazy, Suspense } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { PawPrint } from 'lucide-react'
import { BreedSpeciesProvider } from '@/contexts/BreedSpeciesContext'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { usePetsContext } from '@/contexts/PetsContext'

const LazyFormContent = lazy(() => import('./FormContent'))

export function PetsForm() {
  const { formState, closeForm } = usePetsContext()
  const { isOpen, mode } = formState
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const isEditMode = mode === 'edit'
  const title = isEditMode ? 'Editar Mascota' : 'Agregar Mascota'

  const formContent = (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      }
    >
      <LazyFormContent />
    </Suspense>
  )

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={closeForm}>
        {isOpen && (
          <BreedSpeciesProvider>
            <DialogContent className="sm:max-w-[500px] gap-8 max-h-[98vh] overflow-y-auto">
              <DialogHeader className="gap-3">
                <div className="flex items-center gap-2">
                  <PawPrint className="w-5 h-5" />
                  <DialogTitle>{title}</DialogTitle>
                </div>
              </DialogHeader>
              {formContent}
            </DialogContent>
          </BreedSpeciesProvider>
        )}
      </Dialog>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeForm}>
      {isOpen && (
        <BreedSpeciesProvider>
          <SheetContent className="p-4 overflow-y-auto">
            <SheetHeader>
              <div className="flex items-center gap-4">
                <PawPrint className="w-4 h-4" />
                <SheetTitle>{title}</SheetTitle>
              </div>
            </SheetHeader>
            {formContent}
          </SheetContent>
        </BreedSpeciesProvider>
      )}
    </Sheet>
  )
}
