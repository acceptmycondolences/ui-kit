import { useId, useState, type ChangeEvent, type ClipboardEvent } from 'react'

import { Controller, type FieldPath, type FieldValues } from 'react-hook-form'

import { FIELD_LENGTHS } from '~/shared/config'
import {
  classNames,
  formatCreditCard,
  formatCreditCardExpiry,
  formatNumber,
  formatPhone,
  getFormDigitsValue,
  parseCreditCardExpiry,
  parseCreditCardNumber,
  parseInvoiceNumber,
  parseName,
  parsePhoneNumber,
  parsePinfl,
  parseReceiptNumber,
  parseTin,
} from '~/shared/lib'

import { Button } from '../../../core/button'
import { Checkbox } from '../../../core/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../../../core/command'
import { Field, FieldDescription, FieldError } from '../../../core/field'
import { Input } from '../../../core/input'
import { Popover, PopoverContent, PopoverTrigger } from '../../../core/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../core/select'
import { Textarea } from '../../../core/textarea'
import type {
  FormCardNumberFieldProps,
  FormComboboxFieldProps,
  FormComponentFieldProps,
  FormCurrencyFieldProps,
  FormFieldProps,
  FormInputFieldProps,
  FormPinflFieldProps,
  FormProps,
  FormSelectFieldProps,
  FormTextareaFieldProps,
} from '../model/form.props'

export function Form({ ...props }: FormProps) {
  return <form {...props} />
}

export function FormCardExpiryField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  ...props
}: FormComponentFieldProps<
  typeof Input,
  TFieldValues,
  TName,
  TTransformedValues,
  'autoComplete' | 'inputMode' | 'onPaste' | 'type'
> &
  FormInputFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const parsedValue = parseCreditCardExpiry(event.target.value)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault()

          const pastedData = event.clipboardData.getData('text')

          const parsedValue = parseCreditCardExpiry(pastedData)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        const formattedValue = field.value ? formatCreditCardExpiry(String(field.value)) : ''

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            autoComplete="cc-exp"
            inputMode="numeric"
            onPaste={handlePaste}
            placeholder={placeholder}
            {...field}
            onChange={handleChange}
            value={formattedValue}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

export function FormCardNumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  trigger,
  ...props
}: FormCardNumberFieldProps<TFieldValues> &
  FormComponentFieldProps<
    typeof Input,
    TFieldValues,
    TName,
    TTransformedValues,
    'autoComplete' | 'inputMode' | 'onPaste' | 'type'
  > &
  FormInputFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleParsedValue = (parsedValue: string) => {
          field.onChange(getFormDigitsValue(field.value, parsedValue))

          if (parsedValue.length === FIELD_LENGTHS.CARD_NUMBER) {
            setTimeout(() => {
              void trigger(name)
            })
          }
        }

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const parsedValue = parseCreditCardNumber(event.target.value)

          handleParsedValue(parsedValue)
        }

        const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault()

          const pastedData = event.clipboardData.getData('text')

          const parsedValue = parseCreditCardNumber(pastedData)

          handleParsedValue(parsedValue)
        }

        const formattedValue = field.value ? formatCreditCard(String(field.value)) : ''

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            autoComplete="cc-number"
            inputMode="numeric"
            onPaste={handlePaste}
            placeholder={placeholder}
            {...field}
            onChange={handleChange}
            value={formattedValue}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

