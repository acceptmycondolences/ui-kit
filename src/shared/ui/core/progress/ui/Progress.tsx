import { Progress as ProgressPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

import type { ProgressProps } from '../model/progress.props'

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={classNames('h-1 w-full overflow-x-hidden rounded-lg bg-accent-disabled', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="size-full bg-constructive transition-all"
        style={{
          transform: `translateX(-${String(100 - (value ?? 0))}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
}
