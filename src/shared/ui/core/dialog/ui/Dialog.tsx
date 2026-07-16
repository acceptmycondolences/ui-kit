import { IconX } from '@tabler/icons-react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

import { buttonVariants } from '../../button'
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from '../model/dialog.props'

export function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props} />
}

export function DialogClose({ className, size, variant, ...props }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
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
    </DialogPrimitive.Close>
  )
}

export function DialogContent({ className, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Content
      className={classNames(
        'fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100%-2rem)] w-full max-w-100 -translate-x-1/2 -translate-y-1/2 flex-col overflow-x-hidden overflow-y-auto rounded-3xl border bg-background text-foreground duration-150',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className,
      )}
      {...props}
    />
  )
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description className={classNames('text-lg text-secondary-foreground', className)} {...props} />
  )
}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={classNames('mx-auto flex w-full max-w-88 flex-col items-center gap-2 p-6 text-center', className)}
      {...props}
    />
  )
}

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={classNames(
        'fixed inset-0 z-50 bg-black/60 duration-150',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  )
}

export function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal {...props} />
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <DialogPrimitive.Title className={classNames('text-2xl font-semibold', className)} {...props} />
}

export function DialogTrigger({ className, size, variant, ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger className={classNames(buttonVariants({ size, variant }), className)} {...props} />
}
