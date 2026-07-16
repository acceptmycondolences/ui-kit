import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'

import type { loadingDotsVariants } from '../lib/loading-dots.variants'

export type LoadingDotsProps = Omit<ComponentProps<'div'>, 'children'> & VariantProps<typeof loadingDotsVariants>
