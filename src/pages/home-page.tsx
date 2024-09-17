import { useGetCurrencies } from '@/entities/currency'
import { CurrencyConverter } from '@/features/currency-converter'

import { Header } from '@/widgets/header'
import { useEffect } from 'react'

export function HomePage() {
  const { getCurrencies } = useGetCurrencies()

  useEffect(() => {
    getCurrencies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* <Header /> */}
      <div className="py-16">
        <CurrencyConverter />
      </div>
    </>
  )
}
