import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

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
    interactions: {
      disable: true,
    },
  },
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center">
      <Checkbox />
    </div>
  ),
}

export const Indeterminate: Story = {
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
  render: () => (
    <div className="flex items-center">
      <Checkbox aria-invalid={true} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center">
      <Checkbox checked disabled />
    </div>
  ),
}
