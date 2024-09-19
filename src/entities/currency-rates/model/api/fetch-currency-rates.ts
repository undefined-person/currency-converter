import { $api } from '@/shared/api/api'

type FetchCurrencyRatesResponse = {
  date: string
} & {
  [currency: string]: Record<string, number>
}

export const fetchCurrentCurrencyRates = async (currency: string) => {
  // add timeout to simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return await $api.get<FetchCurrencyRatesResponse>(`/currencies/${currency}.json`)
}
