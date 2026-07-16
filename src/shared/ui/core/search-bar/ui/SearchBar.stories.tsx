import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Button, SearchBar } from '~/shared/ui/core'

const meta = {
  args: {
    defaultOpen: false,
    initialValue: '',
    onClear: fn(),
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
    interactions: {
      disable: true,
    },
  },
  title: 'Components/SearchBar',
} satisfies Meta<typeof SearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultRender({ defaultOpen, initialValue, ...props }) {
    const [previousInitialValue, setPreviousInitialValue] = useState(initialValue)
    const [query, setQuery] = useState(initialValue ?? '')

    if (initialValue !== previousInitialValue) {
      setPreviousInitialValue(initialValue)
      setQuery(initialValue ?? '')
    }

    const handleClear = () => {
      setQuery('')
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
          onSearch={setQuery}
        />
        <Button className="rounded-none" onClick={handleCopy}>
          Copy me!
        </Button>
      </div>
    )
  },
}
