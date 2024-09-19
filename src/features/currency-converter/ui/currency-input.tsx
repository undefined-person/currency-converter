import { ChangeEvent } from 'react'

import { Option } from '@/shared/types/option'
import { Select } from '@/shared/ui/select'

type CurrencyInputProps = {
  label: string
  amount: number
  currencyOptions: Option[]
  selectedCurrency: Option | null
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  onCurrencyChange: (value: Option) => void
}

export function CurrencyInput({
  label,
  amount,
  currencyOptions,
  selectedCurrency,
  onAmountChange,
  onCurrencyChange,
}: CurrencyInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold text-gray-600">{label}</h2>
      <div className="flex items-center justify-between px-5 py-3 transition-colors border border-gray-300 rounded-lg h-14 focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-300">
        <input type="number" className="flex-1 focus:outline-none" value={amount} onChange={onAmountChange} />
        <Select
          options={currencyOptions}
          onChange={onCurrencyChange}
          selectedOption={selectedCurrency}
          className="bg-transparent border-0 hover:border-none focus:ring-0"
        />
      </div>
    </div>
  )
}
