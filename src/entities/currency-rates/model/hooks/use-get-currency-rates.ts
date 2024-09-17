import { fetchCurrentCurrencyRates } from '../api/fetch-currency-rates'
import { useRates } from '@/app/providers/rates-provider/rates-provider'

export const useGetCurrencyRates = () => {
  const { setRates, setIsLoading, setError } = useRates()

  const getCurrencyRates = async () => {
    setIsLoading(true)
    try {
      const response = await fetchCurrentCurrencyRates()
      setRates(response.data)
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
