import { classNames } from '~/shared/lib'

import type { TextareaProps } from '../model/textarea.props'

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={classNames(
        'flex min-h-34 resize-none rounded-[1.125rem] bg-muted px-4 py-2 text-lg font-medium caret-constructive transition',
        'placeholder:text-muted-foreground',
        'disabled:pointer-events-none disabled:opacity-40 aria-invalid:bg-destructive aria-invalid:text-destructive-foreground aria-invalid:caret-destructive-foreground aria-invalid:ring-destructive-foreground/40 aria-invalid:placeholder:text-destructive-foreground',
        className,
      )}
      {...props}
    />
  )
}
