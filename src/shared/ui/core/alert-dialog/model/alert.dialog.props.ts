import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import type { AlertDialog as AlertDialogPrimitive } from 'radix-ui'

import type { buttonVariants } from '../../button'

export type AlertDialogActionProps = ComponentProps<typeof AlertDialogPrimitive.Action> &
  VariantProps<typeof buttonVariants>

export type AlertDialogCancelProps = ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  VariantProps<typeof buttonVariants>

export type AlertDialogContentProps = ComponentProps<typeof AlertDialogPrimitive.Content>

export type AlertDialogDescriptionProps = ComponentProps<typeof AlertDialogPrimitive.Description>

export type AlertDialogFooterProps = ComponentProps<'div'>

export type AlertDialogHeaderProps = ComponentProps<'div'>

export type AlertDialogOverlayProps = ComponentProps<typeof AlertDialogPrimitive.Overlay>

export type AlertDialogPortalProps = ComponentProps<typeof AlertDialogPrimitive.Portal>

export type AlertDialogProps = ComponentProps<typeof AlertDialogPrimitive.Root>

export type AlertDialogTitleProps = ComponentProps<typeof AlertDialogPrimitive.Title>

export type AlertDialogTriggerProps = ComponentProps<typeof AlertDialogPrimitive.Trigger> &
  VariantProps<typeof buttonVariants>

export type AlertDialogXProps = Omit<
  ComponentProps<typeof AlertDialogPrimitive.Cancel> & VariantProps<typeof buttonVariants>,
  'children'
>
