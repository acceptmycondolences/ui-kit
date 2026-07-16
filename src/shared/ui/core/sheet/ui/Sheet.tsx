import { IconArrowLeft, IconX } from '@tabler/icons-react'
import { Dialog as SheetPrimitive } from 'radix-ui'

import { MEDIA_QUERIES } from '~/shared/config'
import { classNames, useMediaQuery } from '~/shared/lib'

import { Button, buttonVariants } from '../../button'
import type {
  SheetBackProps,
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetPortalProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps,
} from '../model/sheet.props'

export function Sheet({ ...props }: SheetProps) {
  return <SheetPrimitive.Root {...props} />
}

export function SheetBack({ className, ...props }: SheetBackProps) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.MEDIUM)

  return (
    <Button
      className={classNames('size-8 rounded-none', !isMobile && 'text-muted-foreground hover:text-primary', className)}
      {...props}
    >
      <IconArrowLeft />
      <span className="sr-only">Back</span>
    </Button>
  )
}

export function SheetClose({ className, size, variant, ...props }: SheetCloseProps) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.MEDIUM)

  return (
    <SheetPrimitive.Close
      className={classNames(
        buttonVariants({
          className: classNames('size-8 rounded-none', !isMobile && 'ml-auto text-muted-foreground hover:text-primary'),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    >
      {isMobile ? <IconArrowLeft /> : <IconX />}
      <span className="sr-only">Close</span>
    </SheetPrimitive.Close>
  )
}

export function SheetContent({ className, ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Content
      className={classNames(
        'fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col overflow-x-hidden overflow-y-auto border-l bg-background px-4 pt-3 pb-6 text-foreground transition ease-in-out',
        'md:max-w-112.5 md:p-6',
        'data-[state=closed]:animate-out data-[state=closed]:duration-150 data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:slide-in-from-right',
        className,
      )}
      {...props}
    />
  )
}

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description className={classNames('text-lg text-secondary-foreground', className)} {...props} />
  )
}

export function SheetHeader({ action, children, className, isClose = true, ...props }: SheetHeaderProps) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.MEDIUM)

  return (
    <div
      className={classNames(
        'flex items-start gap-4 pb-3',
        'md:border-b md:pb-4',
        isClose && !isMobile && 'flex-row-reverse',
      )}
    >
      {isClose ? <SheetClose /> : <SheetBack />}
      <div className={classNames('flex flex-col gap-2', className)} {...props}>
        {children}
      </div>
      {action && isMobile && <div className={classNames('ml-auto', '[&_button]:translate-y-0.5')}>{action}</div>}
    </div>
  )
}

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <SheetPrimitive.Overlay
      className={classNames(
        'fixed inset-0 z-50 bg-black/60 duration-150',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  )
}

export function SheetPortal({ ...props }: SheetPortalProps) {
  return <SheetPrimitive.Portal {...props} />
}

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return <SheetPrimitive.Title className={classNames('text-2xl font-semibold', className)} {...props} />
}

export function SheetTrigger({ className, size, variant, ...props }: SheetTriggerProps) {
  return <SheetPrimitive.Trigger className={classNames(buttonVariants({ size, variant }), className)} {...props} />
}
