# Form

```tsx
import { Form, FormCardExpiryField, FormCardNumberField, FormComboboxField, FormCurrencyField, FormField, FormInputField, FormInvoiceNumberField, FormNameField, FormPhoneField, FormPinflField, FormReceiptNumberField, FormSelectField, FormTextareaField, FormTinField } from 'ui-kit/addons/form'
```

Компонент `Form` — обертка над `<form>` с набором управляемых полей, интегрированных с `react-hook-form`. Каждое поле автоматически связывается с контроллером формы, отображает описание и ошибку валидации.

Поля с цифровыми значениями (`FormCardExpiryField`, `FormCardNumberField`, `FormInvoiceNumberField`, `FormPhoneField`, `FormPinflField`, `FormReceiptNumberField`, `FormTinField`) используют `getFormDigitsValue`: если текущее значение поля в `react-hook-form` строка, новое значение сохраняется строкой; иначе сохраняется как `number`. Тип задается через `defaultValues`; примеры ниже намеренно чередуют типы лесенкой: `number`, `string`, `number`, `string`, `number`, `string`, `number`.

---

## Использование

```tsx
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

function DefaultRender() {
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
        <FormCardNumberField control={form.control} name="cardNumber" placeholder="Card number" trigger={form.trigger} />
        <FormComboboxField control={form.control} name="combobox" options={OPTIONS} saveLabel="Save" selectedLabel={selectedLabel} triggerLabel={triggerLabel} />
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
}
```

---

## Композиция

```text
Form
└── FieldGroup
    ├── FormCardExpiryField
    ├── FormCardNumberField
    ├── FormComboboxField
    ├── FormCurrencyField
    ├── FormField
    ├── FormInputField
    ├── FormInvoiceNumberField
    ├── FormNameField
    ├── FormPhoneField
    ├── FormPinflField
    ├── FormReceiptNumberField
    ├── FormSelectField
    ├── FormTextareaField
    └── FormTinField
```

---

## Примеры

### Срок действия карты

```tsx
<FormCardExpiryField control={form.control} name="cardExpiry" placeholder="Card expiry" />
```

Оставляет только цифры, ограничивает ввод 4 символами и отображает срок в формате `MM/YY`. Хранит значение как `number` или `string` без форматирования, сохраняя тип текущего значения поля.

### Номер карты

```tsx
<FormCardNumberField control={form.control} name="cardNumber" placeholder="Card number" trigger={form.trigger} />
```

Оставляет только цифры, ограничивает ввод 16 символами и отображает номер группами по 4 цифры. Хранит значение как `number` или `string` без форматирования, сохраняя тип текущего значения поля.

Для проверки номера используйте `isValidCreditCardNumber` в схеме валидации. Функция очищает значение до цифр, требует длину `FIELD_LENGTHS.CARD_NUMBER` и проверяет контрольную сумму по алгоритму Луна.

Поле запускает `trigger` после ввода 16 цифр, чтобы показать ошибку без изменения общего `mode` формы.

### Комбобокс с множественным выбором

```tsx
<FormComboboxField control={form.control} name="combobox" options={OPTIONS} saveLabel="Save" selectedLabel={selectedLabel} triggerLabel={triggerLabel} />
```

Открывает `Popover` с поиском и чекбоксами. Значение сохраняется в форму только при нажатии кнопки `saveLabel`. `contentClassName` применяется к `PopoverContent`.

### Валюта

```tsx
<FormCurrencyField control={form.control} name="currency" placeholder="Currency" suffix="UZS" />
```

Форматирует числовое значение с разделителями. Хранит в форме как `number`.

### Текстовое поле

```tsx
<FormInputField control={form.control} description="Description" name="input" placeholder="Input" />
```

### Номер инвойса

```tsx
<FormInvoiceNumberField control={form.control} name="invoiceNumber" placeholder="Invoice number" />
```

Оставляет только цифры и ограничивает ввод 14 символами. Хранит значение как `number` или `string`, сохраняя тип текущего значения поля.

### Имя

```tsx
<FormNameField control={form.control} name="name" placeholder="Name" />
```

Нормализует ввод: оставляет буквы и пробелы, убирает лишние пробелы и приводит слова к регистру имени.

