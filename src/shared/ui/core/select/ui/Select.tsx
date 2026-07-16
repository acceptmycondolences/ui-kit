import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { Select as SelectPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

import { buttonVariants } from '../../button'
import type {
  SelectContentProps,
  SelectItemProps,
  SelectPortalProps,
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
} from '../model/select.props'

export function Select({ ...props }: SelectProps) {
  return <SelectPrimitive.Root {...props} />
}

export function SelectContent({ children, className, sideOffset = 8, ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Content
      className={classNames(
        'z-50 max-h-(--radix-select-content-available-height) min-h-(--radix-select-trigger-height) max-w-(--radix-select-content-available-width) min-w-(--radix-select-trigger-width) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl border bg-popover text-popover-foreground',
        'focus:ring-0',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className,
      )}
      position="popper"
      sideOffset={sideOffset}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-2">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  )
}

export function SelectItem({ children, className, size, variant, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={classNames(
        buttonVariants({
          className: classNames(
            'h-11 w-full justify-start gap-4 px-3 font-medium',
            'focus:bg-accent focus:text-accent-foreground focus:ring-0',
          ),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator asChild>
        <IconCheck className="ml-auto size-4 text-constructive" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export function SelectPortal({ ...props }: SelectPortalProps) {
  return <SelectPrimitive.Portal {...props} />
}

export function SelectTrigger({ children, className, size, variant, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={classNames(
        buttonVariants({
          className: classNames(
            'data-placeholder:text-muted-foreground',
            'data-[state=open]:[&_svg]:last:rotate-180 data-[state=open]:[&_svg]:last:text-primary',
          ),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <IconChevronDown className="ml-auto text-muted-foreground transition-transform" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectValue({ ...props }: SelectValueProps) {
  return <SelectPrimitive.Value {...props} />
}
