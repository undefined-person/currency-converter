import { $api } from '@/shared/api/api'

import type { Currency } from '../types/currency'

export const fetchCurrentCurrencyRates = async () => {
  // add timeout to simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return await $api.get<Currency[]>('')
}
