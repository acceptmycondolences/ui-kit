import { classNames } from '~/shared/lib'

import { LoadingDots } from '../../loading-dots'
import { buttonVariants } from '../lib/button.variants'
import type { ButtonProps } from '../model/button.props'

export function Button({
  'aria-busy': ariaBusy,
  children,
  className,
  disabled,
  isLoading = false,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      aria-busy={isLoading || ariaBusy}
      className={classNames(buttonVariants({ size, variant }), className)}
      data-loading={isLoading || undefined}
      disabled={isLoading ? true : disabled}
      type={type}
      {...props}
    >
      {isLoading ? <LoadingDots variant={variant} /> : children}
    </button>
  )
}
