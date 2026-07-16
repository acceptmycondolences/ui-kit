import { IconCheck, IconMinus } from '@tabler/icons-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

import type { CheckboxProps } from '../model/checkbox.props'

export function Checkbox({ checked, className, ...props }: CheckboxProps) {
  const isIndeterminate = checked === 'indeterminate'

  return (
    <CheckboxPrimitive.Root
      checked={checked}
      className={classNames(
        'peer inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm bg-secondary transition-colors',
        'disabled:pointer-events-none aria-invalid:bg-destructive aria-invalid:text-destructive-foreground aria-invalid:ring-destructive-foreground/40',
        'data-[state=checked]:bg-constructive data-[state=checked]:text-constructive-foreground data-[state=checked]:hover:bg-constructive-active data-[state=checked]:hover:text-constructive-foreground-active data-[state=checked]:disabled:bg-constructive-disabled data-[state=checked]:disabled:text-constructive-foreground-disabled data-[state=checked]:aria-invalid:bg-destructive data-[state=checked]:aria-invalid:text-destructive-foreground data-[state=checked]:aria-invalid:hover:bg-destructive-active data-[state=checked]:aria-invalid:hover:text-destructive-foreground-active',
        '[&_svg]:size-4',
        isIndeterminate && 'text-constructive',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator asChild>
        {isIndeterminate ? <IconMinus /> : <IconCheck />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
