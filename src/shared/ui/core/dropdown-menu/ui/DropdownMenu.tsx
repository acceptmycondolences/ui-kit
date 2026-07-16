import { IconCheck } from '@tabler/icons-react'
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

import { buttonVariants } from '../../button'
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuPortalProps,
  DropdownMenuProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from '../model/dropdown-menu.props'

export function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} />
}

export function DropdownMenuCheckboxItem({
  children,
  className,
  size,
  variant,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={classNames(
        buttonVariants({
          className: classNames('w-full justify-start', 'focus:bg-accent focus:text-accent-foreground focus:ring-0'),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator asChild>
        <IconCheck className="ml-auto size-4 text-constructive" />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

export function DropdownMenuContent({ className, sideOffset = 8, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Content
      className={classNames(
        'z-50 max-h-(--radix-dropdown-menu-content-available-height) min-h-(--radix-dropdown-menu-trigger-height) max-w-(--radix-dropdown-menu-content-available-width) min-w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl border bg-popover p-2 text-popover-foreground',
        'focus:ring-0',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className,
      )}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
  return <div {...props} />
}

export function DropdownMenuItem({ className, size, variant, ...props }: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={classNames(
        buttonVariants({
          className: classNames('w-full justify-start', 'focus:bg-accent focus:text-accent-foreground focus:ring-0'),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    />
  )
}

export function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return <DropdownMenuPrimitive.Portal {...props} />
}

export function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub {...props} />
}

export function DropdownMenuSubContent({ className, sideOffset = 16, ...props }: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={classNames(
        'z-50 max-h-(--radix-dropdown-menu-content-available-height) min-h-(--radix-dropdown-menu-trigger-height) max-w-(--radix-dropdown-menu-content-available-width) min-w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl border bg-popover p-2 text-popover-foreground',
        'focus:ring-0',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className,
      )}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export function DropdownMenuSubTrigger({ className, size, variant, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={classNames(
        buttonVariants({
          className: classNames('w-full justify-start', 'focus:bg-accent focus:text-accent-foreground focus:ring-0'),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    />
  )
}

export function DropdownMenuTrigger({ className, size, variant, ...props }: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger
      className={classNames(
        buttonVariants({
          size,
          variant,
        }),
        className,
      )}
      {...props}
    />
  )
}
