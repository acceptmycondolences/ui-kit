# Input

```tsx
import { Input } from 'ui-kit/core'
```

Компонент `Input` — базовое поле ввода текста с плавающим лейблом, поддержкой префикса и суффикса.

---

## Использование

```tsx
<Input placeholder="Placeholder" />
```

---

## Состояния

| Состояние      | Описание                                                                     |
| :------------- | :--------------------------------------------------------------------------- |
| `aria-invalid` | Фон и текст переключаются на деструктивную цветовую схему                    |
| `default`      | Лейбл отображается как placeholder по центру поля                            |
| `disabled`     | Pointer events отключены; поле отображается с прозрачностью 40%              |
| `filled`       | Лейбл остается наверху; `prefix`/`suffix` видны при наличии значения         |
| `focus`        | Лейбл поднимается вверх и уменьшается до 75%; показываются `prefix`/`suffix` |

```tsx
<Input placeholder="Placeholder" />
<Input aria-invalid placeholder="Placeholder" value="Invalid" />
<Input disabled placeholder="Placeholder" value="Disabled" />
```

---

## Prefix и Suffix

`prefix` и `suffix` — статичные нередактируемые элементы, визуально интегрированные с полем. Они не входят в значение `value`.

Ширина prefix/suffix измеряется через `ResizeObserver` и автоматически задает `paddingLeft`/`paddingRight` инпуту.

Отображаются при фокусе или заполненном поле.

```tsx
<Input
  autoComplete="transaction-amount"
  inputMode="numeric"
  onChange={handleChange}
  placeholder="Currency"
  suffix="UZS"
  value={value}
/>

<Input
  autoComplete="tel"
  inputMode="tel"
  onChange={handleChange}
  onPaste={handlePaste}
  placeholder="Phone"
  prefix="+998"
  type="tel"
  value={value}
/>
```

---

## Форматирование ввода

`Input` не форматирует значение сам, но подходит для контролируемых сценариев с парсерами.

```tsx
function CardExpiryRender() {
  const [value, setValue] = useState(0)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(parseCreditCardExpiry(event.target.value)))
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedData = event.clipboardData.getData('text')

    setValue(Number(parseCreditCardExpiry(pastedData)))
  }

  const formattedValue = value ? formatCreditCardExpiry(String(value)) : ''

  return (
    <Input
      autoComplete="cc-exp"
      inputMode="numeric"
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder="Card expiry"
      value={formattedValue}
    />
  )
}
```

```tsx
function CardNumberRender() {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseCreditCardNumber(event.target.value))
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedData = event.clipboardData.getData('text')

    setValue(parseCreditCardNumber(pastedData))
  }

  const formattedValue = value ? formatCreditCard(value) : ''

  return (
    <Input
      autoComplete="cc-number"
      inputMode="numeric"
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder="Card number"
      value={formattedValue}
    />
  )
}
```

```tsx
function CurrencyRender() {
  const [value, setValue] = useState(0)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '')

    setValue(Number(digits))
  }

  const formattedValue = formatNumber(value)

  return (
    <Input
      autoComplete="transaction-amount"
      inputMode="numeric"
      onChange={handleChange}
      placeholder="Currency"
      suffix="UZS"
      value={formattedValue}
    />
  )
}
```

```tsx
function InvoiceNumberRender() {
  const [value, setValue] = useState(0)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(parseInvoiceNumber(event.target.value)))
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedData = event.clipboardData.getData('text')

    setValue(Number(parseInvoiceNumber(pastedData)))
  }

  return <Input inputMode="numeric" onChange={handleChange} onPaste={handlePaste} placeholder="Invoice number" value={value ? String(value) : ''} />
}
```

```tsx
function NameRender() {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseName(event.target.value))
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedData = event.clipboardData.getData('text')

    setValue(parseName(pastedData))
  }

  return <Input autoComplete="name" onChange={handleChange} onPaste={handlePaste} placeholder="Name" value={value} />
}
```

```tsx
function PhoneRender() {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parsePhoneNumber(event.target.value))
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedData = event.clipboardData.getData('text')

    setValue(parsePhoneNumber(pastedData))
  }

  const formattedValue = value ? formatPhone(value) : ''

  return (
    <Input
      autoComplete="tel"
      inputMode="tel"
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder="Phone"
      prefix="+998"
      type="tel"
      value={formattedValue}
    />
  )
}
```

```tsx
function PinflRender() {
  const [value, setValue] = useState(0)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(parsePinfl(event.target.value)))
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedData = event.clipboardData.getData('text')

    setValue(Number(parsePinfl(pastedData)))
  }

  return <Input inputMode="numeric" onChange={handleChange} onPaste={handlePaste} placeholder="PINFL" value={value ? String(value) : ''} />
}
```

`isValidPinfl` проверяет контрольную цифру ПИНФЛ: берет первые 13 цифр, применяет повторяющиеся веса `7, 3, 1`, суммирует произведения и сравнивает `sum % 10` с последней цифрой.

```tsx
function ReceiptNumberRender() {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseReceiptNumber(event.target.value))
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedData = event.clipboardData.getData('text')

    setValue(parseReceiptNumber(pastedData))
  }

  return <Input inputMode="numeric" onChange={handleChange} onPaste={handlePaste} placeholder="Receipt number" value={value} />
}
```

```tsx
function TinRender() {
  const [value, setValue] = useState(0)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(parseTin(event.target.value)))
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedData = event.clipboardData.getData('text')

    setValue(Number(parseTin(pastedData)))
  }

  return <Input inputMode="numeric" onChange={handleChange} onPaste={handlePaste} placeholder="TIN" value={value ? String(value) : ''} />
}
```

---

## Свойства

Компонент принимает все нативные атрибуты `<input>`, а также:

| Свойство | Тип         | По умолчанию | Описание                                                                                                 |
| :------- | :---------- | :----------: | :------------------------------------------------------------------------------------------------------- |
| `prefix` | `ReactNode` |      —       | Статичный нередактируемый элемент в начале поля. Используется для кодов стран и аналогичных меток        |
| `suffix` | `ReactNode` |      —       | Статичный нередактируемый элемент в конце поля. Используется для символов валют и вспомогательных иконок |

---

## Доступность

Компонент автоматически управляет атрибутами для корректной работы с вспомогательными технологиями.

| Механизм           | Описание                                                                                                                     |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `aria-describedby` | Объединяет переданные ids с автоматически созданными ids элементов `prefix`/`suffix`                                         |
| `aria-invalid`     | Семантическое обозначение ошибки для скринридеров                                                                            |
| `id` / `htmlFor`   | Лейбл связан с инпутом через `useId` или переданный `id`                                                                     |
| `placeholder=" "`  | Нативный placeholder задан пробелом — используется только для CSS-селектора `:placeholder-shown` и не читается скринридерами |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                         | Описание                                          |
| :---------------------------- | :------------------------------------------------ |
| `--constructive`              | Цвет каретки                                      |
| `--destructive`               | Фон поля в состоянии `aria-invalid`               |
| `--destructive-foreground`    | Текст, лейбл и каретка в состоянии `aria-invalid` |
| `--destructive-foreground/40` | Кольцо (ring) в состоянии `aria-invalid`          |
| `--muted`                     | Фон поля в состоянии по умолчанию                 |
| `--muted-foreground`          | Цвет лейбла и суффикса в состоянии по умолчанию   |
