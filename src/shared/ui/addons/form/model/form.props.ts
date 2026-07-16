import type { ComponentProps, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import type {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
  UseFormTrigger,
} from 'react-hook-form'

import type { SelectOption } from '~/shared/lib'

export type ControlledFieldProp =
  | 'aria-describedby'
  | 'aria-invalid'
  | 'checked'
  | 'defaultChecked'
  | 'defaultValue'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onCheckedChange'
  | 'value'

export interface FormBaseFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> {
  control: Control<TFieldValues, unknown, TTransformedValues>
  description?: ReactNode
  name: TName
}

export interface FormCardNumberFieldProps<TFieldValues extends FieldValues = FieldValues> {
  trigger: UseFormTrigger<TFieldValues>
}

export interface FormComboboxFieldProps {
  contentClassName?: string
  options: SelectOption[]
  saveLabel: string
  selectedLabel: ((selectedCount: number) => string) | string
  triggerLabel: ((savedCount: number) => string) | string
}

export type FormComponentFieldProps<
  TElementType extends ElementType,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
  TOmittedProps extends PropertyKey = never,
> = FormBaseFieldProps<TFieldValues, TName, TTransformedValues> &
  Omit<ComponentPropsWithoutRef<TElementType>, ControlledFieldProp | TOmittedProps>

export interface FormCurrencyFieldProps {
  placeholder: string
  suffix: ReactNode
}

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormBaseFieldProps<TFieldValues, TName, TTransformedValues> & {
  children: (props: FormFieldRenderProps<TFieldValues, TName>) => ReactNode
}

export interface FormFieldRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  describedBy?: string
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
}

export interface FormInputFieldProps {
  placeholder: string
}

export interface FormPinflFieldProps<TFieldValues extends FieldValues = FieldValues> {
  trigger: UseFormTrigger<TFieldValues>
}

export type FormProps = ComponentProps<'form'>

export interface FormSelectFieldProps {
  contentClassName?: string
  options: SelectOption[]
  placeholder: string
}

export interface FormTextareaFieldProps {
  placeholder: string
}
