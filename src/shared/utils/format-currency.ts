export const formatCurrency = (value: string | number): number => {
  const numericValue = +value
  return isNaN(numericValue) ? 0 : parseFloat(numericValue.toFixed(2))
}
