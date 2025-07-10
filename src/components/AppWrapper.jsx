import { useMediaQuery } from '@/hooks/use-media-query'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { Analytics } from '@vercel/analytics/react'

export function AppWrapper({ children }) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <AuthProvider>
      <Toaster position={isMobile ? 'top-center' : 'bottom-right'} />
      {children}
      <Analytics debug={false} />
    </AuthProvider>
  )
}
