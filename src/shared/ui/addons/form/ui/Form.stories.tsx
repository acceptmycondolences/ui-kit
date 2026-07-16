import { valibotResolver } from '@hookform/resolvers/valibot'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'

import { FIELD_LENGTHS } from '~/shared/config'
import { isValidCreditCardNumber, isValidPinfl } from '~/shared/lib'
import type { SelectOption } from '~/shared/lib'
import {
  Form,
  FormCardExpiryField,
  FormCardNumberField,
  FormComboboxField,
  FormCurrencyField,
  FormInputField,
  FormInvoiceNumberField,
  FormNameField,
  FormPhoneField,
  FormPinflField,
  FormReceiptNumberField,
  FormSelectField,
  FormTextareaField,
  FormTinField,
} from '~/shared/ui/addons'
import { Button, FieldGroup } from '~/shared/ui/core'

const meta = {
  component: Form,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
  },
  title: 'Components/Form',
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

const Schema = v.object({
  cardExpiry: v.pipe(
    v.number(),
    v.check((input) => String(input).length === FIELD_LENGTHS.CARD_EXPIRY),
  ),
  cardNumber: v.pipe(
    v.string(),
    v.check((input) => input.length === FIELD_LENGTHS.CARD_NUMBER),
    v.check((input) => isValidCreditCardNumber(input), 'Invalid card number'),
  ),
  combobox: v.pipe(v.array(v.pipe(v.string(), v.trim(), v.nonEmpty())), v.nonEmpty()),
  currency: v.number(),
  input: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  invoiceNumber: v.pipe(
    v.number(),
    v.check((input) => String(input).length === FIELD_LENGTHS.INVOICE_NUMBER),
  ),
  name: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  phone: v.pipe(
    v.string(),
    v.check((input) => input.length === FIELD_LENGTHS.PHONE),
  ),
  pinfl: v.pipe(
    v.number(),
    v.check((input) => String(input).length === FIELD_LENGTHS.PINFL),
    v.check((input) => isValidPinfl(input), 'Invalid PINFL'),
  ),
  receiptNumber: v.pipe(
    v.string(),
    v.check((input) => input.length === FIELD_LENGTHS.RECEIPT_NUMBER),
  ),
  select: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  textarea: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  tin: v.pipe(
    v.number(),
    v.check((input) => String(input).length === FIELD_LENGTHS.TIN),
  ),
})

const OPTIONS: SelectOption[] = [
  {
    label: 'Label 1',
    value: 'value-1',
  },
  {
    label: 'Label 2',
    value: 'value-2',
  },
  {
    label: 'Label 3',
    value: 'value-3',
  },
]

export const Default: Story = {
  render: function DefaultRender() {
    const form = useForm<v.InferOutput<typeof Schema>>({
      defaultValues: {
        cardExpiry: 0,
        cardNumber: '',
        combobox: [],
        currency: 0,
        input: '',
        invoiceNumber: 0,
        name: '',
        phone: '',
        pinfl: 0,
        receiptNumber: '',
        select: '',
        textarea: '',
        tin: 0,
      },
      resolver: valibotResolver(Schema),
    })

    const onSubmit = (data: v.InferOutput<typeof Schema>) => {
      console.log(data)
    }

    const selectedLabel = (selectedCount: number) => {
      return `Selected: ${String(selectedCount)}`
    }

    const triggerLabel = (savedCount: number) => {
      return savedCount === 0 ? 'Combobox' : `Label (${String(savedCount)})`
    }

    const { isLoading, isValid } = form.formState

    const disabled = !isValid

    return (
      <Form className="flex w-50 flex-col gap-8 md:w-100" onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
        <FieldGroup>
          <FormCardExpiryField control={form.control} name="cardExpiry" placeholder="Card expiry" />
          <FormCardNumberField
            control={form.control}
            name="cardNumber"
            placeholder="Card number"
            trigger={form.trigger}
          />
          <FormComboboxField
            control={form.control}
            name="combobox"
            options={OPTIONS}
            saveLabel="Save"
            selectedLabel={selectedLabel}
            triggerLabel={triggerLabel}
          />
          <FormCurrencyField control={form.control} name="currency" placeholder="Currency" suffix="UZS" />
          <FormInputField control={form.control} description="Description" name="input" placeholder="Input" />
          <FormInvoiceNumberField control={form.control} name="invoiceNumber" placeholder="Invoice number" />
          <FormNameField control={form.control} name="name" placeholder="Name" />
          <FormPhoneField control={form.control} name="phone" placeholder="Phone" />
          <FormPinflField control={form.control} name="pinfl" placeholder="PINFL" trigger={form.trigger} />
          <FormReceiptNumberField control={form.control} name="receiptNumber" placeholder="Receipt number" />
          <FormSelectField control={form.control} name="select" options={OPTIONS} placeholder="Select" />
          <FormTextareaField control={form.control} name="textarea" placeholder="Textarea" />
          <FormTinField control={form.control} name="tin" placeholder="TIN" />
        </FieldGroup>
        <Button disabled={disabled} isLoading={isLoading} size="large" type="submit" variant="constructive">
          Submit
        </Button>
      </Form>
    )
  },
}
