import { Currency } from '@/entities/currency-rates'

export type RateContextType = {
  rates: Currency[]
  isLoading: boolean
  error: string | null
  setRates: (rates: Currency[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}
