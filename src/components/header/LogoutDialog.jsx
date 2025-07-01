import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

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
            <DialogTitle>¿Estás seguro que deseas cerrar sesión?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>Cerrar sesión</Button>
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
        <DrawerFooter className="pt-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Cerrar sesión</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
