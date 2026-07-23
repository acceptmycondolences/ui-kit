import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { Select, SelectContent, SelectItem, SelectPortal, SelectTrigger, SelectValue } from '~/shared/ui/core'

const meta = {
  args: {
    onValueChange: fn(),
  },
  component: Select,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')

    await userEvent.click(trigger)

    const body = within(document.body)

    await userEvent.click(body.getByRole('option', { name: 'Value 1' }))

    await expect(trigger).toHaveTextContent('Value 1')
    await expect(args.onValueChange).toHaveBeenCalledOnce()
    await expect(args.onValueChange).toHaveBeenCalledWith('value-1')
    await waitFor(() => expect(body.queryByRole('listbox')).not.toBeInTheDocument())

    await userEvent.click(trigger)
    await expect(body.getByRole('listbox')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(args.onValueChange).toHaveBeenCalledOnce()
  },
  render: ({ ...props }) => (
    <Select {...props}>
      <SelectTrigger className="rounded-none">
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent align="center">
          <SelectItem value="value-1">Value 1</SelectItem>
          <SelectItem value="value-2">Value 2</SelectItem>
          <SelectItem value="value-3">Value 3</SelectItem>
        </SelectContent>
      </SelectPortal>
    </Select>
  ),
}

export const Invalid: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  },
  render: () => (
    <Select>
      <SelectTrigger
        aria-invalid={true}
        className="rounded-none aria-invalid:text-destructive-foreground aria-invalid:ring-destructive-foreground/40 aria-invalid:data-placeholder:text-destructive-foreground aria-invalid:[&_svg]:text-destructive-foreground aria-invalid:data-[state=open]:[&_svg]:last:text-destructive-foreground"
      >
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent align="center">
          <SelectItem value="value-1">Value 1</SelectItem>
          <SelectItem value="value-2">Value 2</SelectItem>
          <SelectItem value="value-3">Value 3</SelectItem>
        </SelectContent>
      </SelectPortal>
    </Select>
  ),
}

export const Disabled: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('combobox')

    await expect(trigger).toBeDisabled()

    trigger.click()

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(within(document.body).queryByRole('listbox')).not.toBeInTheDocument()
  },
  render: () => (
    <Select disabled>
      <SelectTrigger className="rounded-none disabled:opacity-40">
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent align="center">
          <SelectItem value="value-1">Value 1</SelectItem>
          <SelectItem value="value-2">Value 2</SelectItem>
          <SelectItem value="value-3">Value 3</SelectItem>
        </SelectContent>
      </SelectPortal>
    </Select>
  ),
}
