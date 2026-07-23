import { useState, type ChangeEvent, type ClipboardEvent } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

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
import { Input } from '~/shared/ui/core'

const meta = {
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
      type: 'boolean',
    },
    autoComplete: {
      table: {
        disable: true,
      },
    },
    className: {
      control: 'text',
      description: 'Tailwind CSS v4.0',
      type: 'string',
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
    },
    inputMode: {
      table: {
        disable: true,
      },
    },
    prefix: {
      control: 'text',
      description:
        'A static, non-editable prefix displayed at the beginning of an input field. It is mainly used for country calling codes. The prefix is visually integrated with the input field but is not part of its editable value.',
      type: 'string',
    },
    suffix: {
      control: 'text',
      description:
        'A static, non-editable suffix displayed at the end of an input field. It is mainly used for currency symbols or for auxiliary actions, such as buttons, icons, or status indicators. The suffix is visually integrated with the input but is not part of its editable value.',
      type: 'string',
    },
    type: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
  component: Input,
  parameters: {
    actions: {
      disable: true,
    },
  },
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
  },
  render: function DefaultRender({ ...props }) {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    }

    return <Input onChange={handleChange} value={value} {...props} />
  },
}

export const CardExpiry: Story = {
  args: {
    autoComplete: 'cc-exp',
    inputMode: 'numeric',
    placeholder: 'Card expiry',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Card expiry' })

    await userEvent.type(input, '1234')
    await expect(input).toHaveValue('12/34')

    await userEvent.clear(input)
    await userEvent.paste('1234')
    await expect(input).toHaveValue('12/34')
  },
  render: function CardExpiryRender({ ...props }) {
    const [value, setValue] = useState(0)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(parseCreditCardExpiry(event.target.value)))
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setValue(Number(parseCreditCardExpiry(pastedData)))
    }

    const formattedValue = value ? formatCreditCardExpiry(String(value)) : ''

    return <Input onChange={handleChange} onPaste={handlePaste} value={formattedValue} {...props} />
  },
}

export const CardNumber: Story = {
  args: {
    autoComplete: 'cc-number',
    inputMode: 'numeric',
    placeholder: 'Card number',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Card number' })

    await userEvent.type(input, '8600123412345678')
    await expect(input).toHaveValue('8600 1234 1234 5678')

    await userEvent.clear(input)
    await userEvent.paste('8600123412345678')
    await expect(input).toHaveValue('8600 1234 1234 5678')
  },
  render: function CardNumberRender({ ...props }) {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(parseCreditCardNumber(event.target.value))
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setValue(parseCreditCardNumber(pastedData))
    }

    const formattedValue = value ? formatCreditCard(value) : ''

    return <Input onChange={handleChange} onPaste={handlePaste} value={formattedValue} {...props} />
  },
}

export const Currency: Story = {
  args: {
    autoComplete: 'transaction-amount',
    inputMode: 'numeric',
    placeholder: 'Currency',
    suffix: 'UZS',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Currency' })

    await userEvent.type(input, '1234567')
    await expect(input).toHaveValue(formatNumber(1234567))

    await userEvent.clear(input)
    await userEvent.paste('1234567')
    await expect(input).toHaveValue(formatNumber(1234567))
  },
  render: function NumberRender({ ...props }) {
    const [value, setValue] = useState(0)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const digits = event.target.value.replace(/\D/g, '')

      setValue(Number(digits))
    }

    const formattedValue = formatNumber(value)

    return <Input onChange={handleChange} value={formattedValue} {...props} />
  },
}

export const InvoiceNumber: Story = {
  args: {
    inputMode: 'numeric',
    placeholder: 'Invoice number',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Invoice number' })

    await userEvent.type(input, 'AB1234567890123456')
    await expect(input).toHaveValue('12345678901234')

    await userEvent.clear(input)
    await userEvent.paste('AB1234567890123456')
    await expect(input).toHaveValue('12345678901234')
  },
  render: function InvoiceNumberRender({ ...props }) {
    const [value, setValue] = useState(0)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(parseInvoiceNumber(event.target.value)))
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setValue(Number(parseInvoiceNumber(pastedData)))
    }

    return <Input onChange={handleChange} onPaste={handlePaste} value={value ? String(value) : ''} {...props} />
  },
}

