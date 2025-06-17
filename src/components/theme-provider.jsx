import { useEffect, useState } from 'react'
import { ThemeProviderContext } from '@/contexts/theme-context'

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme', ...props }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    // If theme is not 'system', just add the class and we're done.
    if (theme !== 'system') {
      root.classList.add(theme)
      return
    }

    // If theme is 'system', we need to listen for OS changes.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = () => {
      // When the OS theme changes, update the class on the root.
      root.classList.remove('light', 'dark')
      root.classList.add(mediaQuery.matches ? 'dark' : 'light')
    }

    // Set the initial theme based on the OS preference.
    handleSystemThemeChange()

    // Add the event listener to react to future changes.
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    // Return a cleanup function to remove the listener.
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
