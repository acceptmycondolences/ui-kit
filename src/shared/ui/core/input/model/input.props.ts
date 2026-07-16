import type { ComponentProps, ReactNode } from 'react'

export type InputProps = ComponentProps<'input'> & {
  prefix?: ReactNode
  suffix?: ReactNode
}
