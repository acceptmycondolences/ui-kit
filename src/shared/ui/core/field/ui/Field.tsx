import { useMemo } from 'react'

import { classNames } from '~/shared/lib'

import type { FieldDescriptionProps, FieldErrorProps, FieldGroupProps, FieldProps } from '../model/field.props'

export function Field({ className, ...props }: FieldProps) {
  return (
    <div
      className={classNames('flex flex-col gap-1', 'data-[invalid=true]:text-destructive-foreground', className)}
      role="group"
      {...props}
    />
  )
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return <p className={classNames('px-4 pb-2 text-sm font-semibold text-muted-foreground', className)} {...props} />
}

export function FieldError({ children, className, errors, ...props }: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueMessages = [...new Set(errors.map((error) => error.message).filter(Boolean))]

    if (uniqueMessages.length === 0) {
      return null
    }

    if (uniqueMessages.length === 1) {
      return uniqueMessages[0]
    }

    return (
      <ul className="flex list-disc flex-col gap-1 pl-4">
        {uniqueMessages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      className={classNames('px-4 pb-2 text-sm font-medium text-destructive-foreground', className)}
      role="alert"
      {...props}
    >
      {content}
    </div>
  )
}

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return <div className={classNames('flex flex-col gap-3', className)} {...props} />
}
