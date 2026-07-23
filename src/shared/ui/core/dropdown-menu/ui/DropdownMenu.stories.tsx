import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

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
  type DropdownMenuProps,
} from '~/shared/ui/core'

type DropdownMenuStoryProps = DropdownMenuProps & {
  onItemClick: () => void
}

const meta: Meta<DropdownMenuStoryProps> = {
  args: {
    onItemClick: fn(),
  },
  component: DropdownMenu,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  title: 'Components/DropdownMenu',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const trigger = canvas.getByRole('button', { name: 'Trigger' })

    await userEvent.click(trigger)
    await expect(body.getByRole('menu')).toBeInTheDocument()

    await userEvent.keyboard('{ArrowDown}')
    await expect(body.getByRole('menuitem', { name: 'Value 1' })).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('menu')).not.toBeInTheDocument())

    await userEvent.click(trigger)
    await userEvent.click(body.getByRole('menuitem', { name: 'Value 1' }))
    await expect(args.onItemClick).toHaveBeenCalledOnce()
    await waitFor(() => expect(body.queryByRole('menu')).not.toBeInTheDocument())
  },
  render: ({ onItemClick, ...props }) => (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger className="rounded-none">Trigger</DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem className="h-11 px-3 font-medium" onClick={onItemClick}>
              Value 1
            </DropdownMenuItem>
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
