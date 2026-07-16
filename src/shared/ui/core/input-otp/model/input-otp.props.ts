import type { ComponentProps } from 'react'

import type { OTPInput } from 'input-otp'

export type InputOTPGroupProps = ComponentProps<'div'>

export type InputOTPProps = Omit<ComponentProps<typeof OTPInput>, 'render'>

export type InputOTPSlotProps = ComponentProps<'div'> & {
  index: number
}
