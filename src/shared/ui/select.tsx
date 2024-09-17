import { ChangeEvent, useEffect, useState } from 'react'

import type { Option } from '../types/option'
import { cn } from '../utils/cn'
import { Input } from './input'

type SelectProps = {
  className?: string
  options: Option[]
  selectedOption: Option | null
  onChange: (option: Option) => void
}

export function Select({ options, className, selectedOption, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)

  const handleSelect = (option: Option) => {
    onChange(option)
    setIsOpen(false)
  }
  useEffect(() => {
    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredOptions(filteredOptions)
  }, [searchValue, options])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="relative">
      <button
        className={cn(
          'relative z-10 flex items-center gap-4 w-full min-w-64 px-5 py-3 transition-colors border rounded-lg border-gray-300 h-10 hover:border-blue-300 outline-none focus:ring-1 focus:ring-blue-500 text-gray-900',
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
          className="absolute bg-white w-full mt-4 border rounded-lg shadow-lg focus:outline-none z-20 h-96 overflow-y-scroll"
          role="listbox">
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearch}
            className="sticky top-0 w-full px-5 py-2 border-b border-gray-200 bg-white z-10"
            autoFocus
          />
          <div className="px-5">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
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
              ))
            ) : (
              <p className="text-center mt-4">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
