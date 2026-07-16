import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'

import { Button, Toaster } from '~/shared/ui/core'

const meta = {
  component: Toaster,
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
  title: 'Components/Toaster',
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

const makeStory = (method: (...args: Parameters<typeof toast>) => ReturnType<typeof toast>, label: string): Story => ({
  render: () => {
    const handleClick = () => {
      method('Title', {
        closeButton: true,
        description: 'Description',
      })
    }

    return (
      <>
        <Toaster />
        <Button className="rounded-none" onClick={handleClick}>
          {label}
        </Button>
      </>
    )
  },
})

export const Default: Story = makeStory(toast, 'Default')

export const Error: Story = makeStory(toast.error, 'Error')

export const Info: Story = makeStory(toast.info, 'Info')

export const Loading: Story = makeStory(toast.loading, 'Loading')

export const Success: Story = makeStory(toast.success, 'Success')

export const Warning: Story = makeStory(toast.warning, 'Warning')
