import { classNames } from '~/shared/lib'

import { LoadingDots } from '../../loading-dots'
import { buttonVariants } from '../lib/button.variants'
import type { ButtonProps } from '../model/button.props'

export function Button({
  children,
  className,
  isLoading = false,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(buttonVariants({ size, variant }), className, isLoading && 'pointer-events-none')}
      tabIndex={isLoading ? -1 : 0}
      type={type}
      {...props}
    >
      {isLoading ? <LoadingDots variant={variant} /> : children}
    </button>
  )
}
