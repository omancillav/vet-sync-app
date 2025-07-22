import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App.jsx'
import '@/styles/index.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AppWrapper } from '@/app/AppWrapper'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
)
