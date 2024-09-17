import { createContext, useContext, useState, ReactNode } from 'react'
import { CurrencyContextType } from './currency-context'

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const CurrenciesProvider = ({ children }: { children: ReactNode }) => {
  const [currencies, setCurrencies] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <CurrencyContext.Provider value={{ currencies, setCurrencies, isLoading, setIsLoading, error, setError }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrencies = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrencies must be used within a CurrenciesProvider')
  }
  return context
}
