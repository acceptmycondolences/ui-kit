# Sheet

```tsx
import { Sheet, SheetBack, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger } from 'ui-kit/core'
```

Компонент `Sheet` — боковая панель для отображения контента поверх основного интерфейса. Основан на [Radix Dialog](https://www.radix-ui.com/docs/primitives/components/dialog).

---

## Использование

```tsx
<Sheet>
  <SheetTrigger className="rounded-none">Trigger</SheetTrigger>
  <SheetPortal>
    <SheetOverlay />
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Title</SheetTitle>
        <SheetDescription>Description</SheetDescription>
      </SheetHeader>
      <div className="py-2 md:py-6">Content</div>
    </SheetContent>
  </SheetPortal>
</Sheet>
```

---

## Композиция

```text
Sheet
├── SheetTrigger
└── SheetPortal
    ├── SheetOverlay
    └── SheetContent
        ├── SheetHeader (isClose={true}  → SheetClose)
        │   ├── SheetTitle
        │   └── SheetDescription
        └── [content]

SheetHeader (isClose={false} → SheetBack)
```

---

## Свойства

### Sheet

Принимает все свойства [`Dialog.Root`](https://www.radix-ui.com/docs/primitives/components/dialog#root) из Radix UI.

### SheetTrigger

Принимает свойства [`Dialog.Trigger`](https://www.radix-ui.com/docs/primitives/components/dialog#trigger) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание      |
| :-------- | :------------------------------------ | :------------ |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер кнопки |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля |

### SheetPortal

Принимает все свойства [`Dialog.Portal`](https://www.radix-ui.com/docs/primitives/components/dialog#portal) из Radix UI.

### SheetOverlay

Принимает свойства [`Dialog.Overlay`](https://www.radix-ui.com/docs/primitives/components/dialog#overlay) из Radix UI.

### SheetContent

Принимает свойства [`Dialog.Content`](https://www.radix-ui.com/docs/primitives/components/dialog#content) из Radix UI.

### SheetClose

Кнопка закрытия панели, построенная на `Dialog.Close`. На мобильных устройствах отображается иконка `IconArrowLeft` слева, на десктопе — `IconX` справа. Принимает свойства [`Dialog.Close`](https://www.radix-ui.com/docs/primitives/components/dialog#close) из Radix UI, за исключением:

| Свойство   | Причина                                          |
| :--------- | :----------------------------------------------- |
| `children` | Зафиксировано — иконка `IconX` / `IconArrowLeft` |

А также дополнительные свойства:

| Свойство  | Тип                                   | Описание      |
| :-------- | :------------------------------------ | :------------ |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер кнопки |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля |

### SheetBack

Кнопка навигации «назад», построенная на `Button`. Используется внутри `SheetHeader` при `isClose={false}`. Принимает все свойства `Button`, за исключением:

| Свойство   | Причина                                |
| :--------- | :------------------------------------- |
| `children` | Зафиксировано — иконка `IconArrowLeft` |

### SheetHeader

Принимает все свойства `div`, а также дополнительные:

| Свойство  | Тип         | По умолчанию | Описание                                                                                     |
| :-------- | :---------- | :----------- | :------------------------------------------------------------------------------------------- |
| `action`  | `ReactNode` | —            | Дополнительное действие, отображаемое в правой части шапки (только на мобильных устройствах) |
| `isClose` | `boolean`   | `true`       | `true` — рендерит `SheetClose`, `false` — рендерит `SheetBack`                               |

### SheetTitle

Принимает свойства [`Dialog.Title`](https://www.radix-ui.com/docs/primitives/components/dialog#title) из Radix UI.

### SheetDescription

Принимает свойства [`Dialog.Description`](https://www.radix-ui.com/docs/primitives/components/dialog#description) из Radix UI.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                    | Описание                                                             |
| :----------------------- | :------------------------------------------------------------------- |
| `--background`           | Фон `SheetContent`                                                   |
| `--border`               | Граница `SheetContent` и нижняя граница `SheetHeader`                |
| `--foreground`           | Текст `SheetContent`                                                 |
| `--muted-foreground`     | Цвет иконок `SheetClose` и `SheetBack` в обычном состоянии (десктоп) |
| `--primary`              | Цвет иконок `SheetClose` и `SheetBack` при наведении (десктоп)       |
| `--secondary-foreground` | Цвет текста `SheetDescription`                                       |

---

## API Reference

См. документацию [Radix Dialog API](https://www.radix-ui.com/docs/primitives/components/dialog#api-reference).
