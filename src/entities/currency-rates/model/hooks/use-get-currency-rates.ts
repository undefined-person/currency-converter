import { fetchCurrentCurrencyRates } from '../api/fetch-currency-rates'
import { useRates } from '../rates-provider/rates-provider'

export const useGetCurrencyRates = () => {
  const { setRates, setIsLoading, setError } = useRates()

  const getCurrencyRates = async (currencyFrom: string, currencyTo?: string | string[]) => {
    setIsLoading(true)
    try {
      if (currencyTo) {
        if (Array.isArray(currencyTo)) {
          const promises = currencyTo.map((currency) => fetchCurrentCurrencyRates(currency))
          const responses = await Promise.all(promises)
          const rates = responses.reduce((acc, response) => {
            const currency = Object.keys(response.data).find((key) => key !== 'date')
            if (currency) {
              acc[currency] = response.data[currency][currencyFrom]
            }
            return acc
          }, {} as Record<string, number>)
          setRates(rates)
        } else {
          const response = await fetchCurrentCurrencyRates(currencyTo)
          const rates = {
            [currencyTo]: response.data[currencyTo][currencyFrom],
          }
          setRates(rates)
        }
      }
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

  return { getCurrencyRates }
}
