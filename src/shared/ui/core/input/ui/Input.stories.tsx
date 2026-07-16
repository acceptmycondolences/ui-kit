import { useState, type ChangeEvent, type ClipboardEvent } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

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
    interactions: {
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
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Placeholder',
    readOnly: true,
    value: 'Disabled',
  },
}
