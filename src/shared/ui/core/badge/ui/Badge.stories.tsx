import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge, BADGE_VARIANTS } from '~/shared/ui/core'

const meta = {
  args: {
    children: 'Label',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Tailwind CSS v4.0',
      type: 'string',
    },
    variant: {
      control: 'select',
      options: BADGE_VARIANTS,
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
  component: Badge,
  parameters: {
    actions: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
  },
  title: 'Components/Badge',
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Constructive: Story = {
  args: {
    variant: 'constructive',
  },
}

export const ConstructiveSoft: Story = {
  args: {
    variant: 'constructiveSoft',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
}

export const DestructiveSoft: Story = {
  args: {
    variant: 'destructiveSoft',
  },
}

export const Informative: Story = {
  args: {
    variant: 'informative',
  },
}

export const InformativeSoft: Story = {
  args: {
    variant: 'informativeSoft',
  },
}

export const Muted: Story = {
  args: {
    variant: 'muted',
  },
}

export const MutedSoft: Story = {
  args: {
    variant: 'mutedSoft',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
}

export const WarningSoft: Story = {
  args: {
    variant: 'warningSoft',
  },
}
