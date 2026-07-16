import type { Meta, StoryObj } from '@storybook/react-vite'

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
    interactions: {
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
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
