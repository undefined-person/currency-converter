import { createContext, useContext, useState, ReactNode } from 'react'
import { RateContextType } from './rates-context'
import { Currency } from '@/entities/currency-rates'

const RatesContext = createContext<RateContextType | undefined>(undefined)

export const RatesProvider = ({ children }: { children: ReactNode }) => {
  const [rates, setRates] = useState<Currency[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <RatesContext.Provider value={{ rates, setRates, isLoading, setIsLoading, error, setError }}>
      {children}
    </RatesContext.Provider>
  )
}

export const useRates = () => {
  const context = useContext(RatesContext)
  if (!context) {
    throw new Error('useRates must be used within a RatesProvider')
  }
  return context
}
