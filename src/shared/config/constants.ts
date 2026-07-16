export const MEDIA_QUERIES = {
  EXTRA_EXTRA_LARGE: '(max-width: calc(96rem - 1px))',
  EXTRA_LARGE: '(max-width: calc(80rem - 1px))',
  LARGE: '(max-width: calc(64rem - 1px))',
  MEDIUM: '(max-width: calc(48rem - 1px))',
  SMALL: '(max-width: calc(40rem - 1px))',
} as const

export const FIELD_LENGTHS = {
  CARD_EXPIRY: 4,
  CARD_NUMBER: 16,
  INVOICE_NUMBER: 14,
  PHONE: 12,
  PINFL: 14,
  RECEIPT_NUMBER: 11,
  TIN: 9,
} as const

export const OTP_PATTERNS = {
  ONLY_CHARS: '^[a-zA-Z]+$',
  ONLY_DIGITS: '^\\d+$',
  ONLY_DIGITS_AND_CHARS: '^[a-zA-Z0-9]+$',
} as const
