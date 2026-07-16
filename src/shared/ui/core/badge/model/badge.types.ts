import type { VariantProps } from 'class-variance-authority'

import type { badgeVariants } from '../lib/badge.variants'

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant']
