# Popover

```tsx
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from 'ui-kit/core'
```

Компонент `Popover` — всплывающая панель с произвольным контентом, привязанная к триггеру. Основан на [Radix Popover](https://www.radix-ui.com/docs/primitives/components/popover).

---

## Использование

```tsx
<Popover>
  <PopoverTrigger className="rounded-none">Trigger</PopoverTrigger>
  <PopoverPortal>
    <PopoverContent align="center">Content</PopoverContent>
  </PopoverPortal>
</Popover>
```

---

## Состояния

### Невалидное (Invalid)

Передайте `aria-invalid` в `PopoverTrigger` и задайте нужные классы состояния через `className`.

```tsx
<Popover>
  <PopoverTrigger
    aria-invalid={true}
    className="rounded-none aria-invalid:text-destructive-foreground aria-invalid:ring-destructive-foreground/40 aria-invalid:[&_svg]:text-destructive-foreground aria-invalid:data-[state=open]:[&_svg]:last:text-destructive-foreground"
  >
    Trigger
  </PopoverTrigger>
  <PopoverPortal>
    <PopoverContent align="center" className="p-2">
      Content
    </PopoverContent>
  </PopoverPortal>
</Popover>
```

### Отключенное (Disabled)

```tsx
<Popover>
  <PopoverTrigger className="rounded-none disabled:opacity-40" disabled>
    Trigger
  </PopoverTrigger>
  <PopoverPortal>
    <PopoverContent align="center" className="p-2">
      Content
    </PopoverContent>
  </PopoverPortal>
</Popover>
```

---

## Композиция

```text
Popover
├── PopoverTrigger
└── PopoverPortal
    └── PopoverContent
```

---

## Свойства

### Popover

Принимает все свойства [`Popover.Root`](https://www.radix-ui.com/docs/primitives/components/popover#root) из Radix UI.

### PopoverTrigger

Принимает свойства [`Popover.Trigger`](https://www.radix-ui.com/docs/primitives/components/popover#trigger) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### PopoverPortal

Принимает все свойства [`Popover.Portal`](https://www.radix-ui.com/docs/primitives/components/popover#portal) из Radix UI.

### PopoverContent

Принимает свойства [`Popover.Content`](https://www.radix-ui.com/docs/primitives/components/popover#content) из Radix UI.

Значение по умолчанию для `sideOffset` — `8`.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                      | Описание                                                           |
| :------------------------- | :----------------------------------------------------------------- |
| `--destructive-foreground` | Текст, иконка и кольцо `PopoverTrigger` в состоянии `aria-invalid` |
| `--muted-foreground`       | Цвет иконки-стрелки в `PopoverTrigger`                             |
| `--popover`                | Фон `PopoverContent`                                               |
| `--popover-foreground`     | Текст `PopoverContent`                                             |
| `--primary`                | Цвет иконки-стрелки при открытом `PopoverTrigger`                  |

---

## API Reference

См. документацию [Radix Popover API](https://www.radix-ui.com/docs/primitives/components/popover#api-reference).
