import { cva } from 'class-variance-authority'

export const loadingDotsVariants = cva(
  'flex shrink-0 items-center justify-center gap-1 [&_span]:size-2 [&_span]:shrink-0 [&_span]:rounded-full [&_span]:bg-primary',
  {
    variants: {
      variant: {
        constructive: '[&_span]:bg-constructive-foreground',
        destructive: '[&_span]:bg-destructive-foreground',
        ghost: '[&_span]:bg-primary',
        outline: '[&_span]:bg-primary',
        secondary: '[&_span]:bg-secondary-foreground',
        textConstructive: '[&_span]:bg-constructive',
        textDestructive: '[&_span]:bg-destructive-foreground',
      },
    },
  },
)
