import { FIELD_LENGTHS } from '~/shared/config'

export function parseCreditCardExpiry(value: string) {
  return parseDigits(value, FIELD_LENGTHS.CARD_EXPIRY)
}

export function parseCreditCardNumber(value: string) {
  return parseDigits(value, FIELD_LENGTHS.CARD_NUMBER)
}

export function parseDigits(value: string, maxLength: number) {
  return value.replace(/\D/g, '').slice(0, maxLength)
}

export function parseInvoiceNumber(value: string) {
  return parseDigits(value, FIELD_LENGTHS.INVOICE_NUMBER)
}

export function parseName(value: string) {
  let name = value.replace(/[^\p{L} ]/gu, '').replace(/\s+/g, ' ')

  name = name
    .split(' ')
    .map((word) => (word ? word[0].toLocaleUpperCase() + word.slice(1).toLocaleLowerCase() : ''))
    .join(' ')

  return name
}

export function parsePhoneNumber(value: string) {
  let digits = value.replace(/\D/g, '')

  if (digits.startsWith('998') && digits.length === FIELD_LENGTHS.PHONE) {
    digits = digits.slice(3)
  }

  digits = digits.slice(0, FIELD_LENGTHS.PHONE - 3)

  return digits ? `998${digits}` : ''
}

export function parsePinfl(value: string) {
  return parseDigits(value, FIELD_LENGTHS.PINFL)
}

export function parseReceiptNumber(value: string) {
  return parseDigits(value, FIELD_LENGTHS.RECEIPT_NUMBER)
}

export function parseTin(value: string) {
  return parseDigits(value, FIELD_LENGTHS.TIN)
}
