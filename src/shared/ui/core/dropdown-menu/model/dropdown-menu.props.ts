import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import type { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import type { buttonVariants } from '../../button'

export type DropdownMenuCheckboxItemProps = ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> &
  VariantProps<typeof buttonVariants>

export type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive.Content>

export type DropdownMenuGroupProps = ComponentProps<'div'>

export type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> &
  VariantProps<typeof buttonVariants>

export type DropdownMenuPortalProps = ComponentProps<typeof DropdownMenuPrimitive.Portal>

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive.Root>

export type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuPrimitive.SubContent>

export type DropdownMenuSubProps = ComponentProps<typeof DropdownMenuPrimitive.Sub>

export type DropdownMenuSubTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> &
  VariantProps<typeof buttonVariants>

export type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.Trigger> &
  VariantProps<typeof buttonVariants>
