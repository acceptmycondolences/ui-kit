import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-clip-padding whitespace-nowrap transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      size: {
        large: 'h-14 gap-2 px-4 text-xl font-semibold',
        medium: 'h-10 gap-1 px-4 py-2 text-lg font-medium',
        small: 'h-7 gap-1 px-4 py-1 font-medium',
      },
      variant: {
        constructive:
          'bg-constructive text-constructive-foreground hover:bg-constructive-active hover:text-constructive-foreground-active [&:disabled:not([data-loading])]:bg-constructive-disabled [&:disabled:not([data-loading])]:text-constructive-foreground-disabled',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-active hover:text-destructive-foreground-active [&:disabled:not([data-loading])]:bg-destructive-disabled [&:disabled:not([data-loading])]:text-destructive-foreground-disabled',
        ghost:
          'hover:bg-accent hover:text-accent-foreground [&:disabled:not([data-loading])]:text-accent-foreground-disabled',
        outline:
          'border-primary hover:bg-accent hover:text-accent-foreground [&:disabled:not([data-loading])]:border-accent-disabled [&:disabled:not([data-loading])]:text-accent-foreground-disabled',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 [&:disabled:not([data-loading])]:bg-secondary-disabled [&:disabled:not([data-loading])]:text-secondary-foreground-disabled',
        textConstructive:
          'text-constructive hover:text-constructive-active [&:disabled:not([data-loading])]:text-constructive-foreground-disabled',
        textDestructive:
          'text-destructive-foreground hover:text-destructive-foreground-active [&:disabled:not([data-loading])]:text-destructive-foreground-disabled',
      },
    },
  },
)
