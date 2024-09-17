import type { Option } from '../types/option'

export const formatObjectToOptions = (object: Record<string, string>): Option[] => {
  return Object.entries(object).map(([value, label]) => ({
    value,
    label: label ? label : value,
  }))
}