### Телефон

```tsx
<FormPhoneField control={form.control} name="phone" placeholder="Phone" />
```

Автоматически форматирует ввод, применяет `prefix="+998"`, обрабатывает вставку через буфер обмена.

### ПИНФЛ

```tsx
<FormPinflField control={form.control} name="pinfl" placeholder="PINFL" trigger={form.trigger} />
```

Оставляет только цифры и ограничивает ввод 14 символами. Хранит значение как `number` или `string`, сохраняя тип текущего значения поля.

Для проверки контрольной цифры используйте `isValidPinfl` в схеме валидации. Функция берет первые 13 цифр, применяет повторяющиеся веса `7, 3, 1`, суммирует произведения и сравнивает `sum % 10` с последней цифрой ПИНФЛ.

Поле запускает `trigger` после ввода 14 цифр, чтобы показать ошибку ПИНФЛ без изменения общего `mode` формы.

### Номер чека

```tsx
<FormReceiptNumberField control={form.control} name="receiptNumber" placeholder="Receipt number" />
```

Оставляет только цифры и ограничивает ввод 11 символами. Хранит значение как `number` или `string`, сохраняя тип текущего значения поля.

### Селект

```tsx
<FormSelectField control={form.control} name="select" options={OPTIONS} placeholder="Select" />
```

`contentClassName` применяется к `SelectContent`.

### Текстовая область

```tsx
<FormTextareaField control={form.control} name="textarea" placeholder="Textarea" />
```

### ИНН

```tsx
<FormTinField control={form.control} name="tin" placeholder="TIN" />
```

Оставляет только цифры и ограничивает ввод 9 символами. Хранит значение как `number` или `string`, сохраняя тип текущего значения поля.

---

## Низкоуровневое поле

`FormField` — примитив для построения кастомных полей. Оборачивает `Controller` из RHF и автоматически рендерит `FieldDescription` и `FieldError`.

```tsx
<FormField control={control} description={description} name={name}>
  {({ describedBy, field, fieldState }) => <CustomComponent aria-describedby={describedBy} aria-invalid={fieldState.invalid} placeholder={placeholder} {...field} />}
</FormField>
```

---

## Свойства

### Общие свойства (все поля)

| Свойство      | Тип                     | Описание                        |
| :------------ | :---------------------- | :------------------------------ |
| `control`     | `Control<TFieldValues>` | Контроллер из `useForm`         |
| `description` | `ReactNode`             | Вспомогательный текст под полем |
| `name`        | `TName`                 | Путь к полю в схеме формы       |

### Form

Принимает все стандартные свойства `<form>`.

### FormCardExpiryField

| Свойство      | Тип      | Описание   |
| :------------ | :------- | :--------- |
| `placeholder` | `string` | Лейбл поля |

Хранит значение как `number` или `string` (цифры без форматирования), сохраняя тип текущего значения поля. Использует `autoComplete="cc-exp"` и `inputMode="numeric"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `inputMode`, `onPaste` и `type`.

### FormCardNumberField

| Свойство      | Тип                            | Описание                                             |
| :------------ | :----------------------------- | :--------------------------------------------------- |
| `placeholder` | `string`                       | Лейбл поля                                           |
| `trigger`     | `UseFormTrigger<TFieldValues>` | Запускает валидацию после ввода полного номера карты |

Хранит значение как `number` или `string` (цифры без форматирования), сохраняя тип текущего значения поля. Использует `autoComplete="cc-number"` и `inputMode="numeric"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `inputMode`, `onPaste` и `type`.

### FormComboboxField

| Свойство           | Тип                                             | Описание                                |
| :----------------- | :---------------------------------------------- | :-------------------------------------- |
| `contentClassName` | `string`                                        | Класс для содержимого попапа            |
| `options`          | `SelectOption[]`                                | Список пунктов                          |
| `saveLabel`        | `string`                                        | Текст кнопки сохранения                 |
| `selectedLabel`    | `string \| ((selectedCount: number) => string)` | Счетчик выбранных пунктов внутри попапа |
| `triggerLabel`     | `string \| ((savedCount: number) => string)`    | Лейбл кнопки-триггера                   |

