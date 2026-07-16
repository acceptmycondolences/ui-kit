import type { Meta, StoryObj } from '@storybook/react-vite'

import { OTP_PATTERNS } from '~/shared/config'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '~/shared/ui/core'

function renderSlots(invalid?: boolean) {
  return Array.from({ length: 6 }).map((_, index) => (
    <InputOTPSlot aria-invalid={invalid} index={index} key={`slot-${String(index)}`} />
  ))
}

const meta = {
  args: {
    maxLength: 6,
    pattern: OTP_PATTERNS.ONLY_DIGITS,
  },
  component: InputOTP,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
  },
  render: ({ ...props }) => {
    const { 'aria-invalid': ariaInvalid, ...rest } = props

    return (
      <InputOTP {...rest}>
        <InputOTPGroup>{renderSlots(ariaInvalid ? true : false)}</InputOTPGroup>
      </InputOTP>
    )
  },
  title: 'Components/InputOTP',
} satisfies Meta<typeof InputOTP>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
