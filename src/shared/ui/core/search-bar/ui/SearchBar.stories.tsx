import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Button, SearchBar } from '~/shared/ui/core'

const meta = {
  args: {
    defaultOpen: false,
    initialValue: '',
    onClear: fn(),
    onOpenChange: fn(),
    onSearch: fn(),
    placeholder: 'Placeholder',
  },
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
      type: 'boolean',
    },
    autoComplete: {
      table: {
        disable: true,
      },
    },
    className: {
      control: 'text',
      description: 'Tailwind CSS v4.0',
      type: 'string',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state for uncontrolled usage. Has no effect if `open` is specified.',
      type: 'boolean',
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
    },
    initialValue: {
      control: 'text',
      description:
        'The controlled value from the parent component. If set, it overrides the internal value and keeps the search bar open.',
      type: 'string',
    },
    onClear: {
      description:
        'Called when the user clears the input field using the clear button or when the search bar is closed.',
      table: {
        disable: true,
      },
    },
    onOpenChange: {
      description: 'Called when the open state changes. Required for controlled `open` usage.',
      table: {
        disable: true,
      },
    },
    onSearch: {
      description:
        'Called with the current value when the user submits it by pressing Enter or closes the search bar with a non-empty input field.',
      table: {
        disable: true,
      },
    },
    open: {
      table: {
        disable: true,
      },
    },
  },
  component: SearchBar,
  parameters: {
    actions: {
      disable: true,
    },
  },
  title: 'Components/SearchBar',
} satisfies Meta<typeof SearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const openButton = canvas.getByRole('button', { name: 'Open' })

    await userEvent.click(openButton)
    await expect(args.onOpenChange).toHaveBeenCalledOnce()
    await expect(args.onOpenChange).toHaveBeenCalledWith(true)

    const input = canvas.getByRole('searchbox')

    await userEvent.type(input, 'payments{Enter}')
    await expect(args.onSearch).toHaveBeenCalledOnce()
    await expect(args.onSearch).toHaveBeenCalledWith('payments')

    await userEvent.click(canvas.getByRole('button', { name: 'Clear' }))
    await expect(input).toHaveValue('')
    await expect(args.onClear).toHaveBeenCalledOnce()

    await userEvent.type(input, 'close me{Escape}')
    await expect(args.onOpenChange).toHaveBeenCalledTimes(2)
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false)
    await expect(args.onClear).toHaveBeenCalledTimes(2)
    await expect(args.onSearch).toHaveBeenCalledOnce()
    await expect(openButton).toHaveFocus()
  },
  render: function DefaultRender({ defaultOpen, initialValue, onClear, onSearch, ...props }) {
    const [previousInitialValue, setPreviousInitialValue] = useState(initialValue)
    const [query, setQuery] = useState(initialValue ?? '')

    if (initialValue !== previousInitialValue) {
      setPreviousInitialValue(initialValue)
      setQuery(initialValue ?? '')
    }

    const handleClear = () => {
      onClear()
      setQuery('')
    }

    const handleSearch = (value: string) => {
      onSearch(value)
      setQuery(value)
    }

    const handleCopy = () => {
      setQuery('Copy me!')
    }

    return (
      <div className="ml-auto flex w-50 flex-col gap-4 md:w-100">
        <SearchBar
          key={String(defaultOpen)}
          {...props}
          defaultOpen={defaultOpen}
          initialValue={query}
          onClear={handleClear}
          onSearch={handleSearch}
        />
        <Button className="rounded-none" onClick={handleCopy}>
          Copy me!
        </Button>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('searchbox')
    const clearButton = canvas.getByRole('button', { name: 'Clear' })
    const openButton = canvas.getByRole('button', { name: 'Open' })

    await expect(input).toBeDisabled()
    await expect(input).toHaveAttribute('tabindex', '-1')
    await expect(clearButton).toBeDisabled()
    await expect(openButton).toBeDisabled()

    openButton.click()
    clearButton.click()

    await expect(openButton).toHaveAttribute('aria-expanded', 'false')
    await expect(args.onClear).not.toHaveBeenCalled()
    await expect(args.onOpenChange).not.toHaveBeenCalled()
    await expect(args.onSearch).not.toHaveBeenCalled()

    await userEvent.tab()

    await expect(input).not.toHaveFocus()
    await expect(clearButton).not.toHaveFocus()
    await expect(openButton).not.toHaveFocus()
  },
}
