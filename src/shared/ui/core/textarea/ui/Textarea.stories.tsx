import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Textarea } from '~/shared/ui/core'

const meta = {
  args: {
    placeholder: 'Placeholder',
  },
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
      type: 'boolean',
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
    value: {
      table: {
        disable: true,
      },
    },
  },
  component: Textarea,
  parameters: {
    actions: {
      disable: true,
    },
  },
  title: 'Components/Textarea',
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

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
    const textarea = within(canvasElement).getByRole('textbox')

    await expect(textarea).toBeDisabled()
    await userEvent.type(textarea, 'Value')
    await expect(textarea).toHaveValue('')
  },
}
