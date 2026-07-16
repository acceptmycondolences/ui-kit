import { useId, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'

import { IconSearch, IconX } from '@tabler/icons-react'

import { classNames } from '~/shared/lib'

import { Button } from '../../button'
import type { SearchBarProps } from '../model/search-bar.props'

export function SearchBar({
  autoComplete = 'off',
  className,
  defaultOpen,
  id,
  initialValue,
  onClear,
  onKeyDown,
  onOpenChange,
  onSearch,
  open: openProp,
  ...props
}: SearchBarProps) {
  const [openState, setOpenState] = useState(defaultOpen ?? false)
  const [previousInitialValue, setPreviousInitialValue] = useState(initialValue)
  const [value, setValue] = useState(initialValue ?? '')

  const inputRef = useRef<HTMLInputElement | null>(null)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)

  const generatedId = useId()

  const inputId = id ?? generatedId

  const isControlled = openProp !== undefined

  const open = isControlled ? openProp : openState

  const isOpen = open || !!initialValue

  if (initialValue !== previousInitialValue) {
    setPreviousInitialValue(initialValue)
    setValue(initialValue ?? '')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setOpenState(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }

  const handleClose = () => {
    setOpen(false)

    if (value) {
      setValue('')

      onClear()
    }

    toggleButtonRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)

    if (event.key === 'Escape') {
      handleClose()

      return
    }

    if (event.key === 'Enter' && value.trim()) {
      onSearch(value)
    }
  }

  const handleClear = () => {
    setValue('')

    onClear()

    inputRef.current?.focus()
  }

  const toggleOpen = () => {
    if (isOpen) {
      if (value.trim()) {
        onSearch(value)

        return
      }

      handleClose()
    } else {
      setOpen(true)

      if (inputRef.current) {
        inputRef.current.addEventListener(
          'transitionend',
          () => {
            inputRef.current?.focus()
          },
          {
            once: true,
          },
        )
      }
    }
  }

  return (
    <div className="relative flex h-10 flex-row-reverse items-center">
      <input
        autoComplete={autoComplete}
        className={classNames(
          'peer inline-flex h-full rounded-full bg-muted text-sm font-medium caret-constructive transition-all duration-300 ease-in-out',
          'placeholder:text-muted-foreground',
          'disabled:pointer-events-none disabled:opacity-40 aria-invalid:bg-destructive aria-invalid:text-destructive-foreground aria-invalid:caret-destructive-foreground aria-invalid:ring-destructive-foreground/40 aria-invalid:placeholder:text-destructive-foreground',
          '[&::-webkit-search-cancel-button]:hidden',
          isOpen ? 'w-full py-2 pr-22.5 pl-4' : 'w-0 opacity-0',
          className,
        )}
        id={inputId}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        tabIndex={isOpen ? 0 : -1}
        type="search"
        value={value}
        {...props}
      />
      <Button
        className={classNames(
          'absolute top-1/2 right-11.5 size-9 -translate-y-1/2 text-muted-foreground transition-all duration-150 ease-in-out',
          'peer-disabled:pointer-events-none peer-disabled:text-accent-foreground-disabled',
          'hover:text-primary',
          isOpen && value ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0',
        )}
        onClick={handleClear}
        tabIndex={isOpen && value ? 0 : -1}
      >
        <IconX />
        <span className="sr-only">Clear</span>
      </Button>
      <Button
        aria-controls={inputId}
        aria-expanded={isOpen}
        className={classNames(
          'absolute top-1/2 right-0.5 size-9 -translate-y-1/2',
          'peer-disabled:pointer-events-none peer-disabled:bg-constructive-disabled peer-disabled:text-constructive-foreground-disabled',
          !isOpen && 'text-muted-foreground hover:text-primary',
        )}
        onClick={toggleOpen}
        ref={toggleButtonRef}
        variant={isOpen ? 'constructive' : undefined}
      >
        <IconSearch />
        <span className="sr-only">{isOpen ? (value.trim() ? 'Search' : 'Close') : 'Open'}</span>
      </Button>
    </div>
  )
}
