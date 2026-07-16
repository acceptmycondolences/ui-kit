import { classNames } from '~/shared/lib'

import { loadingDotsVariants } from '../lib/loading-dots.variants'
import type { LoadingDotsProps } from '../model/loading-dots.props'

export function LoadingDots({ className, variant, ...props }: LoadingDotsProps) {
  return (
    <div
      aria-label="Loading"
      className={classNames(loadingDotsVariants({ variant }), className)}
      role="status"
      {...props}
    >
      <span className="animate-bounce delay-0" />
      <span className="animate-bounce delay-200" />
      <span className="animate-bounce delay-400" />
    </div>
  )
}
