import { CurrencyRatesToUAH } from '@/features/currency-rates-to-uah'

export function Header() {
  return (
    <header className="flex items-center h-16 px-4 bg-white">
      <CurrencyRatesToUAH />
    </header>
  )
}
