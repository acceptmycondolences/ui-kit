import { useId } from 'react'

import { classNames, useMeasure } from '~/shared/lib'

import type { InputProps } from '../model/input.props'

export function Input({
  'aria-describedby': ariaDescribedby,
  autoComplete = 'off',
  className,
  id,
  placeholder,
  prefix,
  style,
  suffix,
  type = 'text',
  value,
  ...props
}: InputProps) {
  const generatedId = useId()

  const inputId = id ?? generatedId

  const [prefixRef, prefixWidth] = useMeasure()
  const [suffixRef, suffixWidth] = useMeasure()

  const inputAriaDescribedby =
    [ariaDescribedby, prefix && `${inputId}-prefix`, suffix && `${inputId}-suffix`].filter(Boolean).join(' ') ||
    undefined

  return (
    <div className="relative">
      <input
        aria-describedby={inputAriaDescribedby}
        autoComplete={autoComplete}
        className={classNames(
          'peer inline-flex h-14.5 w-full rounded-[1.125rem] bg-muted px-4 pt-5.5 pb-1.5 text-lg font-medium caret-constructive transition',
          'disabled:pointer-events-none disabled:opacity-40 aria-invalid:bg-destructive aria-invalid:text-destructive-foreground aria-invalid:caret-destructive-foreground aria-invalid:ring-destructive-foreground/40',
          className,
        )}
        id={inputId}
        placeholder=" "
        style={{
          ...style,
          ...(prefix && {
            paddingLeft: `${String(prefixWidth + 20)}px`,
          }),
          ...(suffix && {
            paddingRight: `${String(suffixWidth + 20)}px`,
          }),
        }}
        type={type}
        value={value}
        {...props}
      />
      {prefix && (
        <span
          className={classNames(
            'pointer-events-none absolute bottom-1.75 left-4 text-lg font-medium transition',
            'peer-aria-invalid:text-destructive-foreground',
            value ? 'opacity-100 peer-disabled:opacity-40' : 'opacity-0 peer-focus:opacity-100',
          )}
          id={`${inputId}-prefix`}
          ref={prefixRef}
        >
          {prefix}
        </span>
      )}
      {suffix && (
        <span
          className={classNames(
            'pointer-events-none absolute right-4 bottom-1.75 text-sm font-medium text-muted-foreground transition',
            'peer-aria-invalid:text-destructive-foreground',
            value ? 'opacity-100 peer-disabled:opacity-40' : 'opacity-0 peer-focus:opacity-100',
          )}
          id={`${inputId}-suffix`}
          ref={suffixRef}
        >
          {suffix}
        </span>
      )}
      <label
        className={classNames(
          'pointer-events-none absolute top-0 left-4 origin-top-left text-lg font-medium text-muted-foreground transition',
          'peer-placeholder-shown:translate-y-1/2 peer-focus:translate-y-1.5 peer-focus:scale-75 peer-disabled:opacity-40 peer-aria-invalid:text-destructive-foreground peer-[:not(:placeholder-shown)]:translate-y-1.5 peer-[:not(:placeholder-shown)]:scale-75',
        )}
        htmlFor={inputId}
      >
        {placeholder}
      </label>
    </div>
  )
}
