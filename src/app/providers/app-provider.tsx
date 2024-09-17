import { ReactNode } from 'react'
import { RatesProvider } from './rates-provider/rates-provider'

export function AppProvider({ children }: { children: ReactNode }) {
  return <RatesProvider>{children}</RatesProvider>
}
