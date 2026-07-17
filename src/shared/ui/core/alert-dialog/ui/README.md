# AlertDialog

```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AlertDialogX } from 'ui-kit/core'
```

Компонент `AlertDialog` — модальный диалог для подтверждения критических действий. Основан на [Radix AlertDialog](https://www.radix-ui.com/docs/primitives/components/alert-dialog).

---

## Использование

```tsx
<AlertDialog>
  <AlertDialogTrigger className="rounded-none">Trigger</AlertDialogTrigger>
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogContent>
      <AlertDialogX />
      <AlertDialogHeader>
        <AlertDialogTitle>Title</AlertDialogTitle>
        <AlertDialogDescription>Description</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction>Action</AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogPortal>
</AlertDialog>
```

---

## Композиция

```text
AlertDialog
├── AlertDialogTrigger
└── AlertDialogPortal
    ├── AlertDialogOverlay
    └── AlertDialogContent
        ├── AlertDialogX
        ├── AlertDialogHeader
        │   ├── AlertDialogTitle
        │   └── AlertDialogDescription
        └── AlertDialogFooter
            ├── AlertDialogAction
            └── AlertDialogCancel
```

---

## Свойства

### AlertDialog

Принимает все свойства [`AlertDialog.Root`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#root) из Radix UI.

### AlertDialogTrigger

Принимает свойства [`AlertDialog.Trigger`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#trigger) из Radix UI, также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### AlertDialogPortal

Принимает все свойства [`AlertDialog.Portal`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#portal) из Radix UI.

### AlertDialogOverlay

Принимает свойства [`AlertDialog.Overlay`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#overlay) из Radix UI.

### AlertDialogContent

Принимает свойства [`AlertDialog.Content`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#content) из Radix UI.

### AlertDialogX

Кнопка закрытия диалога (крестик), построенная на `AlertDialog.Cancel`. Принимает свойства [`AlertDialog.Cancel`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#cancel) из Radix UI, за исключением:

| Свойство   | Причина                        |
| :--------- | :----------------------------- |
| `children` | Зафиксировано — иконка `IconX` |

А также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### AlertDialogHeader

Принимает все свойства `div`.

### AlertDialogTitle

Принимает свойства [`AlertDialog.Title`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#title) из Radix UI.

### AlertDialogDescription

Принимает свойства [`AlertDialog.Description`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#description) из Radix UI.

### AlertDialogFooter

Принимает все свойства `div`.

### AlertDialogAction

Принимает свойства [`AlertDialog.Action`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#action) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### AlertDialogCancel

Принимает свойства [`AlertDialog.Cancel`](https://www.radix-ui.com/docs/primitives/components/alert-dialog#cancel) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                    | Описание                                           |
| :----------------------- | :------------------------------------------------- |
| `--background`           | Фон `AlertDialogContent`                           |
| `--border`               | Граница `AlertDialogContent` и `AlertDialogFooter` |
| `--foreground`           | Текст `AlertDialogContent`                         |
| `--muted-foreground`     | Цвет иконки `AlertDialogX` в обычном состоянии     |
| `--primary`              | Цвет иконки `AlertDialogX` при наведении           |
| `--secondary-foreground` | Цвет текста `AlertDialogDescription`               |

---

## API Reference

См. документацию [Radix AlertDialog API](https://www.radix-ui.com/docs/primitives/components/alert-dialog#api-reference).
