import { ChangeEvent, useEffect, useState } from 'react'

import { useRates } from '@/app/providers/rates-provider/rates-provider'
import { Option } from '@/shared/types/option'
import { Select } from '@/shared/ui/select'
import { Skeleton } from '@/shared/ui/skeleton'
import { Button } from '@/shared/ui/button'
import { formatCurrency } from '@/shared/utils/format-currency'
import { useCurrencies } from '@/entities/currency'
import { formatObjectToOptions } from '@/shared/utils/format-object-to-options'

export function CurrencyConverter() {
  const { rates, isLoading: isLoadingRates, error } = useRates()
  const { currencies, isLoading: isLoadingCurrencies } = useCurrencies()

  const [fromCurrency, setFromCurrency] = useState<Option | null>(null)
  const [toCurrency, setToCurrency] = useState<Option | null>(null)

  const [fromAmount, setFromAmount] = useState<number>(0)
  const [toAmount, setToAmount] = useState<number>(0)

  const [fromCurrencyOptions, setFromCurrencyOptions] = useState<Option[]>([])
  const [toCurrencyOptions, setToCurrencyOptions] = useState<Option[]>([])

  const handleFromCurrencyChange = (value: Option) => {
    setFromCurrency(value)
  }

  const handleToCurrencyChange = (value: Option) => {
    setToCurrency(value)
  }

  useEffect(() => {
    if (currencies) {
      const options = formatObjectToOptions(currencies)
      setFromCurrencyOptions(options)
      setToCurrencyOptions(options)
    }
  }, [currencies])

  const handleSellChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setFromAmount(value)

    const sellRate = rates.find((rate) => rate.ccy === fromCurrency?.value)?.sale

    if (sellRate) {
      setToAmount(formatCurrency(value * Number(sellRate)))
    }
  }

  const handleBuyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setToAmount(value)

    const buyRate = rates.find((rate) => rate.ccy === toCurrency?.value)?.buy

    if (buyRate) {
      setFromAmount(formatCurrency(value * Number(buyRate)))
    }
  }

  // TODO: DEBOUNCE

  const handleSwap = () => {
    console.log('SWAP')

    const tempCurrency = fromCurrency
    const tempAmount = fromAmount

    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)

    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  if (isLoadingCurrencies || isLoadingRates) {
    return <Skeleton className="w-44 h-32" />
  }

  return (
    <div className="bg-white shadow-lg rounded-lg w-[560px] m-auto py-10 px-6 flex flex-col gap-10">
      <h1 className="text-3xl font-bold">Currency Converter</h1>
      <div>
        <h2>Sell</h2>
        <div className="flex items-center justify-between border border-gray-300 rounded-lg px-5 py-3 h-14 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-300">
          <input type="number" className="flex-1 focus:outline-none" onChange={handleSellChange} value={fromAmount} />
          <Select
            options={fromCurrencyOptions}
            onChange={handleFromCurrencyChange}
            selectedOption={fromCurrency}
            className="border-0 bg-transparent hover:border-none focus:ring-0"
          />
        </div>
      </div>
      <Button aria-label="Swap currencies" onClick={handleSwap} className="mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M117.66 170.34a8 8 0 0 1 0 11.32l-32 32a8 8 0 0 1-11.32 0l-32-32a8 8 0 0 1 11.32-11.32L72 188.69V48a8 8 0 0 1 16 0v140.69l18.34-18.35a8 8 0 0 1 11.32 0m96-96l-32-32a8 8 0 0 0-11.32 0l-32 32a8 8 0 0 0 11.32 11.32L168 67.31V208a8 8 0 0 0 16 0V67.31l18.34 18.35a8 8 0 0 0 11.32-11.32"
          />
        </svg>
      </Button>
      <div>
        <h2>Buy</h2>
        <div className="flex items-center justify-between border border-gray-300 rounded-lg px-5 py-3 h-14 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-300">
          <input type="number" className="flex-1 focus:outline-none" value={toAmount} onChange={handleBuyChange} />
          <Select
            options={toCurrencyOptions}
            onChange={handleToCurrencyChange}
            selectedOption={toCurrency}
            className="border-0 bg-transparent hover:border-none focus:ring-0"
          />
        </div>
      </div>
    </div>
  )
}
