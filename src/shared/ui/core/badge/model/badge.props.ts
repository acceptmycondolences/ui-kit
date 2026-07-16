import type { ComponentProps } from 'react'

import type { VariantProps } from 'class-variance-authority'

import type { badgeVariants } from '../lib/badge.variants'

export type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>
