import { createContext, useState } from 'react'

interface ThemeContextType {
  isDarkmode: boolean
  togglekMode: () => void
}

const InitialState: ThemeContextType = {
  isDarkmode: true,
  togglekMode: function (): void {
    throw new Error('Function not implemented.')
  }
}

const ThemeContext = createContext(InitialState)

interface Props {
  children: JSX.Element
}

const ThemeProvider = ({ children }: Props) => {
  const [isDarkmode, setIsDarkmode] = useState(true)
  const togglekMode = () => { setIsDarkmode(!isDarkmode) }

  return (
    <ThemeContext.Provider value={{ isDarkmode, togglekMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
