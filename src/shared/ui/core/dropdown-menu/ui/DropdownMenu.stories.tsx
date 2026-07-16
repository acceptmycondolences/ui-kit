import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/shared/ui/core'

const meta = {
  component: DropdownMenu,
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
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-none">Trigger</DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem className="h-11 px-3 font-medium">Value 1</DropdownMenuItem>
            <DropdownMenuItem className="h-11 px-3 font-medium">Value 2</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="h-11 px-3 font-medium">Value 3</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem className="h-11 px-3 font-medium">Checkbox Value 1</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="h-11 px-3 font-medium">
                  Checkbox Value 2
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="h-11 px-3 font-medium">Checkbox Value 3</DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  ),
}
