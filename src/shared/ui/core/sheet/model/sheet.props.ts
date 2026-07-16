import type { ComponentProps, ReactNode } from 'react'

import type { VariantProps } from 'class-variance-authority'
import type { Dialog as SheetPrimitive } from 'radix-ui'

import type { Button, buttonVariants } from '../../button'

export type SheetBackProps = Omit<ComponentProps<typeof Button>, 'children'>

export type SheetCloseProps = Omit<
  ComponentProps<typeof SheetPrimitive.Close> & VariantProps<typeof buttonVariants>,
  'children'
>

export type SheetContentProps = ComponentProps<typeof SheetPrimitive.Content>

export type SheetDescriptionProps = ComponentProps<typeof SheetPrimitive.Description>

export type SheetHeaderProps = ComponentProps<'div'> & {
  action?: ReactNode
  isClose?: boolean
}

export type SheetOverlayProps = ComponentProps<typeof SheetPrimitive.Overlay>

export type SheetPortalProps = ComponentProps<typeof SheetPrimitive.Portal>

export type SheetProps = ComponentProps<typeof SheetPrimitive.Root>

export type SheetTitleProps = ComponentProps<typeof SheetPrimitive.Title>

export type SheetTriggerProps = ComponentProps<typeof SheetPrimitive.Trigger> & VariantProps<typeof buttonVariants>
