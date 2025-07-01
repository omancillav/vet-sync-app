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
import { ArrowRightToLine, CircleX } from 'lucide-react'

export function LogoutDialog({ children, onConfirm, open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px] z-[200]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-semibold text-xl">
              ¿Estás seguro que deseas cerrar sesión?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-md">
            Perderás acceso a tus datos. Inicia sesión de nuevo para acceder a ellos.
          </AlertDialogDescription>
          <AlertDialogFooter className="pt-4 gap-4">
            <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
              Cancelar
              <CircleX className="h-4 w-4" />
            </Button>
            <Button variant="destructive" className="text-md" onClick={handleConfirm}>
              Cerrar sesión
              <ArrowRightToLine className="h-4 w-4" />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="z-[200]">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-semibold">¿Estás seguro que deseas cerrar sesión?</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="text-md mx-4 text-center">
          Perderás acceso a tus datos. Inicia sesión de nuevo para acceder a ellos.
        </DrawerDescription>
        <DrawerFooter className="pt-4 gap-2">
          <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
            Cancelar
            <CircleX className="h-4 w-4" />
          </Button>
          <Button variant="destructive" className="text-md" onClick={handleConfirm}>
            Cerrar sesión
            <ArrowRightToLine className="h-4 w-4" />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