export function FormComboboxField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  className,
  contentClassName,
  control,
  description,
  name,
  options,
  saveLabel,
  selectedLabel,
  triggerLabel,
  ...props
}: FormComboboxFieldProps & FormComponentFieldProps<typeof PopoverTrigger, TFieldValues, TName, TTransformedValues>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)

    if (!newOpen) {
      setSearch('')
    }
  }

  const toggleAll = () => {
    setSelected((previousValue) => {
      if (previousValue.length === 0) {
        return options.map((option) => option.value)
      }

      return []
    })
  }

  const toggleValue = (newValue: string) => {
    setSelected((previousValue) =>
      previousValue.includes(newValue)
        ? previousValue.filter((value) => value !== newValue)
        : [...previousValue, newValue],
    )
  }

  const isAllSelected = selected.length === options.length
  const isIndeterminate = selected.length > 0 && !isAllSelected

  const checked = isAllSelected ? true : isIndeterminate ? 'indeterminate' : false

  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleSave = () => {
          field.onChange(selected)

          setOpen(false)
        }

        const value: string[] = field.value ?? []

        const savedCount = value.length

        return (
          <Popover onOpenChange={handleOpenChange} open={open}>
            <PopoverTrigger
              aria-describedby={describedBy}
              aria-invalid={fieldState.invalid}
              className={classNames(
                'h-14.5 rounded-[1.125rem] bg-muted px-4 py-1.5 text-lg font-medium transition',
                'disabled:pointer-events-none disabled:opacity-40 aria-invalid:bg-destructive aria-invalid:text-destructive-foreground aria-invalid:ring-destructive-foreground/40 aria-invalid:data-placeholder:text-destructive-foreground aria-invalid:[&_svg]:text-destructive-foreground aria-invalid:data-[state=open]:[&_svg]:last:text-destructive-foreground',
                savedCount === 0 && 'text-muted-foreground',
                className,
              )}
              onBlur={field.onBlur}
              ref={field.ref}
              {...props}
            >
              {typeof triggerLabel === 'function' ? triggerLabel(savedCount) : triggerLabel}
            </PopoverTrigger>
            <PopoverContent className={contentClassName}>
              <Command>
                <div className="px-4 pt-4 pb-2">
                  <CommandInput onValueChange={setSearch} placeholder="Placeholder" value={search} variant="small" />
                </div>
                <CommandList>
                  <CommandEmpty className="pt-2 pb-4" description="Description" title="Title" />
                  {search.length === 0 && (
                    <CommandGroup className="px-4 pb-2">
                      <CommandItem>
                        <Checkbox
                          checked={checked}
                          id="all"
                          onCheckedChange={() => {
                            toggleAll()
                          }}
                        />
                        <label
                          className="inline-flex min-h-10.5 flex-1 cursor-pointer items-center pl-4 text-sm font-medium peer-data-[state=checked]:text-primary"
                          htmlFor="all"
                        >
                          All
                        </label>
                      </CommandItem>
                    </CommandGroup>
                  )}
                  <CommandSeparator />
                  <CommandGroup className="px-4 py-2">
                    {options.map((option) => (
                      <CommandItem key={option.value} keywords={[option.label]}>
                        <Checkbox
                          checked={selected.includes(option.value)}
                          id={option.value}
                          onCheckedChange={() => {
                            toggleValue(option.value)
                          }}
                        />
                        <label
                          className="inline-flex min-h-10.5 flex-1 cursor-pointer items-center pl-4 text-sm font-medium peer-data-[state=checked]:text-primary"
                          htmlFor={option.value}
                        >
                          {option.label}
                        </label>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                <div className="mx-4 h-px border-t" />
                <div className="flex items-center gap-3 p-4">
                  <div className="flex-1 text-sm font-medium text-muted-foreground">
                    {typeof selectedLabel === 'function' ? selectedLabel(selected.length) : selectedLabel}
                  </div>
                  <Button onClick={handleSave} size="small" variant="outline">
                    {saveLabel}
                  </Button>
                </div>
              </Command>
            </PopoverContent>
          </Popover>
        )
      }}
    </FormField>
  )
}

export function FormCurrencyField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  suffix,
  ...props
}: FormComponentFieldProps<
  typeof Input,
  TFieldValues,
  TName,
  TTransformedValues,
  'autoComplete' | 'inputMode' | 'type'
> &
  FormCurrencyFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const digits = event.target.value.replace(/\D/g, '')

          field.onChange(Number(digits))
        }

        const formattedValue = formatNumber(field.value)

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            autoComplete="transaction-amount"
            inputMode="numeric"
            placeholder={placeholder}
            suffix={suffix}
            {...field}
            onChange={handleChange}
            value={formattedValue}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({ children, control, description, name }: FormFieldProps<TFieldValues, TName, TTransformedValues>) {
  const descriptionId = useId()
  const errorId = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const error = fieldState.error
        const hasErrorMessage = Boolean(error?.message)

        const describedBy = [description ? descriptionId : null, hasErrorMessage ? errorId : null]
          .filter(Boolean)
          .join(' ')

        return (
          <Field data-invalid={fieldState.invalid}>
            {children({
              describedBy: describedBy || undefined,
              field,
              fieldState,
              formState,
            })}
            {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
            {hasErrorMessage && error && <FieldError errors={[error]} id={errorId} />}
          </Field>
        )
      }}
    />
  )
}

export function FormInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  ...props
}: FormComponentFieldProps<typeof Input, TFieldValues, TName, TTransformedValues> & FormInputFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => (
        <Input
          aria-describedby={describedBy}
          aria-invalid={fieldState.invalid}
          placeholder={placeholder}
          {...field}
          {...props}
        />
      )}
    </FormField>
  )
}

export function FormInvoiceNumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  ...props
}: FormComponentFieldProps<
  typeof Input,
  TFieldValues,
  TName,
  TTransformedValues,
  'autoComplete' | 'inputMode' | 'onPaste' | 'type'
> &
  FormInputFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const parsedValue = parseInvoiceNumber(event.target.value)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault()

          const pastedData = event.clipboardData.getData('text')

          const parsedValue = parseInvoiceNumber(pastedData)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            inputMode="numeric"
            onPaste={handlePaste}
            placeholder={placeholder}
            {...field}
            onChange={handleChange}
            value={field.value ? String(field.value) : ''}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

export function FormNameField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  ...props
}: FormComponentFieldProps<typeof Input, TFieldValues, TName, TTransformedValues, 'autoComplete' | 'onPaste' | 'type'> &
  FormInputFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const parsedValue = parseName(event.target.value)

          field.onChange(parsedValue)
        }

        const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault()

          const pastedData = event.clipboardData.getData('text')

          const parsedValue = parseName(pastedData)

          field.onChange(parsedValue)
        }

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            autoComplete="name"
            onPaste={handlePaste}
            placeholder={placeholder}
            {...field}
            onChange={handleChange}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

