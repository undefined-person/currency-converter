export type CurrencyContextType = {
  currencies: Record<string, string>
  setCurrencies: (currencies: Record<string, string>) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  error: string
  setError: (error: string) => void
}
