import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '~/shared/ui/core'

const meta = {
  component: Sheet,
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
  title: 'Components/Sheet',
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger className="rounded-none">Trigger</SheetTrigger>
      <SheetPortal>
        <SheetOverlay />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
          <div className="py-2 md:py-6">Content</div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  ),
}
