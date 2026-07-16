import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'
import type { Drawer as DrawerPrimitive } from 'vaul'

import type { buttonVariants } from '../../button'

export type DrawerCloseProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Close> & VariantProps<typeof buttonVariants>,
  'children'
>

export type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content>

export type DrawerDescriptionProps = ComponentProps<typeof DrawerPrimitive.Description>

export type DrawerHeaderProps = ComponentProps<'div'>

export type DrawerOverlayProps = ComponentProps<typeof DrawerPrimitive.Overlay>

export type DrawerPortalProps = ComponentProps<typeof DrawerPrimitive.Portal>

export type DrawerProps = ComponentProps<typeof DrawerPrimitive.Root>

export type DrawerTitleProps = ComponentProps<typeof DrawerPrimitive.Title>

export type DrawerTriggerProps = ComponentProps<typeof DrawerPrimitive.Trigger> & VariantProps<typeof buttonVariants>