Хранит значение как `string[]`. Дополнительно принимает все свойства компонента `PopoverTrigger`.

### FormCurrencyField

| Свойство      | Тип         | Описание                            |
| :------------ | :---------- | :---------------------------------- |
| `placeholder` | `string`    | Лейбл поля                          |
| `suffix`      | `ReactNode` | Символ валюты или единица измерения |

Хранит значение как `number`. Использует `autoComplete="transaction-amount"` и `inputMode="numeric"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `inputMode` и `type`.

### FormField

| Свойство   | Тип                                                                    | Описание                                   |
| :--------- | :--------------------------------------------------------------------- | :----------------------------------------- |
| `children` | `(props: { describedBy?, field, fieldState, formState }) => ReactNode` | Render-функция с доступом к состоянию поля |

### FormInputField

| Свойство      | Тип      | Описание   |
| :------------ | :------- | :--------- |
| `placeholder` | `string` | Лейбл поля |

Дополнительно принимает все свойства компонента `Input`.

### FormInvoiceNumberField

| Свойство      | Тип      | Описание   |
| :------------ | :------- | :--------- |
| `placeholder` | `string` | Лейбл поля |

Хранит значение как `number` или `string` (цифры без форматирования), сохраняя тип текущего значения поля. Использует `inputMode="numeric"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `inputMode`, `onPaste` и `type`.

### FormNameField

| Свойство      | Тип      | Описание   |
| :------------ | :------- | :--------- |
| `placeholder` | `string` | Лейбл поля |

Хранит значение как нормализованную строку. Использует `autoComplete="name"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `onPaste` и `type`.

### FormPhoneField

| Свойство      | Тип      | Описание   |
| :------------ | :------- | :--------- |
| `placeholder` | `string` | Лейбл поля |

Хранит значение как `number` или `string` (цифры без форматирования), сохраняя тип текущего значения поля. Использует `autoComplete="tel"`, `inputMode="tel"`, `prefix="+998"` и `type="tel"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `inputMode`, `onPaste`, `prefix` и `type`.

### FormPinflField

| Свойство      | Тип                            | Описание                                      |
| :------------ | :----------------------------- | :-------------------------------------------- |
| `placeholder` | `string`                       | Лейбл поля                                    |
| `trigger`     | `UseFormTrigger<TFieldValues>` | Запускает валидацию после ввода полного ПИНФЛ |

Хранит значение как `number` или `string` (цифры без форматирования), сохраняя тип текущего значения поля. Использует `inputMode="numeric"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `inputMode`, `onPaste` и `type`.

### FormReceiptNumberField

| Свойство      | Тип      | Описание   |
| :------------ | :------- | :--------- |
| `placeholder` | `string` | Лейбл поля |

Хранит значение как `number` или `string` (цифры без форматирования), сохраняя тип текущего значения поля. Использует `inputMode="numeric"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `inputMode`, `onPaste` и `type`.

### FormSelectField

| Свойство           | Тип              | Описание                   |
| :----------------- | :--------------- | :------------------------- |
| `contentClassName` | `string`         | Класс для содержимого меню |
| `options`          | `SelectOption[]` | Список пунктов             |
| `placeholder`      | `string`         | Текст в незаполненном виде |

Дополнительно принимает все свойства компонента `SelectTrigger`.

### FormTextareaField

| Свойство      | Тип      | Описание   |
| :------------ | :------- | :--------- |
| `placeholder` | `string` | Лейбл поля |

Дополнительно принимает все свойства компонента `Textarea`.

### FormTinField

| Свойство      | Тип      | Описание   |
| :------------ | :------- | :--------- |
| `placeholder` | `string` | Лейбл поля |

Хранит значение как `number` или `string` (цифры без форматирования), сохраняя тип текущего значения поля. Использует `inputMode="numeric"`. Дополнительно принимает свойства компонента `Input`, кроме управляемых полем `autoComplete`, `inputMode`, `onPaste` и `type`.

---

## Валидация

Интеграция с `react-hook-form` и `valibot`:

```tsx
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
```

При ошибке валидации поле автоматически получает `aria-invalid` и связывается с `FieldError` через `aria-describedby`, если у ошибки есть сообщение. Описание поля также подключается через `aria-describedby`.