export const Name: Story = {
  args: {
    autoComplete: 'name',
    placeholder: 'Name',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Name' })

    await userEvent.type(input, 'aLIBEK123 ALLANAZAROV')
    await expect(input).toHaveValue('Alibek Allanazarov')

    await userEvent.clear(input)
    await userEvent.paste('aLIBEK123 ALLANAZAROV')
    await expect(input).toHaveValue('Alibek Allanazarov')
  },
  render: function NameRender({ ...props }) {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(parseName(event.target.value))
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setValue(parseName(pastedData))
    }

    return <Input onChange={handleChange} onPaste={handlePaste} value={value} {...props} />
  },
}

export const Phone: Story = {
  args: {
    autoComplete: 'tel',
    inputMode: 'tel',
    placeholder: 'Phone',
    prefix: '+998',
    type: 'tel',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Phone' })

    await userEvent.type(input, '901234567')
    await expect(input).toHaveValue('90 123 45 67')

    await userEvent.clear(input)
    await userEvent.paste('+998 90 123 45 67')
    await expect(input).toHaveValue('90 123 45 67')
  },
  render: function PhoneNumberRender({ ...props }) {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(parsePhoneNumber(event.target.value))
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setValue(parsePhoneNumber(pastedData))
    }

    const formattedValue = value ? formatPhone(value) : ''

    return <Input onChange={handleChange} onPaste={handlePaste} value={formattedValue} {...props} />
  },
}

export const Pinfl: Story = {
  args: {
    inputMode: 'numeric',
    placeholder: 'PINFL',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'PINFL' })

    await userEvent.type(input, '1234567890123456')
    await expect(input).toHaveValue('12345678901234')

    await userEvent.clear(input)
    await userEvent.paste('1234567890123456')
    await expect(input).toHaveValue('12345678901234')
  },
  render: function PinflRender({ ...props }) {
    const [value, setValue] = useState(0)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(parsePinfl(event.target.value)))
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setValue(Number(parsePinfl(pastedData)))
    }

    return <Input onChange={handleChange} onPaste={handlePaste} value={value ? String(value) : ''} {...props} />
  },
}

export const ReceiptNumber: Story = {
  args: {
    inputMode: 'numeric',
    placeholder: 'Receipt number',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Receipt number' })

    await userEvent.type(input, '12-3456-789012')
    await expect(input).toHaveValue('12345678901')

    await userEvent.clear(input)
    await userEvent.paste('12-3456-789012')
    await expect(input).toHaveValue('12345678901')
  },
  render: function ReceiptNumberRender({ ...props }) {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(parseReceiptNumber(event.target.value))
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setValue(parseReceiptNumber(pastedData))
    }

    return <Input onChange={handleChange} onPaste={handlePaste} value={value} {...props} />
  },
}

export const Tin: Story = {
  args: {
    inputMode: 'numeric',
    placeholder: 'TIN',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'TIN' })

    await userEvent.type(input, '123-456-7890')
    await expect(input).toHaveValue('123456789')

    await userEvent.clear(input)
    await userEvent.paste('123-456-7890')
    await expect(input).toHaveValue('123456789')
  },
  render: function TinRender({ ...props }) {
    const [value, setValue] = useState(0)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(parseTin(event.target.value)))
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      const pastedData = event.clipboardData.getData('text')

      setValue(Number(parseTin(pastedData)))
    }

    return <Input onChange={handleChange} onPaste={handlePaste} value={value ? String(value) : ''} {...props} />
  },
}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Placeholder',
    readOnly: true,
    value: 'Invalid',
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('textbox', { name: 'Placeholder' })).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'Disabled',
    disabled: true,
    placeholder: 'Placeholder',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Placeholder' })

    await expect(input).toBeDisabled()
    await expect(input).toHaveValue('Disabled')

    await userEvent.type(input, 'Changed')

    await expect(input).toHaveValue('Disabled')
  },
}
