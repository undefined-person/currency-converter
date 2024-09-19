import { useEffect, useState } from 'react'

import { useGetCurrencyRates, useRates } from '@/entities/currency-rates'
import { formatCurrency } from '@/shared/utils/format-currency'
import type { Option } from '@/shared/types/option'

export const useCurrencyRates = ({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  lastChanged,
}: {
  fromCurrency: Option | null
  toCurrency: Option | null
  fromAmount: number
  toAmount: number
  lastChanged: 'from' | 'to'
}) => {
  const { getCurrencyRates } = useGetCurrencyRates()
  const { rates, isLoading, error } = useRates()
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0)

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      getCurrencyRates(fromCurrency.value, toCurrency.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (fromCurrency && toCurrency && rates) {
      recalculateOnCurrencyChange(toCurrency, lastChanged === 'from' ? fromAmount : toAmount, lastChanged)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromAmount, toAmount, fromCurrency, toCurrency, lastChanged, rates])

  const recalculateOnCurrencyChange = (to: Option, amount: number, changed: 'from' | 'to') => {
    const rate = rates[to.value]
    if (rate) {
      if (changed === 'from') {
        setCalculatedAmount(formatCurrency(amount / rate))
      } else {
        setCalculatedAmount(formatCurrency(amount * rate))
      }
    }
  }

  return { calculatedAmount, isLoading, error }
}
