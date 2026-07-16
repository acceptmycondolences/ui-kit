import { classNames } from '~/shared/lib'

import type { AlertDescriptionProps, AlertProps, AlertTitleProps } from '../model/alert.props'

export function Alert({ className, ...props }: AlertProps) {
  return (
    <div
      className={classNames(
        'grid rounded-2xl bg-destructive p-3',
        'has-[svg]:grid-cols-[auto_1fr] has-[svg]:gap-x-3',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:translate-y-0.5 [&_svg]:text-destructive-foreground',
        className,
      )}
      role="alert"
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <div className={classNames('col-start-2 text-sm', className)} {...props} />
}

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <div className={classNames('col-start-2 text-sm font-medium', className)} {...props} />
}
