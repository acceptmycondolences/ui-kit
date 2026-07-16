import { FIELD_LENGTHS } from '~/shared/config'

import { parseCreditCardNumber, parsePinfl } from './parsers'

export function isValidCreditCardNumber(value: number | string) {
  const digits = parseCreditCardNumber(String(value))

  if (digits.length !== FIELD_LENGTHS.CARD_NUMBER) {
    return false
  }

  if (/^(\d)\1+$/.test(digits)) {
    return false
  }

  let shouldDouble = false
  let checksum = 0

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index])

    if (shouldDouble) {
      digit *= 2

      if (digit > 9) {
        digit -= 9
      }
    }

    shouldDouble = !shouldDouble
    checksum += digit
  }

  return checksum % 10 === 0
}

export function isValidPinfl(value: number | string) {
  const digits = parsePinfl(String(value))

  if (digits.length !== FIELD_LENGTHS.PINFL) {
    return false
  }

  const weights = [7, 3, 1]

  const checksum = digits
    .slice(0, FIELD_LENGTHS.PINFL - 1)
    .split('')
    .reduce(
      (previousValue, currentValue, currentIndex) =>
        previousValue + Number(currentValue) * weights[currentIndex % weights.length],
      0,
    )

  return checksum % 10 === Number(digits.at(-1))
}
