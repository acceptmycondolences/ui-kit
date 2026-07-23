import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

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
  },
  render: ({ ...props }) => {
    const { 'aria-invalid': ariaInvalid, ...rest } = props

    return (
      <InputOTP aria-invalid={ariaInvalid} {...rest}>
        <InputOTPGroup aria-label="One-time password" role="group">
          {renderSlots(ariaInvalid ? true : false)}
        </InputOTPGroup>
      </InputOTP>
    )
  },
  title: 'Components/InputOTP',
} satisfies Meta<typeof InputOTP>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole('group', { name: 'One-time password' })
    const input = canvas.getByRole('textbox')

    await userEvent.type(input, '123456')
    await expect(input).toHaveValue('123456')
    await expect(group).toHaveTextContent('123456')

    await userEvent.clear(input)
    await userEvent.click(input)
    await userEvent.paste('654321')
    await expect(input).toHaveValue('654321')
    await expect(group).toHaveTextContent('654321')

    await userEvent.keyboard('{Backspace}')
    await expect(input).toHaveValue('65432')
    await expect(group).toHaveTextContent('65432')
  },
}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox')

    await expect(input).toBeDisabled()

    await userEvent.type(input, '123456')

    await expect(input).toHaveValue('')
  },
}
