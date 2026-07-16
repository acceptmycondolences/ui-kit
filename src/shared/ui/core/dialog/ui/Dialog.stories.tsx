import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '~/shared/ui/core'

const meta = {
  component: Dialog,
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
  title: 'Components/Dialog',
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="rounded-none">Trigger</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <div className="mx-6 h-px border-t" />
          <div className="p-6">Content</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
}
