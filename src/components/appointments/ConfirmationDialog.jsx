import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger
} from '@/components/ui/drawer'
import { CircleCheck, Calendar, LoaderCircle } from 'lucide-react'

export function ConfirmationDialog({ children, onConfirm }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
      setOpen(false)
    } catch (error) {
      console.error('Error al agendar la cita:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px] z-[200] flex flex-col gap-3">
          <AlertDialogHeader>
            <div className="flex justify-center mb-2">
              <CircleCheck className="w-24 h-24 text-green-500/80" />
            </div>
            <AlertDialogTitle className="font-semibold text-xl">
              ¿Confirmas que deseas agendar esta cita?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-md">
            Revisa que todos los datos sean correctos antes de confirmar la cita.
          </AlertDialogDescription>
          <AlertDialogFooter className="pt-4 gap-3">
            <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
              Revisar
            </Button>
            <Button className="text-md w-28 " onClick={handleConfirm} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Agendar
                  <Calendar className="w-4 h-4" />{' '}
                </span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="z-[200] w-full flex flex-col gap-3">
        <div className="mx-auto w-full max-w-[600px] px-4">
          <DrawerHeader className="px-0 text-center">
            <div className="flex justify-center mb-2">
              <CircleCheck className="w-20 h-20 text-green-500/80" />
            </div>
            <DrawerTitle className="text-lg font-semibold text-center">
              ¿Confirmas que deseas agendar esta cita?
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="text-md text-center">
            Revisa que todos los datos sean correctos antes de confirmar la cita.
          </DrawerDescription>
          <DrawerFooter className="px-0 pt-6 gap-3">
            <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
              Revisar
            </Button>
            <Button className="text-md" onClick={handleConfirm} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Agendar
                  <Calendar className="w-4 h-4" />{' '}
                </span>
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
