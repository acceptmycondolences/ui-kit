import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full border border-transparent bg-clip-padding px-2.5 py-1 text-xs whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        constructive: 'bg-constructive text-constructive-foreground',
        constructiveSoft: 'bg-[#EDFAF3] text-constructive dark:bg-[#08381E]',
        destructive: 'bg-destructive-foreground text-white',
        destructiveSoft: 'bg-destructive text-destructive-foreground',
        informative: 'bg-informative text-informative-foreground',
        informativeSoft: 'bg-[#ECF6FF] text-informative dark:bg-[#062A4C]',
        muted: 'bg-muted-foreground text-white',
        mutedSoft: 'bg-muted text-accent-foreground',
        warning: 'bg-warning text-warning-foreground',
        warningSoft: 'bg-[#FEF8EB] text-warning dark:bg-[#4A3100]',
      },
    },
  },
)
