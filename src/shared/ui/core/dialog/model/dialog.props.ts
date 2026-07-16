import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import type { Dialog as DialogPrimitive } from 'radix-ui'

import type { buttonVariants } from '../../button'

export type DialogCloseProps = Omit<
  ComponentProps<typeof DialogPrimitive.Close> & VariantProps<typeof buttonVariants>,
  'children'
>

export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content>

export type DialogDescriptionProps = ComponentProps<typeof DialogPrimitive.Description>

export type DialogHeaderProps = ComponentProps<'div'>

export type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>

export type DialogPortalProps = ComponentProps<typeof DialogPrimitive.Portal>

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>

export type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger> & VariantProps<typeof buttonVariants>
