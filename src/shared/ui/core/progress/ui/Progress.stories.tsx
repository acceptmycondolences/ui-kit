import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from '~/shared/ui/core'

const meta = {
  component: Progress,
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
  title: 'Components/Progress',
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultRender() {
    const [value, setValue] = useState(0)

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setValue(50)
      }, 300)

      return () => {
        clearTimeout(timeoutId)
      }
    }, [])

    return (
      <div className="w-50 md:w-100">
        <Progress value={value} />
      </div>
    )
  },
}
