import { IconX } from '@tabler/icons-react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { classNames } from '~/shared/lib'

import { buttonVariants } from '../../button'
import type {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerPortalProps,
  DrawerProps,
  DrawerTitleProps,
  DrawerTriggerProps,
} from '../model/drawer.props'

export function Drawer({ ...props }: DrawerProps) {
  return <DrawerPrimitive.Root {...props} direction="bottom" />
}

export function DrawerClose({ className, size, variant, ...props }: DrawerCloseProps) {
  return (
    <DrawerPrimitive.Close
      className={classNames(
        buttonVariants({
          className: classNames(
            'size-6 translate-y-0.5 bg-secondary',
            'hover:bg-secondary/80',
            '[&_svg]:size-4 [&_svg]:text-secondary-foreground',
          ),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    >
      <IconX />
      <span className="sr-only">Close</span>
    </DrawerPrimitive.Close>
  )
}

export function DrawerContent({ children, className, ...props }: DrawerContentProps) {
  return (
    <DrawerPrimitive.Content
      className={classNames(
        'fixed z-50 flex flex-col bg-background px-4 pb-6 text-foreground duration-150',
        'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[99dvh] data-[vaul-drawer-direction=bottom]:rounded-t-3xl data-[vaul-drawer-direction=bottom]:border-t',
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-1.5 mb-4 h-1 w-9 shrink-0 rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  )
}

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description className={classNames('text-lg text-secondary-foreground', className)} {...props} />
  )
}

export function DrawerHeader({ children, className, ...props }: DrawerHeaderProps) {
  return (
    <div className="flex justify-between gap-4">
      <div className={classNames('flex flex-col gap-2', className)} {...props}>
        {children}
      </div>
      <DrawerClose />
    </div>
  )
}

export function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Overlay
      className={classNames(
        'fixed inset-0 z-50 bg-black/60 duration-150',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  )
}

export function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal {...props} />
}

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return <DrawerPrimitive.Title className={classNames('text-2xl font-semibold', className)} {...props} />
}

export function DrawerTrigger({ className, size, variant, ...props }: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger className={classNames(buttonVariants({ size, variant }), className)} {...props} />
}
