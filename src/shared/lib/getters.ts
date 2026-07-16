export function getFormDigitsValue(currentValue: unknown, parsedValue: string) {
  return typeof currentValue === 'string' ? parsedValue : Number(parsedValue)
}
