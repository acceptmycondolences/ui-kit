import { useState, type ChangeEvent, type ClipboardEvent } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import {
  formatCreditCard,
  formatCreditCardExpiry,
  formatNumber,
  formatPhone,
  parseCreditCardExpiry,
  parseCreditCardNumber,
  parseInvoiceNumber,
  parseName,
  parsePhoneNumber,
  parsePinfl,
  parseReceiptNumber,
  parseTin,
} from '~/shared/lib'
import { Field, FieldDescription, FieldError, FieldGroup, Input } from '~/shared/ui/core'

const meta = {
  component: Field,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  title: 'Components/Field',
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('alert')).not.toBeInTheDocument()
  },
  render: () => (
    <Field>
      <Input placeholder="Placeholder" />
      <FieldError errors={[{}, { message: '' }]} />
    </Field>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Field>
      <Input placeholder="Placeholder" />
      <FieldDescription>Description</FieldDescription>
    </Field>
  ),
}

export const WithError: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('alert')).toHaveTextContent('Error')
  },
  render: () => (
    <Field data-invalid>
      <Input aria-invalid placeholder="Placeholder" />
      <FieldError>Error</FieldError>
    </Field>
  ),
}

export const WithMultipleErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const alert = canvas.getByRole('alert')

    await expect(within(alert).getAllByRole('listitem')).toHaveLength(2)
    await expect(alert).toHaveTextContent('First error')
    await expect(alert).toHaveTextContent('Second error')
  },
  render: () => (
    <Field data-invalid>
      <Input aria-invalid placeholder="Placeholder" />
      <FieldError
        errors={[
          {
            message: 'First error',
          },
          {
            message: 'First error',
          },
          {
            message: '',
          },
          {
            message: 'Second error',
          },
        ]}
      />
    </Field>
  ),
}

export const WithGroup: Story = {
  render: function WithGroupRender() {
    const [cardExpiryValue, setCardExpiryValue] = useState(0)
    const [cardNumberValue, setCardNumberValue] = useState('')
    const [currencyValue, setCurrencyValue] = useState(0)
    const [value, setValue] = useState('')
    const [invoiceNumberValue, setInvoiceNumberValue] = useState(0)
    const [nameValue, setNameValue] = useState('')
    const [phoneValue, setPhoneValue] = useState('')
    const [pinflValue, setPinflValue] = useState(0)
    const [receiptNumberValue, setReceiptNumberValue] = useState('')
    const [tinValue, setTinValue] = useState(0)

    const handleCardExpiryChange = (event: ChangeEvent<HTMLInputElement>) => {
      setCardExpiryValue(Number(parseCreditCardExpiry(event.target.value)))
    }

    const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
      setCardNumberValue(parseCreditCardNumber(event.target.value))
    }

    const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
      const digits = event.target.value.replace(/\D/g, '')

      setCurrencyValue(Number(digits))
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    }

    const handleInvoiceNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInvoiceNumberValue(Number(parseInvoiceNumber(event.target.value)))
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNameValue(parseName(event.target.value))
    }

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPhoneValue(parsePhoneNumber(event.target.value))
    }

    const handlePinflChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPinflValue(Number(parsePinfl(event.target.value)))
    }

    const handleReceiptNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
      setReceiptNumberValue(parseReceiptNumber(event.target.value))
    }

    const handleTinChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTinValue(Number(parseTin(event.target.value)))
    }

    const handleCardExpiryPaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setCardExpiryValue(Number(parseCreditCardExpiry(pastedData)))
    }

    const handleCardNumberPaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setCardNumberValue(parseCreditCardNumber(pastedData))
    }

    const handleInvoiceNumberPaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setInvoiceNumberValue(Number(parseInvoiceNumber(pastedData)))
    }

    const handleNamePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setNameValue(parseName(pastedData))
    }

    const handlePhonePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setPhoneValue(parsePhoneNumber(pastedData))
    }

    const handlePinflPaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setPinflValue(Number(parsePinfl(pastedData)))
    }

    const handleReceiptNumberPaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setReceiptNumberValue(parseReceiptNumber(pastedData))
    }

    const handleTinPaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setTinValue(Number(parseTin(pastedData)))
    }

    const formattedCardExpiryValue = cardExpiryValue ? formatCreditCardExpiry(String(cardExpiryValue)) : ''
    const formattedCardNumberValue = cardNumberValue ? formatCreditCard(cardNumberValue) : ''
    const formattedCurrencyValue = formatNumber(currencyValue)
    const formattedPhoneValue = phoneValue ? formatPhone(phoneValue) : ''

    return (
      <FieldGroup>
        <Field>
          <Input
            autoComplete="cc-exp"
            inputMode="numeric"
            onChange={handleCardExpiryChange}
            onPaste={handleCardExpiryPaste}
            placeholder="Card expiry"
            value={formattedCardExpiryValue}
          />
        </Field>
        <Field>
          <Input
            autoComplete="cc-number"
            inputMode="numeric"
            onChange={handleCardNumberChange}
            onPaste={handleCardNumberPaste}
            placeholder="Card number"
            value={formattedCardNumberValue}
          />
        </Field>
        <Field>
          <Input
            autoComplete="transaction-amount"
            inputMode="numeric"
            onChange={handleCurrencyChange}
            placeholder="Currency"
            suffix="UZS"
            value={formattedCurrencyValue}
          />
        </Field>
        <Field>
          <Input onChange={handleChange} placeholder="Placeholder" value={value} />
        </Field>
        <Field>
          <Input
            inputMode="numeric"
            onChange={handleInvoiceNumberChange}
            onPaste={handleInvoiceNumberPaste}
            placeholder="Invoice number"
            value={invoiceNumberValue ? String(invoiceNumberValue) : ''}
          />
        </Field>
        <Field>
          <Input
            autoComplete="name"
            onChange={handleNameChange}
            onPaste={handleNamePaste}
            placeholder="Name"
            value={nameValue}
          />
        </Field>
        <Field>
          <Input
            autoComplete="tel"
            inputMode="tel"
            onChange={handlePhoneChange}
            onPaste={handlePhonePaste}
            placeholder="Phone"
            prefix="+998"
            type="tel"
            value={formattedPhoneValue}
          />
        </Field>
        <Field>
          <Input
            inputMode="numeric"
            onChange={handlePinflChange}
            onPaste={handlePinflPaste}
            placeholder="PINFL"
            value={pinflValue ? String(pinflValue) : ''}
          />
        </Field>
        <Field>
          <Input
            inputMode="numeric"
            onChange={handleReceiptNumberChange}
            onPaste={handleReceiptNumberPaste}
            placeholder="Receipt number"
            value={receiptNumberValue}
          />
        </Field>
        <Field>
          <Input
            inputMode="numeric"
            onChange={handleTinChange}
            onPaste={handleTinPaste}
            placeholder="TIN"
            value={tinValue ? String(tinValue) : ''}
          />
        </Field>
      </FieldGroup>
    )
  },
}