export function FormPhoneField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  ...props
}: FormComponentFieldProps<
  typeof Input,
  TFieldValues,
  TName,
  TTransformedValues,
  'autoComplete' | 'inputMode' | 'onPaste' | 'prefix' | 'type'
> &
  FormInputFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const parsedValue = parsePhoneNumber(event.target.value)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault()

          const pastedData = event.clipboardData.getData('text')

          const parsedValue = parsePhoneNumber(pastedData)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        const formattedValue = field.value ? formatPhone(field.value) : ''

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            autoComplete="tel"
            inputMode="tel"
            onPaste={handlePaste}
            placeholder={placeholder}
            prefix="+998"
            type="tel"
            {...field}
            onChange={handleChange}
            value={formattedValue}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

export function FormPinflField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  trigger,
  ...props
}: FormComponentFieldProps<
  typeof Input,
  TFieldValues,
  TName,
  TTransformedValues,
  'autoComplete' | 'inputMode' | 'onPaste' | 'type'
> &
  FormInputFieldProps &
  FormPinflFieldProps<TFieldValues>) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleParsedValue = (parsedValue: string) => {
          field.onChange(getFormDigitsValue(field.value, parsedValue))

          if (parsedValue.length === FIELD_LENGTHS.PINFL) {
            setTimeout(() => {
              void trigger(name)
            })
          }
        }

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const parsedValue = parsePinfl(event.target.value)

          handleParsedValue(parsedValue)
        }

        const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault()

          const pastedData = event.clipboardData.getData('text')

          const parsedValue = parsePinfl(pastedData)

          handleParsedValue(parsedValue)
        }

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            inputMode="numeric"
            onPaste={handlePaste}
            placeholder={placeholder}
            {...field}
            onChange={handleChange}
            value={field.value ? String(field.value) : ''}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

export function FormReceiptNumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  ...props
}: FormComponentFieldProps<
  typeof Input,
  TFieldValues,
  TName,
  TTransformedValues,
  'autoComplete' | 'inputMode' | 'onPaste' | 'type'
> &
  FormInputFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const parsedValue = parseReceiptNumber(event.target.value)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault()

          const pastedData = event.clipboardData.getData('text')

          const parsedValue = parseReceiptNumber(pastedData)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            inputMode="numeric"
            onPaste={handlePaste}
            placeholder={placeholder}
            {...field}
            onChange={handleChange}
            value={field.value ? String(field.value) : ''}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

export function FormSelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  className,
  contentClassName,
  control,
  description,
  name,
  options,
  placeholder,
  ...props
}: FormComponentFieldProps<typeof SelectTrigger, TFieldValues, TName, TTransformedValues> & FormSelectFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => (
        <Select name={field.name} onValueChange={field.onChange} value={field.value ?? ''}>
          <SelectTrigger
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            className={classNames(
              'h-14.5 rounded-[1.125rem] bg-muted px-4 py-1.5 text-lg font-medium transition',
              'disabled:pointer-events-none disabled:opacity-40 aria-invalid:bg-destructive aria-invalid:text-destructive-foreground aria-invalid:ring-destructive-foreground/40 aria-invalid:data-placeholder:text-destructive-foreground aria-invalid:[&_svg]:text-destructive-foreground aria-invalid:data-[state=open]:[&_svg]:last:text-destructive-foreground',
              className,
            )}
            onBlur={field.onBlur}
            ref={field.ref}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className={contentClassName}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormField>
  )
}

export function FormTextareaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  ...props
}: FormComponentFieldProps<typeof Textarea, TFieldValues, TName, TTransformedValues> & FormTextareaFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => (
        <Textarea
          aria-describedby={describedBy}
          aria-invalid={fieldState.invalid}
          placeholder={placeholder}
          {...field}
          {...props}
        />
      )}
    </FormField>
  )
}

export function FormTinField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  name,
  placeholder,
  ...props
}: FormComponentFieldProps<
  typeof Input,
  TFieldValues,
  TName,
  TTransformedValues,
  'autoComplete' | 'inputMode' | 'onPaste' | 'type'
> &
  FormInputFieldProps) {
  return (
    <FormField control={control} description={description} name={name}>
      {({ describedBy, field, fieldState }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const parsedValue = parseTin(event.target.value)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault()

          const pastedData = event.clipboardData.getData('text')

          const parsedValue = parseTin(pastedData)

          field.onChange(getFormDigitsValue(field.value, parsedValue))
        }

        return (
          <Input
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            inputMode="numeric"
            onPaste={handlePaste}
            placeholder={placeholder}
            {...field}
            onChange={handleChange}
            value={field.value ? String(field.value) : ''}
            {...props}
          />
        )
      }}
    </FormField>
  )
}
