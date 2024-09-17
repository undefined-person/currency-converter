import { ReactNode } from 'react'

import { RatesProvider } from './rates-provider/rates-provider'
import { CurrenciesProvider } from '@/entities/currency'

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <CurrenciesProvider>
      <RatesProvider>{children}</RatesProvider>
    </CurrenciesProvider>
  )
}
