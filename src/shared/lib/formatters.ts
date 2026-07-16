export function formatCreditCard(value?: null | string) {
  if (!value) {
    return '—'
  }

  const digits = value.replace(/\D/g, '')

  return digits.match(/.{1,4}/g)?.join(' ') ?? value
}

export function formatCreditCardExpiry(value?: null | string) {
  if (!value) {
    return '—'
  }

  const digits = value.replace(/\D/g, '')

  return digits.replace(/^(\d{0,2})(\d{0,2}).*/, (_, month, year) => [month, year].filter(Boolean).join('/'))
}

const numberFormat = new Intl.NumberFormat('ru-RU')

export function formatNumber(value: number | string) {
  const numberValue = typeof value === 'number' ? value : Number(value)

  return value ? numberFormat.format(numberValue) : ''
}

export function formatPhone(value?: null | number | string, withCountryCode = false) {
  if (!value) {
    return '—'
  }

  const stringValue = typeof value === 'number' ? String(value) : value

  const digits = stringValue.replace(/\D/g, '').replace(/^998/, '')

  const formattedValue = digits.replace(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2}).*/, (_, a, b, c, d) =>
    [a, b, c, d].filter(Boolean).join(' '),
  )

  return withCountryCode && formattedValue ? `+998 ${formattedValue}` : formattedValue
}
