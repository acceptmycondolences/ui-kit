import type { Meta, StoryObj } from '@storybook/react-vite'

import { classNames } from '~/shared/lib'
import { buttonVariants, LOADING_DOTS_VARIANTS, LoadingDots } from '~/shared/ui/core'

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Tailwind CSS v4.0',
      type: 'string',
    },
    variant: {
      control: 'select',
      options: LOADING_DOTS_VARIANTS,
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
  component: LoadingDots,
  parameters: {
    actions: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
  },
  render: ({ className, variant, ...props }) => (
    <LoadingDots
      {...props}
      className={classNames(buttonVariants({ size: 'medium', variant }), className)}
      variant={variant}
    />
  ),
  title: 'Components/LoadingDots',
} satisfies Meta<typeof LoadingDots>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Constructive: Story = {
  args: {
    variant: 'constructive',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const TextConstructive: Story = {
  args: {
    variant: 'textConstructive',
  },
}

export const TextDestructive: Story = {
  args: {
    variant: 'textDestructive',
  },
}
