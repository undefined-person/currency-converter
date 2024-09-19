import { Button } from '@/shared/ui/button'

type CurrencyErrorProps = {
  error: string
}

export function CurrencyError({ error }: CurrencyErrorProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Currency Converter</h1>
      <p className="text-red-500">{error}</p>
      <Button onClick={() => window.location.reload()}>Try again</Button>
    </div>
  )
}
