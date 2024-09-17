import { CurrencyRates } from '@/entities/currency-rates'

export function Header() {
  return (
    <header className="bg-white p-2">
      <CurrencyRates className="ml-auto" />
    </header>
  )
}
