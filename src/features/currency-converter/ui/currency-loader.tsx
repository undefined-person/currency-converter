import { Skeleton } from '@/shared/ui/skeleton'
import { Button } from '@/shared/ui/button'

export function CurrencyLoader() {
  return (
    <div className="bg-white shadow-lg rounded-lg w-[560px] py-10 px-6 flex flex-col gap-10 mt-24">
      <h1 className="text-3xl font-bold">Currency Converter</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-600">Sell</h2>
        <Skeleton className="w-full h-14" />
      </div>
      <Button aria-label="Swap currencies" onClick={() => {}} className="mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M117.66 170.34a8 8 0 0 1 0 11.32l-32 32a8 8 0 0 1-11.32 0l-32-32a8 8 0 0 1 11.32-11.32L72 188.69V48a8 8 0 0 1 16 0v140.69l18.34-18.35a8 8 0 0 1 11.32 0m96-96l-32-32a8 8 0 0 0-11.32 0l-32 32a8 8 0 0 0 11.32 11.32L168 67.31V208a8 8 0 0 0 16 0V67.31l18.34 18.35a8 8 0 0 0 11.32-11.32"
          />
        </svg>
      </Button>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-600">Buy</h2>
        <Skeleton className="w-full h-14" />
      </div>
    </div>
  )
}
