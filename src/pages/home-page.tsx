import { CurrencyConverter } from '@/features/currency-converter'

import { Header } from '@/widgets/header'

export function HomePage() {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh_-_64px)] flex items-start justify-center">
        <CurrencyConverter />
      </div>
    </>
  )
}
