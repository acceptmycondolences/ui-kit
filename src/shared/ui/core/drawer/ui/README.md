# Drawer

```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from 'ui-kit/core'
```

Компонент `Drawer` — выдвижная панель, отображаемая поверх основного интерфейса. Основан на [Vaul Drawer](https://vaul.emilkowal.ski).

---

## Использование

```tsx
<Drawer>
  <DrawerTrigger className="rounded-none">Trigger</DrawerTrigger>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Title</DrawerTitle>
        <DrawerDescription>Description</DrawerDescription>
      </DrawerHeader>
      <div className="py-4">Content</div>
    </DrawerContent>
  </DrawerPortal>
</Drawer>
```

---

## Композиция

```text
Drawer
├── DrawerTrigger
└── DrawerPortal
    ├── DrawerOverlay
    └── DrawerContent
        ├── DrawerHeader
        │   ├── DrawerTitle
        │   ├── DrawerDescription
        │   └── DrawerClose (встроен)
        └── [content]
```

> `DrawerClose` встроен в `DrawerHeader` автоматически — отдельное использование не требуется.

---

## Свойства

### Drawer

Принимает все свойства [`Drawer.Root`](https://vaul.emilkowal.ski/api#root) из Vaul.

Свойству `direction` всегда присваивается значение `bottom`.

### DrawerTrigger

Принимает свойства [`Drawer.Trigger`](https://vaul.emilkowal.ski/api#trigger) из Vaul, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание      |
| :-------- | :------------------------------------ | :------------ |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер кнопки |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля |

### DrawerPortal

Принимает все свойства [`Drawer.Portal`](https://vaul.emilkowal.ski/api#portal) из Vaul.

### DrawerOverlay

Принимает свойства [`Drawer.Overlay`](https://vaul.emilkowal.ski/api#overlay) из Vaul.

### DrawerContent

Принимает свойства [`Drawer.Content`](https://vaul.emilkowal.ski/api#content) из Vaul.

Поддерживает атрибут `data-vaul-drawer-direction` для управления позиционированием.

### DrawerClose

Кнопка закрытия панели (крестик), встроенная в `DrawerHeader`. Принимает свойства [`Drawer.Close`](https://vaul.emilkowal.ski/api#close) из Vaul, за исключением:

| Свойство   | Причина                        |
| :--------- | :----------------------------- |
| `children` | Зафиксировано — иконка `IconX` |

А также дополнительные свойства:

| Свойство  | Тип                                   | Описание      |
| :-------- | :------------------------------------ | :------------ |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер кнопки |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля |

### DrawerHeader

Принимает все свойства `div`. Автоматически рендерит `DrawerClose` справа.

### DrawerTitle

Принимает свойства [`Drawer.Title`](https://vaul.emilkowal.ski/api#title) из Vaul.

### DrawerDescription

Принимает свойства [`Drawer.Description`](https://vaul.emilkowal.ski/api#description) из Vaul.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                    | Описание                                        |
| :----------------------- | :---------------------------------------------- |
| `--background`           | Фон `DrawerContent`                             |
| `--foreground`           | Текст `DrawerContent`                           |
| `--muted`                | Цвет индикатора-ручки (drag handle)             |
| `--secondary`            | Фон кнопки `DrawerClose`                        |
| `--secondary-foreground` | Цвет иконки `DrawerClose` и `DrawerDescription` |

---

## API Reference

См. документацию [Vaul API](https://vaul.emilkowal.ski/api).
