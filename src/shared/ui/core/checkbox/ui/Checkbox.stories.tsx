import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Checkbox } from '~/shared/ui/core'

const meta = {
  component: Checkbox,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox')

    await userEvent.click(checkbox)

    await expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)

    await expect(checkbox).not.toBeChecked()
  },
  render: () => (
    <div className="flex items-center">
      <Checkbox />
    </div>
  ),
}

export const Indeterminate: Story = {
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox')

    await expect(checkbox).toBePartiallyChecked()

    await userEvent.click(checkbox)

    await expect(checkbox).toBeChecked()
  },
  render: function IndeterminateRender() {
    const [checked, setChecked] = useState<'indeterminate' | boolean>('indeterminate')

    return (
      <div className="flex items-center">
        <Checkbox checked={checked} onCheckedChange={setChecked} />
      </div>
    )
  },
}

export const Invalid: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
  },
  render: () => (
    <div className="flex items-center">
      <Checkbox aria-invalid={true} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    onCheckedChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox')

    await expect(checkbox).toBeDisabled()
    await expect(checkbox).toBeChecked()

    checkbox.click()

    await expect(args.onCheckedChange).not.toHaveBeenCalled()
    await expect(checkbox).toBeChecked()
  },
  render: ({ ...props }) => (
    <div className="flex items-center">
      <Checkbox {...props} />
    </div>
  ),
}
