import { useEffect } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'
import { Button } from '@/shared/ui/button'
import { formatCurrency } from '@/shared/utils/format-currency'
import { cn } from '@/shared/utils/cn'

import { useGetCurrencyRates } from '../model/hooks/use-get-currency-rates'
import { useRates } from '@/app/providers/rates-provider/rates-provider'

export function CurrencyRates({ className }: { className?: string }) {
  const { getCurrencyRates } = useGetCurrencyRates()
  const { rates, isLoading, error } = useRates()

  useEffect(() => {
    getCurrencyRates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Skeleton className={cn('w-44 h-32', className)} />
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        Error: {error}
        <Button onClick={getCurrencyRates}>Retry</Button>
      </div>
    )
  }

  return (
    <table className={cn('border-separate border-spacing-2', className)}>
      <thead>
        <tr>
          <th className="font-normal text-gray-500">Currency</th>
          <th className="font-normal text-gray-500">Buy</th>
          <th className="font-normal text-gray-500">Sell</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((currency) => (
          <tr key={currency.ccy}>
            <td className="text-xl font-bold">{currency.ccy}</td>
            <td>{formatCurrency(currency.buy)}</td>
            <td>{formatCurrency(currency.sale)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
