import { useState } from 'react'
import { fetchCurrentCurrencyRates } from '../api/fetch-currency-rates'
import { Currency } from '../types/currency'

export const useGetCurrencyRates = () => {
  const [currencyRates, setCurrencyRates] = useState<Currency[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrencyRates = async () => {
    setIsLoading(true)
    try {
      const response = await fetchCurrentCurrencyRates()
      setCurrencyRates(response.data)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(String(error))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { currencyRates, isLoading, error, getCurrencyRates }
}
