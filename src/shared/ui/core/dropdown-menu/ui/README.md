# DropdownMenu

```tsx
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from 'ui-kit/core'
```

Компонент `DropdownMenu` — выпадающее меню с поддержкой вложенных подменю и чекбокс-пунктов. Основан на [Radix DropdownMenu](https://www.radix-ui.com/docs/primitives/components/dropdown-menu).

---

## Использование

```tsx
<DropdownMenu>
  <DropdownMenuTrigger className="rounded-none">Trigger</DropdownMenuTrigger>
  <DropdownMenuPortal>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem className="h-11 px-3 font-medium">Value 1</DropdownMenuItem>
        <DropdownMenuItem className="h-11 px-3 font-medium">Value 2</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="h-11 px-3 font-medium">Value 3</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem className="h-11 px-3 font-medium">Checkbox Value 1</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked className="h-11 px-3 font-medium">
              Checkbox Value 2
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="h-11 px-3 font-medium">Checkbox Value 3</DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenuPortal>
</DropdownMenu>
```

---

## Композиция

```text
DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuPortal
    └── DropdownMenuContent
        └── DropdownMenuGroup
            ├── DropdownMenuItem
            └── DropdownMenuSub
                ├── DropdownMenuSubTrigger
                └── DropdownMenuSubContent
                    └── DropdownMenuCheckboxItem
```

---

## Свойства

### DropdownMenu

Принимает свойства [`DropdownMenu.Root`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#root) из Radix UI.

### DropdownMenuTrigger

Принимает свойства [`DropdownMenu.Trigger`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#trigger) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### DropdownMenuPortal

Принимает все свойства [`DropdownMenu.Portal`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#portal) из Radix UI.

### DropdownMenuContent

Принимает свойства [`DropdownMenu.Content`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#content) из Radix UI.

Значение по умолчанию для `sideOffset` — `8`.

### DropdownMenuGroup

Принимает все стандартные свойства HTML-элемента `<div>`.

### DropdownMenuItem

Принимает свойства [`DropdownMenu.Item`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#item) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### DropdownMenuSub

Принимает все свойства [`DropdownMenu.Sub`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#sub) из Radix UI.

### DropdownMenuSubTrigger

Принимает свойства [`DropdownMenu.SubTrigger`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#subtrigger) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### DropdownMenuSubContent

Принимает свойства [`DropdownMenu.SubContent`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#subcontent) из Radix UI.

Значение по умолчанию для `sideOffset` — `16`.

### DropdownMenuCheckboxItem

Принимает свойства [`DropdownMenu.CheckboxItem`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#checkboxitem) из Radix UI, а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                  | Описание                                                     |
| :--------------------- | :----------------------------------------------------------- |
| `--accent`             | Фон `DropdownMenuItem` и других пунктов при фокусе           |
| `--accent-foreground`  | Текст `DropdownMenuItem` и других пунктов при фокусе         |
| `--constructive`       | Цвет иконки-галочки у отмеченного `DropdownMenuCheckboxItem` |
| `--popover`            | Фон `DropdownMenuContent` и `DropdownMenuSubContent`         |
| `--popover-foreground` | Текст `DropdownMenuContent` и `DropdownMenuSubContent`       |

---

## API Reference

См. документацию [Radix DropdownMenu API](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#api-reference).
