import type { ComponentProps } from 'react'

export type FieldDescriptionProps = ComponentProps<'p'>

export type FieldErrorProps = ComponentProps<'div'> & {
  errors?: {
    message?: string
  }[]
}

export type FieldGroupProps = ComponentProps<'div'>

export type FieldProps = ComponentProps<'div'>
