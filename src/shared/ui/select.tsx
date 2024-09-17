import { useState } from 'react'
import type { Option } from '../types/option'
import { cn } from '../utils/cn'

type SelectProps = {
  label: string
  error?: string
  className?: string
  options: Option[]
  selectedOption: Option | null
  onChange: (option: Option) => void
}

export function Select({ options, className, label, selectedOption, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: Option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-1">
      {label ? <label className="text-gray-500">{label}</label> : null}
      <div className="relative">
        <button
          className={cn(
            'relative flex items-center gap-4 w-full min-w-48 px-5 py-3 transition-colors border rounded-lg border-gray-300 h-10 hover:border-blue-300 outline-none focus:ring-1 focus:ring-blue-500 text-gray-900',
            className
          )}
          type="button"
          onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? selectedOption.label : 'Select an option'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute top-2.5 right-2.5 h-5 w-5 fill-black pointer-events-none">
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            className="absolute bg-white w-full px-5 mt-4 transition duration-100 ease-in border rounded-lg shadow-lg focus:outline-none"
            role="listbox">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  `flex cursor-pointer items-center gap-2 rounded-lg py-3 select-none border-b last:border-0 border-gray-100 hover:font-bold`,
                  selectedOption?.value === option.value ? 'font-bold' : ''
                )}
                role="option"
                onClick={() => handleSelect(option)}>
                <div>{option.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
