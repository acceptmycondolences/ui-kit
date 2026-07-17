# Dialog

```tsx
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from 'ui-kit/core'
```

Компонент `Dialog` — модальный диалог для отображения контента поверх основного интерфейса. Основан на [Radix Dialog](https://www.radix-ui.com/docs/primitives/components/dialog).

---

## Использование

```tsx
<Dialog>
  <DialogTrigger className="rounded-none">Trigger</DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogClose />
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
      </DialogHeader>
      <div className="mx-6 h-px border-t" />
      <div className="p-6">Content</div>
    </DialogContent>
  </DialogPortal>
</Dialog>
```

---

## Композиция

```text
Dialog
├── DialogTrigger
└── DialogPortal
    ├── DialogOverlay
    └── DialogContent
        ├── DialogClose
        ├── DialogHeader
        │   ├── DialogTitle
        │   └── DialogDescription
        └── [content]
```

---

## Свойства

### Dialog

Принимает все свойства [`Dialog.Root`](https://www.radix-ui.com/docs/primitives/components/dialog#root) из Radix UI.

### DialogTrigger

Принимает свойства [`Dialog.Trigger`](https://www.radix-ui.com/docs/primitives/components/dialog#trigger) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание      |
| :-------- | :------------------------------------ | :------------ |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер кнопки |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля |

### DialogPortal

Принимает все свойства [`Dialog.Portal`](https://www.radix-ui.com/docs/primitives/components/dialog#portal) из Radix UI.

### DialogOverlay

Принимает свойства [`Dialog.Overlay`](https://www.radix-ui.com/docs/primitives/components/dialog#overlay) из Radix UI.

### DialogContent

Принимает свойства [`Dialog.Content`](https://www.radix-ui.com/docs/primitives/components/dialog#content) из Radix UI.

### DialogClose

Кнопка закрытия диалога (крестик), построенная на `Dialog.Close`. Принимает свойства [`Dialog.Close`](https://www.radix-ui.com/docs/primitives/components/dialog#close) из Radix UI, за исключением:

| Свойство   | Причина                        |
| :--------- | :----------------------------- |
| `children` | Зафиксировано — иконка `IconX` |

А также дополнительные свойства:

| Свойство  | Тип                                   | Описание      |
| :-------- | :------------------------------------ | :------------ |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер кнопки |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля |

### DialogHeader

Принимает все свойства `div`.

### DialogTitle

Принимает свойства [`Dialog.Title`](https://www.radix-ui.com/docs/primitives/components/dialog#title) из Radix UI.

### DialogDescription

Принимает свойства [`Dialog.Description`](https://www.radix-ui.com/docs/primitives/components/dialog#description) из Radix UI.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                    | Описание                                      |
| :----------------------- | :-------------------------------------------- |
| `--background`           | Фон `DialogContent`                           |
| `--border`               | Граница `DialogContent`                       |
| `--foreground`           | Текст `DialogContent`                         |
| `--muted-foreground`     | Цвет иконки `DialogClose` в обычном состоянии |
| `--primary`              | Цвет иконки `DialogClose` при наведении       |
| `--secondary-foreground` | Цвет текста `DialogDescription`               |

---

## API Reference

См. документацию [Radix Dialog API](https://www.radix-ui.com/docs/primitives/components/dialog#api-reference).
