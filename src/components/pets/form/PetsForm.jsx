import { useState, lazy, Suspense } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PawPrint } from 'lucide-react'
import { BreedSpeciesProvider } from '@/contexts/BreedSpeciesContext'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const LazyFormContent = lazy(() => import('./FormContent'))

export function PetsForm({ children, onPetAdded }) {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const formContent = (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      }
    >
      <LazyFormContent onPetAdded={onPetAdded} setIsOpen={setIsOpen} />
    </Suspense>
  )

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        {isOpen && (
          <BreedSpeciesProvider>
            <DialogContent className="sm:max-w-[500px] gap-8 max-h-[98vh] overflow-y-auto">
              <DialogHeader className="gap-3">
                <div className="flex items-center gap-2">
                  <PawPrint className="w-5 h-5" />
                  <DialogTitle>Agregar Mascota</DialogTitle>
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      {isOpen && (
        <BreedSpeciesProvider>
          <SheetContent className="p-4 overflow-y-auto">
            <SheetHeader>
              <div className="flex items-center gap-4">
                <PawPrint className="w-4 h-4" />
                <SheetTitle>Agregar Mascota</SheetTitle>
              </div>
            </SheetHeader>
            {formContent}
          </SheetContent>
        </BreedSpeciesProvider>
      )}
    </Sheet>
  )
}
