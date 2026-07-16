import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import { Popover as PopoverPrimitive } from 'radix-ui'

import type { buttonVariants } from '../../button'

export type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Content>

export type PopoverPortalProps = ComponentProps<typeof PopoverPrimitive.Portal>

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>

export type PopoverTriggerProps = ComponentProps<typeof PopoverPrimitive.Trigger> & VariantProps<typeof buttonVariants>
