import { IconChevronDown } from '@tabler/icons-react'
import { Popover as PopoverPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

import { buttonVariants } from '../../button'
import type { PopoverContentProps, PopoverPortalProps, PopoverProps, PopoverTriggerProps } from '../model/popover.props'

export function Popover({ ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />
}

export function PopoverContent({ className, sideOffset = 8, ...props }: PopoverContentProps) {
  return (
    <PopoverPrimitive.Content
      className={classNames(
        'z-50 max-h-(--radix-popover-content-available-height) min-h-(--radix-popover-trigger-height) max-w-(--radix-popover-content-available-width) min-w-(--radix-popover-trigger-width) origin-(--radix-popover-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl border bg-popover text-popover-foreground',
        'focus:ring-0',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className,
      )}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export function PopoverPortal({ ...props }: PopoverPortalProps) {
  return <PopoverPrimitive.Portal {...props} />
}

export function PopoverTrigger({ children, className, size, variant, ...props }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
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
      <IconChevronDown className="ml-auto text-muted-foreground transition-transform" />
    </PopoverPrimitive.Trigger>
  )
}
