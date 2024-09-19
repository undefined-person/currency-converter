import { useEffect, useState } from 'react'

import { Option } from '@/shared/types/option'
import { Button } from '@/shared/ui/button'

import { CurrencyLoader } from './currency-loader'
import { CurrencyError } from './currency-error'
import { CurrencyInput } from './currency-input'
import { useCurrencyRates } from '../model/hooks/use-currency-rates'
import { useCurrencyOptions } from '../model/hooks/use-currency-options'

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState<Option | null>(null)
  const [toCurrency, setToCurrency] = useState<Option | null>(null)
  const [fromAmount, setFromAmount] = useState<number>(0)
  const [toAmount, setToAmount] = useState<number>(0)
  const [lastChanged, setLastChanged] = useState<'from' | 'to'>('from')

  const {
    fromCurrencyOptions,
    toCurrencyOptions,
    error: currencyError,
    isLoading: isCurrencyLoading,
  } = useCurrencyOptions()
  const {
    calculatedAmount,
    error: ratesError,
    isLoading: isCurrencyRatesLoading,
  } = useCurrencyRates({
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    lastChanged,
  })

  useEffect(() => {
    if (lastChanged === 'from') {
      setToAmount(calculatedAmount)
    } else {
      setFromAmount(calculatedAmount)
    }
  }, [calculatedAmount, lastChanged])

  const handleFromCurrencyChange = (value: Option) => {
    setFromCurrency(value)
  }

  const handleToCurrencyChange = (value: Option) => {
    setToCurrency(value)
  }

  const handleSellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(Number(event.target.value))
    setLastChanged('from')
  }

  const handleBuyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(Number(event.target.value))
    setLastChanged('to')
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
    setLastChanged(lastChanged === 'from' ? 'to' : 'from')
  }

  if (isCurrencyLoading || isCurrencyRatesLoading) {
    return <CurrencyLoader />
  }

  if (currencyError || ratesError) {
    return <CurrencyError error={currencyError || ratesError || ''} />
  }

  return (
    <div className="bg-white shadow-lg rounded-lg w-[560px] py-10 px-6 flex flex-col gap-10 mt-24">
      <h1 className="text-3xl font-bold">Currency Converter</h1>
      <CurrencyInput
        label="Sell"
        amount={fromAmount}
        currencyOptions={fromCurrencyOptions}
        selectedCurrency={fromCurrency}
        onAmountChange={handleSellChange}
        onCurrencyChange={handleFromCurrencyChange}
      />
      <Button aria-label="Swap currencies" onClick={handleSwap} className="mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M117.66 170.34a8 8 0 0 1 0 11.32l-32 32a8 8 0 0 1-11.32 0l-32-32a8 8 0 0 1 11.32-11.32L72 188.69V48a8 8 0 0 1 16 0v140.69l18.34-18.35a8 8 0 0 1 11.32 0m96-96l-32-32a8 8 0 0 0-11.32 0l-32 32a8 8 0 0 0 11.32 11.32L168 67.31V208a8 8 0 0 0 16 0V67.31l18.34 18.35a8 8 0 0 0 11.32-11.32"
          />
        </svg>
      </Button>
      <CurrencyInput
        label="Buy"
        amount={toAmount}
        currencyOptions={toCurrencyOptions}
        selectedCurrency={toCurrency}
        onAmountChange={handleBuyChange}
        onCurrencyChange={handleToCurrencyChange}
      />
    </div>
  )
}
