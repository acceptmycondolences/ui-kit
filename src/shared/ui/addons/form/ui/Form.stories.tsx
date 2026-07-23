import { valibotResolver } from '@hookform/resolvers/valibot'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'
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
  type FormProps,
} from '~/shared/ui/addons'
import { Button, FieldGroup } from '~/shared/ui/core'

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

type FormData = v.InferOutput<typeof Schema>

type FormStoryProps = FormProps & {
  onValidSubmit: (data: FormData) => void
}

const meta: Meta<FormStoryProps> = {
  args: {
    onValidSubmit: fn(),
  },
  component: Form,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  title: 'Components/Form',
}

export default meta

type Story = StoryObj<typeof meta>

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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const cardNumber = canvas.getByRole('textbox', { name: 'Card number' })
    const input = canvas.getByRole('textbox', { name: 'Input' })
    const pinfl = canvas.getByRole('textbox', { name: 'PINFL' })
    const submit = canvas.getByRole('button', { name: 'Submit' })

    await expect(submit).toBeDisabled()
    await expect(args.onValidSubmit).not.toHaveBeenCalled()

    await userEvent.type(canvas.getByRole('textbox', { name: 'Card expiry' }), '1230')
    await userEvent.type(cardNumber, '8600 1234 1234 5678')
    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Invalid card number'))
    await expect(cardNumber).toHaveAttribute('aria-invalid', 'true')

    await userEvent.clear(cardNumber)
    await userEvent.type(cardNumber, '4111 1111 1111 1111')
    await waitFor(() => expect(canvas.queryByText('Invalid card number')).not.toBeInTheDocument())
    await expect(cardNumber).not.toHaveAttribute('aria-invalid', 'true')

    await userEvent.click(canvas.getByRole('button', { name: 'Combobox' }))
    await userEvent.click(body.getByRole('checkbox', { name: 'Label 1' }))
    await userEvent.click(body.getByRole('button', { name: 'Save' }))

    const currency = canvas.getByRole('textbox', { name: 'Currency' })

    await userEvent.clear(currency)
    await userEvent.type(currency, '1234567')
    await userEvent.type(input, 'Value')
    await userEvent.type(canvas.getByRole('textbox', { name: 'Invoice number' }), 'AB1234567890123456')
    await userEvent.type(canvas.getByRole('textbox', { name: 'Name' }), 'aLIBEK123 ALLANAZAROV')
    await userEvent.type(canvas.getByRole('textbox', { name: 'Phone' }), '901234567')
    await userEvent.type(pinfl, '12345678901234')
    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Invalid PINFL'))
    await expect(pinfl).toHaveAttribute('aria-invalid', 'true')

    await userEvent.clear(pinfl)
    await userEvent.type(pinfl, '12345678901233')
    await waitFor(() => expect(canvas.queryByText('Invalid PINFL')).not.toBeInTheDocument())
    await expect(pinfl).not.toHaveAttribute('aria-invalid', 'true')

    await userEvent.type(canvas.getByRole('textbox', { name: 'Receipt number' }), '12-3456-789012')

    await userEvent.click(canvas.getByRole('combobox'))
    await userEvent.click(body.getByRole('option', { name: 'Label 2' }))
    await waitFor(() => expect(body.queryByRole('listbox')).not.toBeInTheDocument())

    await userEvent.type(canvas.getByPlaceholderText('Textarea'), 'Value')
    await userEvent.type(canvas.getByRole('textbox', { name: 'TIN' }), '123-456-7890')

    await waitFor(() => expect(submit).toBeEnabled())
    await userEvent.click(submit)

    await waitFor(() => expect(args.onValidSubmit).toHaveBeenCalledOnce())
    await expect(args.onValidSubmit).toHaveBeenCalledWith({
      cardExpiry: 1230,
      cardNumber: '4111111111111111',
      combobox: ['value-1'],
      currency: 1234567,
      input: 'Value',
      invoiceNumber: 12345678901234,
      name: 'Alibek Allanazarov',
      phone: '998901234567',
      pinfl: 12345678901233,
      receiptNumber: '12345678901',
      select: 'value-2',
      textarea: 'Value',
      tin: 123456789,
    })
  },
  render: function DefaultRender({ onValidSubmit }) {
    const form = useForm<FormData>({
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

    const onSubmit = (data: FormData) => {
      onValidSubmit(data)
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
