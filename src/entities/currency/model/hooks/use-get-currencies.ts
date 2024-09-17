import { fetchCurrencies } from '../api/fetch-currencies'
import { useCurrencies } from '../currency-provider/currency-provider'

export const useGetCurrencies = () => {
  const { setCurrencies, setError, setIsLoading } = useCurrencies()

  const getCurrencies = async () => {
    setIsLoading(true)
    try {
      const { data } = await fetchCurrencies()

      setCurrencies(data)
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

  return { getCurrencies }
}
