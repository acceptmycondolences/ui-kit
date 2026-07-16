import type { VariantProps } from 'class-variance-authority'

import type { buttonVariants } from '../lib/button.variants'

export type ButtonSize = VariantProps<typeof buttonVariants>['size']

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
