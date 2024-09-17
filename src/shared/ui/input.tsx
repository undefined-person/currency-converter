import { InputHTMLAttributes } from 'react'

import { cn } from '../utils/cn'

type InputProps = {
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border border-gray-300 rounded-lg px-5 py-3 h-10 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-300',
        className
      )}
      {...props}
    />
  )
}
