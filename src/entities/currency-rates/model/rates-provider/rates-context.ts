export type RateContextType = {
  rates: Record<string, number>
  isLoading: boolean
  error: string | null
  setRates: (rates: Record<string, number>) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}
