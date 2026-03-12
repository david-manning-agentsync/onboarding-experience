import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'onboarding' | 'manage'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'onboarding',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('onboarding')

  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{ theme, toggle: () => setTheme(t => (t === 'onboarding' ? 'manage' : 'onboarding')) }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
