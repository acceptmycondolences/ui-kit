import type { Meta, StoryObj } from '@storybook/react-vite'

import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '~/shared/ui/core'

const meta = {
  component: Popover,
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
  title: 'Components/Popover',
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="rounded-none">Trigger</PopoverTrigger>
      <PopoverPortal>
        <PopoverContent align="center" className="p-2">
          Content
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger
        aria-invalid={true}
        className="rounded-none aria-invalid:text-destructive-foreground aria-invalid:ring-destructive-foreground/40 aria-invalid:[&_svg]:text-destructive-foreground aria-invalid:data-[state=open]:[&_svg]:last:text-destructive-foreground"
      >
        Trigger
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent align="center" className="p-2">
          Content
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="rounded-none disabled:opacity-40" disabled>
        Trigger
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent align="center" className="p-2">
          Content
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  ),
}
