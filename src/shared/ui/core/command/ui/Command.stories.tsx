import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCheck } from '@tabler/icons-react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import type { SelectOption } from '~/shared/lib'
import {
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type CommandProps,
} from '~/shared/ui/core'

type CommandStoryProps = CommandProps & {
  onSelect: (value: string) => void
}

const meta: Meta<CommandStoryProps> = {
  args: {
    onSelect: fn(),
  },
  component: Command,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  title: 'Components/Command',
}

export default meta

type Story = StoryObj<typeof meta>

const OPTIONS: SelectOption[] = [
  {
    label: 'Label 1',
    value: 'value-1',
  },
  {
    label: 'Label 2',
    value: 'value-2',
  },
  {
    label: 'Label 3',
    value: 'value-3',
  },
]

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox')

    await userEvent.type(input, 'Label 1')
    await expect(canvas.queryByRole('option', { name: 'Label 2' })).not.toBeInTheDocument()
    await expect(canvas.getByRole('option', { name: 'Label 1' })).toBeInTheDocument()

    await userEvent.clear(input)
    await userEvent.type(input, 'Missing')
    await expect(canvas.getByText('Title')).toBeInTheDocument()
    await expect(canvas.getByText('Description')).toBeInTheDocument()

    await userEvent.clear(input)
    await userEvent.keyboard('{Home}{Enter}')
    await expect(args.onSelect).toHaveBeenCalledOnce()
    await expect(args.onSelect).toHaveBeenCalledWith('value-1')
  },
  render: function DefaultRender({ onSelect, ...props }) {
    const [selected, setSelected] = useState('')

    const handleSelect = (newValue: string) => {
      onSelect(newValue)
      setSelected(newValue)
    }

    return (
      <div className="w-75">
        <Command {...props}>
          <CommandInput placeholder="Placeholder" />
          <CommandList>
            <CommandEmpty className="py-4" description="Description" title="Title" />
            <CommandGroup className="py-4">
              {OPTIONS.map((option) => (
                <CommandItem
                  className="min-h-11 gap-4 p-3 font-medium [&_svg]:ml-auto [&_svg]:size-4 [&_svg]:text-constructive"
                  key={option.value}
                  keywords={[option.label]}
                  onSelect={handleSelect}
                  value={option.value}
                >
                  {option.label} {selected === option.value && <IconCheck />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    )
  },
}

export const WithPopover: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const trigger = canvas.getByRole('button', { name: 'Trigger' })

    await userEvent.click(trigger)
    const checkbox = body.getByRole('checkbox', { name: 'Label 2' })

    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())

    await userEvent.click(trigger)
    await expect(body.getByRole('checkbox', { name: 'Label 2' })).toBeChecked()
  },
  render: function WithPopoverRender() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState<string[]>([])

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen)

      if (!newOpen) {
        setSearch('')
      }
    }

    const toggleAll = () => {
      setSelected((previousValue) => {
        if (previousValue.length === 0) {
          return OPTIONS.map((option) => option.value)
        }

        return []
      })
    }

    const toggleValue = (newValue: string) => {
      setSelected((previousValue) =>
        previousValue.includes(newValue)
          ? previousValue.filter((value) => value !== newValue)
          : [...previousValue, newValue],
      )
    }

    const isAllSelected = selected.length === OPTIONS.length
    const isIndeterminate = selected.length > 0 && !isAllSelected

    const checked = isAllSelected ? true : isIndeterminate ? 'indeterminate' : false

    return (
      <Popover onOpenChange={handleOpenChange} open={open}>
        <PopoverTrigger className="rounded-none">Trigger</PopoverTrigger>
        <PopoverContent align="start" className="w-75">
          <Command>
            <div className="px-4 pt-4 pb-2">
              <CommandInput onValueChange={setSearch} placeholder="Placeholder" value={search} variant="small" />
            </div>
            <CommandList>
              <CommandEmpty className="pt-2 pb-4" description="Description" title="Title" />
              {search.length === 0 && (
                <CommandGroup className="px-4 pb-2">
                  <CommandItem>
                    <Checkbox
                      checked={checked}
                      id="all"
                      onCheckedChange={() => {
                        toggleAll()
                      }}
                    />
                    <label
                      className="inline-flex min-h-10.5 flex-1 cursor-pointer items-center pl-4 text-sm font-medium peer-data-[state=checked]:text-primary"
                      htmlFor="all"
                    >
                      All
                    </label>
                  </CommandItem>
                </CommandGroup>
              )}
              <CommandSeparator />
              <CommandGroup className="px-4 pt-2 pb-4">
                {OPTIONS.map((option) => (
                  <CommandItem key={option.value} keywords={[option.label]}>
                    <Checkbox
                      checked={selected.includes(option.value)}
                      id={option.value}
                      onCheckedChange={() => {
                        toggleValue(option.value)
                      }}
                    />
                    <label
                      className="inline-flex min-h-10.5 flex-1 cursor-pointer items-center pl-4 text-sm font-medium peer-data-[state=checked]:text-primary"
                      htmlFor={option.value}
                    >
                      {option.label}
                    </label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
}
