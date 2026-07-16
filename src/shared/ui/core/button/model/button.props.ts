import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'

import type { buttonVariants } from '../lib/button.variants'

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}
