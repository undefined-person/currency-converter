import { $api } from '@/shared/api/api'

export const fetchCurrencies = async () => {
  // add timeout to simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return await $api.get('/currencies.min.json')
}
