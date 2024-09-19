import { ReactNode } from 'react'

import { CurrenciesProvider } from '@/entities/currency'
import { RatesProvider } from '@/entities/currency-rates'

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <CurrenciesProvider>
      <RatesProvider>{children}</RatesProvider>
    </CurrenciesProvider>
  )
}
