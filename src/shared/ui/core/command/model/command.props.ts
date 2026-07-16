import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import type { Command as CommandPrimitive } from 'cmdk'

import type { buttonVariants } from '../../button'

export type CommandEmptyProps = Omit<
  ComponentProps<typeof CommandPrimitive.Empty> & {
    description: string
    title: string
  },
  'children'
>

export type CommandGroupProps = Omit<ComponentProps<typeof CommandPrimitive.Group>, 'heading'>

export type CommandInputProps = ComponentProps<typeof CommandPrimitive.Input> & {
  variant?: 'large' | 'small'
}

export type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item> & VariantProps<typeof buttonVariants>

export type CommandListProps = ComponentProps<typeof CommandPrimitive.List>

export type CommandProps = ComponentProps<typeof CommandPrimitive>

export type CommandSeparatorProps = ComponentProps<typeof CommandPrimitive.Separator>
