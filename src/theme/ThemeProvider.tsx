import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'onboarding' | 'manage'

type ThemeContextValue = {
  theme: Theme
  toggle: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('onboarding')

  const setTheme = (t: Theme) => {
    setThemeState(t)
  }

  const toggle = () => {
    setThemeState(t => (t === 'onboarding' ? 'manage' : 'onboarding'))
  }

  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}