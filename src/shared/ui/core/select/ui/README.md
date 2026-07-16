# Select

```tsx
import { Select, SelectContent, SelectItem, SelectPortal, SelectTrigger, SelectValue } from 'ui-kit/core'
```

Компонент `Select` — выпадающий список для выбора значения из набора опций. Основан на [Radix Select](https://www.radix-ui.com/docs/primitives/components/select).

---

## Использование

```tsx
<Select>
  <SelectTrigger className="rounded-none">
    <SelectValue placeholder="Placeholder" />
  </SelectTrigger>
  <SelectPortal>
    <SelectContent align="center">
      <SelectItem value="value-1">Value 1</SelectItem>
      <SelectItem value="value-2">Value 2</SelectItem>
      <SelectItem value="value-3">Value 3</SelectItem>
    </SelectContent>
  </SelectPortal>
</Select>
```

---

## Состояния

### Невалидное (Invalid)

Передайте `aria-invalid` в `SelectTrigger` и задайте нужные классы состояния через `className`.

```tsx
<Select>
  <SelectTrigger
    aria-invalid={true}
    className="rounded-none aria-invalid:text-destructive-foreground aria-invalid:ring-destructive-foreground/40 aria-invalid:data-placeholder:text-destructive-foreground aria-invalid:[&_svg]:text-destructive-foreground aria-invalid:data-[state=open]:[&_svg]:last:text-destructive-foreground"
  >
    <SelectValue placeholder="Placeholder" />
  </SelectTrigger>
  <SelectPortal>
    <SelectContent align="center">
      <SelectItem value="value-1">Value 1</SelectItem>
      <SelectItem value="value-2">Value 2</SelectItem>
      <SelectItem value="value-3">Value 3</SelectItem>
    </SelectContent>
  </SelectPortal>
</Select>
```

### Отключенное (Disabled)

```tsx
<Select disabled>
  <SelectTrigger className="rounded-none disabled:opacity-40">
    <SelectValue placeholder="Placeholder" />
  </SelectTrigger>
  <SelectPortal>
    <SelectContent align="center">
      <SelectItem value="value-1">Value 1</SelectItem>
      <SelectItem value="value-2">Value 2</SelectItem>
      <SelectItem value="value-3">Value 3</SelectItem>
    </SelectContent>
  </SelectPortal>
</Select>
```

---

## Композиция

```text
Select
├── SelectTrigger
│   └── SelectValue
└── SelectPortal
    └── SelectContent
        ├── SelectItem
        └── SelectItem
```

---

## Свойства

### Select

Принимает свойства [`Select.Root`](https://www.radix-ui.com/docs/primitives/components/select#root) из Radix UI.

### SelectTrigger

Принимает свойства [`Select.Trigger`](https://www.radix-ui.com/docs/primitives/components/select#trigger) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### SelectValue

Принимает все свойства [`Select.Value`](https://www.radix-ui.com/docs/primitives/components/select#value) из Radix UI.

### SelectPortal

Принимает все свойства [`Select.Portal`](https://www.radix-ui.com/docs/primitives/components/select#portal) из Radix UI.

### SelectContent

Принимает свойства [`Select.Content`](https://www.radix-ui.com/docs/primitives/components/select#content) из Radix UI, за исключением:

| Свойство   | Причина                    |
| :--------- | :------------------------- |
| `position` | Зафиксировано как `popper` |

Значение по умолчанию для `sideOffset` — `8`.

### SelectItem

Принимает свойства [`Select.Item`](https://www.radix-ui.com/docs/primitives/components/select#item) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                      | Описание                                                                       |
| :------------------------- | :----------------------------------------------------------------------------- |
| `--accent`                 | Фон `SelectItem` при фокусе                                                    |
| `--accent-foreground`      | Текст `SelectItem` при фокусе                                                  |
| `--constructive`           | Цвет иконки-галочки у выбранного `SelectItem`                                  |
| `--destructive-foreground` | Текст, плейсхолдер, иконка и кольцо `SelectTrigger` в состоянии `aria-invalid` |
| `--muted-foreground`       | Цвет иконки-стрелки в `SelectTrigger`                                          |
| `--popover`                | Фон `SelectContent`                                                            |
| `--popover-foreground`     | Текст `SelectContent`                                                          |
| `--primary`                | Цвет иконки-стрелки при открытом `SelectTrigger`                               |

---

## API Reference

См. документацию [Radix Select API](https://www.radix-ui.com/docs/primitives/components/select#api-reference).
