import { useEffect } from 'react'

import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'
import { cn } from '@/shared/utils/cn'
import { formatCurrency } from '@/shared/utils/format-currency'
import { useGetCurrencyRatesToUAH } from '../model/hooks/use-get-currency-rates-to-uah'

const convertRatesKeys: Record<string, string> = {
  usd: 'USD',
  eur: 'EUR',
}

export function CurrencyRatesToUAH() {
  const { error, isLoading, rates, getCurrencyRatesToUAH } = useGetCurrencyRatesToUAH()

  useEffect(() => {
    getCurrencyRatesToUAH(Object.keys(convertRatesKeys))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Skeleton className={cn('w-48 h-7')} />
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        Error: {error}
        <Button onClick={() => getCurrencyRatesToUAH(Object.keys(convertRatesKeys))}>Retry</Button>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-4">
      {Object.entries(rates).map(([currency, rate]) => (
        <div key={currency} className="flex items-center gap-2 text-lg">
          <h2 className="font-semibold">{convertRatesKeys[currency]}</h2>
          <span>{formatCurrency(rate)}</span>
        </div>
      ))}
    </div>
  )
}
