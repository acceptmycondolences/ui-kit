import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import type { Select as SelectPrimitive } from 'radix-ui'

import type { buttonVariants } from '../../button'

export type SelectContentProps = Omit<ComponentProps<typeof SelectPrimitive.Content>, 'position'>

export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item> & VariantProps<typeof buttonVariants>

export type SelectPortalProps = ComponentProps<typeof SelectPrimitive.Portal>

export type SelectProps = ComponentProps<typeof SelectPrimitive.Root>

export type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger> & VariantProps<typeof buttonVariants>

export type SelectValueProps = ComponentProps<typeof SelectPrimitive.Value>
