import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from '~/shared/ui/core'

const meta = {
  args: {
    children: 'Label',
    size: 'medium',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Tailwind CSS v4.0',
      type: 'string',
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
    },
    isLoading: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
      type: 'boolean',
    },
    size: {
      control: 'select',
      options: BUTTON_SIZES,
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
  component: Button,
  parameters: {
    actions: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
  },
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: null,
  },
}

export const Size: Story = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
  },
  render: ({ ...props }) => (
    <div className="flex flex-col-reverse items-start gap-8 sm:flex-row-reverse">
      {BUTTON_SIZES.map((size) => (
        <Button key={size} variant="outline" {...props} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}

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
