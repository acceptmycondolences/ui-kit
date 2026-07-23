import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

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
  },
  title: 'Components/Popover',
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const trigger = canvas.getByRole('button', { name: 'Trigger' })

    await userEvent.click(trigger)
    await expect(body.getByText('Content')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByText('Content')).not.toBeInTheDocument())

    await userEvent.click(trigger)
    await userEvent.click(canvasElement)
    await waitFor(() => expect(body.queryByText('Content')).not.toBeInTheDocument())
  },
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
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Trigger' })

    await expect(trigger).toBeDisabled()

    trigger.click()

    await expect(trigger).toHaveAttribute('data-state', 'closed')
    await expect(within(document.body).queryByText('Content')).not.toBeInTheDocument()
  },
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
