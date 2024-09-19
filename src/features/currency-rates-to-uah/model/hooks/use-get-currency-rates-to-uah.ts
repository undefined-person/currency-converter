import { fetchCurrentCurrencyRates } from '@/entities/currency-rates'
import { useState } from 'react'

export const useGetCurrencyRatesToUAH = () => {
  const [rates, setRates] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrencyRatesToUAH = async (currency: string[]) => {
    try {
      setIsLoading(true)

      const promises = currency.map((currency) => fetchCurrentCurrencyRates(currency))

      const responses = await Promise.all(promises)

      const rates = responses.reduce((acc, response) => {
        const currency = Object.keys(response.data).find((key) => key !== 'date')

        if (currency) {
          acc[currency] = response.data[currency].uah
        }

        return acc
      }, {} as Record<string, number>)

      setRates(rates)
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

  return { rates, isLoading, error, getCurrencyRatesToUAH }
}
