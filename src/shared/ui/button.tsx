import { HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type ButtonVariants = 'primary' | 'secondary'

type ButtonProps = {
  variant?: ButtonVariants
  className?: string
} & HTMLAttributes<HTMLButtonElement>

const buttonVariants: Record<ButtonVariants, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500',
}

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn('rounded-md px-4 py-2 transition-colors', buttonVariants[variant ?? 'primary'], className)}
      {...props}>
      {props.children}
    </button>
  )
}
