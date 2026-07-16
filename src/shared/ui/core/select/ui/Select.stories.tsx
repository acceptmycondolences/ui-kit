import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select, SelectContent, SelectItem, SelectPortal, SelectTrigger, SelectValue } from '~/shared/ui/core'

const meta = {
  component: Select,
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
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
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
