import { useEffect, useState } from 'react'

import { useCurrencies, useGetCurrencies } from '@/entities/currency'
import { formatObjectToOptions } from '@/shared/utils/format-object-to-options'

import type { Option } from '@/shared/types/option'

export const useCurrencyOptions = () => {
  const { getCurrencies } = useGetCurrencies()
  const { currencies, isLoading, error } = useCurrencies()
  const [fromCurrencyOptions, setFromCurrencyOptions] = useState<Option[]>([])
  const [toCurrencyOptions, setToCurrencyOptions] = useState<Option[]>([])

  useEffect(() => {
    if (currencies) {
      const options = formatObjectToOptions(currencies)
      setFromCurrencyOptions(options)
      setToCurrencyOptions(options)
    }
  }, [currencies])

  useEffect(() => {
    getCurrencies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { fromCurrencyOptions, toCurrencyOptions, isLoading, error }
}
