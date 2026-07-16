import type { ComponentProps } from 'react'

export type SearchBarProps = Omit<ComponentProps<'input'>, 'defaultValue' | 'onChange' | 'type' | 'value'> & {
  defaultOpen?: boolean
  initialValue?: string
  onClear: () => void
  onOpenChange?: (open: boolean) => void
  onSearch: (value: string) => void
  open?: boolean
}
