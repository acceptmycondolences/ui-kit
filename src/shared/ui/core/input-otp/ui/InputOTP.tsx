import { use } from 'react'

import { OTPInput, OTPInputContext } from 'input-otp'

import { classNames } from '~/shared/lib'

import type { InputOTPGroupProps, InputOTPProps, InputOTPSlotProps } from '../model/input-otp.props'

export function InputOTP({ containerClassName, spellCheck = false, ...props }: InputOTPProps) {
  return (
    <OTPInput
      containerClassName={classNames('has-disabled:opacity-40', containerClassName)}
      render={undefined}
      spellCheck={spellCheck}
      {...props}
    />
  )
}

export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return <div className={classNames('flex items-center justify-center gap-2', 'md:gap-3', className)} {...props} />
}

export function InputOTPSlot({ className, index, ...props }: InputOTPSlotProps) {
  const inputOTPContext = use(OTPInputContext)

  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      className={classNames(
        'group relative flex h-14.5 w-12 shrink-0 cursor-pointer items-center justify-center rounded-[1.125rem] bg-secondary p-4 text-xl font-semibold whitespace-nowrap transition-colors',
        'hover:bg-secondary/80',
        'aria-invalid:bg-destructive aria-invalid:text-destructive-foreground aria-invalid:ring-destructive-foreground/40!',
        'data-[active=true]:ring-3 data-[active=true]:ring-ring',
        'md:h-16 md:w-14',
        className,
      )}
      data-active={isActive}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={classNames(
              'h-5 w-0.5 animate-caret-blink rounded-full bg-constructive duration-1000',
              'group-aria-invalid:bg-destructive-foreground',
            )}
          />
        </div>
      )}
    </div>
  )
}
