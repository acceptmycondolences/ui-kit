import { classNames } from '~/shared/lib'

import { badgeVariants } from '../lib/badge.variants'
import type { BadgeProps } from '../model/badge.props'

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={classNames(badgeVariants({ variant }), className)} {...props} />
}
