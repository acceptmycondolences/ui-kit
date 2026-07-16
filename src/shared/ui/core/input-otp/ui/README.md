# InputOTP

```tsx
import { OTP_PATTERNS } from 'ui-kit/config'
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'ui-kit/core'
```

Компонент `InputOTP` — поле ввода одноразового кода с поддержкой валидации и состояний. Основан на [input-otp](https://input-otp.rodz.dev).

---

## Использование

```tsx
<InputOTP maxLength={6} pattern={OTP_PATTERNS.ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

---

## Состояния

| Состояние      | Описание                                                             |
| :------------- | :------------------------------------------------------------------- |
| `active`       | Активный слот подсвечивается кольцом `ring`                          |
| `aria-invalid` | Фон и текст переключаются на деструктивную цветовую схему            |
| `default`      | Слоты отображаются с фоном `secondary`                               |
| `disabled`     | Pointer events отключены; компонент отображается с прозрачностью 40% |

```tsx
<InputOTP maxLength={6} pattern={OTP_PATTERNS.ONLY_DIGITS}>...</InputOTP>
<InputOTP aria-invalid maxLength={6} pattern={OTP_PATTERNS.ONLY_DIGITS}>...</InputOTP>
<InputOTP disabled maxLength={6} pattern={OTP_PATTERNS.ONLY_DIGITS}>...</InputOTP>
```

---

## Композиция

```text
InputOTP
└── InputOTPGroup
    ├── InputOTPSlot (index=0)
    ├── InputOTPSlot (index=1)
    └── InputOTPSlot (index=N)
```

---

## Свойства

### InputOTP

Принимает свойства [`OTPInput`](https://github.com/guilhermerodz/input-otp#api-reference), за исключением:

| Свойство | Причина           |
| :------- | :---------------- |
| `render` | Не поддерживается |

Для свойства `pattern` доступны готовые значения из `OTP_PATTERNS`: `ONLY_CHARS`, `ONLY_DIGITS`, `ONLY_DIGITS_AND_CHARS`.

### InputOTPGroup

Принимает все нативные атрибуты `<div>`.

### InputOTPSlot

Принимает все нативные атрибуты `<div>`, а также обязательное свойство:

| Свойство | Тип      | Описание                                   |
| :------- | :------- | :----------------------------------------- |
| `index`  | `number` | Индекс слота в контексте `OTPInputContext` |

---

## Доступность

| Механизм       | Описание                                                   |
| :------------- | :--------------------------------------------------------- |
| `aria-invalid` | Семантическое обозначение ошибки для скринридеров          |
| `data-active`  | Отражает активное состояние слота для стилизации через CSS |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                         | Описание                                         |
| :---------------------------- | :----------------------------------------------- |
| `--constructive`              | Цвет мигающей каретки                            |
| `--destructive`               | Фон слота в состоянии `aria-invalid`             |
| `--destructive-foreground`    | Текст и каретка слота в состоянии `aria-invalid` |
| `--destructive-foreground/40` | Кольцо слота в состоянии `aria-invalid`          |
| `--ring`                      | Кольцо активного слота                           |
| `--secondary`                 | Фон слота в состоянии по умолчанию               |
| `--secondary/80`              | Фон слота при наведении                          |

---

## API Reference

См. документацию [input-otp API](https://github.com/guilhermerodz/input-otp#api-reference).
