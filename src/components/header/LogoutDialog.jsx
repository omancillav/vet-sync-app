import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] z-[200]">
          <DialogHeader>
            <DialogTitle className="font-semibold text-xl">¿Estás seguro que deseas cerrar sesión?</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-md">
            Si cierras sesión, perderás el acceso a tus datos y tendrás que iniciar sesión de nuevo para acceder a ellos.
          </DialogDescription>
          <DialogFooter className="pt-4 gap-4">
            <Button variant="secondary" className='text-md' onClick={() => setOpen(false)}>
              Cancelar
              <CircleX className="h-4 w-4" />
            </Button>
            <Button variant="destructive" className='text-md' onClick={handleConfirm}>
              Cerrar sesión
              <ArrowRightToLine className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="z-[200]">
        <DrawerHeader className="text-left">
          <DrawerTitle>¿Estás seguro que deseas cerrar sesión?</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="pt-4 gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancelar
            <CircleX className="h-4 w-4" />
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Cerrar sesión
            <ArrowRightToLine className="h-4 w-4" />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
