import { InputHTMLAttributes } from 'react'

import { cn } from '../utils/cn'

type FormFieldProps = {
  label: string
  error?: string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function FormField({ label, error, className, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500" htmlFor={props.id ?? props.name}>
        {label}
      </label>
      <input
        className={cn(
          'border border-gray-300 rounded-lg px-5 py-3 h-10 transition-colors  focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-300',
          error ? 'border-red-500' : '',
          className
        )}
        {...props}
      />
      {error && <div role="alert">{error}</div>}
    </div>
  )
}
