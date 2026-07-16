import type { VariantProps } from 'class-variance-authority'

import type { loadingDotsVariants } from '../lib/loading-dots.variants'

export type LoadingDotsVariant = VariantProps<typeof loadingDotsVariants>['variant']
