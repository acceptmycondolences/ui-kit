import { IconX } from '@tabler/icons-react'
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

import { buttonVariants } from '../../button'
import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
  AlertDialogXProps,
} from '../model/alert.dialog.props'

export function AlertDialog({ ...props }: AlertDialogProps) {
  return <AlertDialogPrimitive.Root {...props} />
}

export function AlertDialogAction({
  className,
  size = 'large',
  variant = 'constructive',
  ...props
}: AlertDialogActionProps) {
  return <AlertDialogPrimitive.Action className={classNames(buttonVariants({ size, variant }), className)} {...props} />
}

export function AlertDialogCancel({
  className,
  size = 'large',
  variant = 'outline',
  ...props
}: AlertDialogCancelProps) {
  return <AlertDialogPrimitive.Cancel className={classNames(buttonVariants({ size, variant }), className)} {...props} />
}

export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Content
      className={classNames(
        'fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100%-2rem)] w-full max-w-100 -translate-x-1/2 -translate-y-1/2 flex-col overflow-x-hidden overflow-y-auto rounded-3xl border bg-background text-foreground duration-150',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className,
      )}
      {...props}
    />
  )
}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      className={classNames('text-lg text-secondary-foreground', className)}
      {...props}
    />
  )
}

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <div className={classNames('grid grid-cols-2 items-center gap-4 border-t p-6', className)} {...props} />
}

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      className={classNames(
        'mx-auto flex w-full max-w-88 flex-col items-center gap-2 px-6 py-8 text-center',
        className,
      )}
      {...props}
    />
  )
}

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
      className={classNames(
        'fixed inset-0 z-50 bg-black/60 duration-150',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  )
}

export function AlertDialogPortal({ ...props }: AlertDialogPortalProps) {
  return <AlertDialogPrimitive.Portal {...props} />
}

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <AlertDialogPrimitive.Title className={classNames('text-2xl font-semibold', className)} {...props} />
}

export function AlertDialogTrigger({ className, size, variant, ...props }: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger className={classNames(buttonVariants({ size, variant }), className)} {...props} />
  )
}

export function AlertDialogX({ className, size, variant, ...props }: AlertDialogXProps) {
  return (
    <AlertDialogPrimitive.Cancel
      className={classNames(
        buttonVariants({
          className: classNames('absolute top-4 right-4 rounded-none text-muted-foreground', 'hover:text-primary'),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    >
      <IconX />
      <span className="sr-only">Close</span>
    </AlertDialogPrimitive.Cancel>
  )
}
