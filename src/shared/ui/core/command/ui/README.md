# Command

```tsx
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from 'ui-kit/core'
```

Компонент `Command` — палитра команд с поиском и фильтрацией. Основан на [cmdk](https://cmdk.paco.me).

---

## Использование

```tsx
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
  const [selected, setSelected] = useState('')

  const handleSelect = (newValue: string) => {
    setSelected(newValue)
  }

  return (
    <div className="w-75">
      <Command>
        <CommandInput placeholder="Placeholder" />
        <CommandList>
          <CommandEmpty className="py-4" description="Description" title="Title" />
          <CommandGroup className="py-4">
            {OPTIONS.map((option) => (
              <CommandItem className="min-h-11 gap-4 p-3 font-medium [&_svg]:size-4 [&_svg]:text-constructive [&_svg]:ml-auto" key={option.value} keywords={[option.label]} onSelect={handleSelect} value={option.value}>
                {option.label} {selected === option.value && <IconCheck />}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
```

---

## Примеры

### С Popover и множественным выбором

Комбинация `Command` и `Popover` позволяет реализовать выпадающий список с поиском и множественным выбором через чекбоксы.

```tsx
function WithPopoverRender() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)

    if (!newOpen) {
      setSearch('')
    }
  }

  const toggleAll = () => {
    setSelected((previousValue) => {
      if (previousValue.length === 0) {
        return OPTIONS.map((option) => option.value)
      }

      return []
    })
  }

  const toggleValue = (newValue: string) => {
    setSelected((previousValue) => (previousValue.includes(newValue) ? previousValue.filter((value) => value !== newValue) : [...previousValue, newValue]))
  }

  const isAllSelected = selected.length === OPTIONS.length
  const isIndeterminate = selected.length > 0 && !isAllSelected

  const checked = isAllSelected ? true : isIndeterminate ? 'indeterminate' : false

  return (
    <Popover onOpenChange={handleOpenChange} open={open}>
      <PopoverTrigger className="rounded-none">Trigger</PopoverTrigger>
      <PopoverContent align="start" className="w-75">
        <Command>
          <div className="px-4 pt-4 pb-2">
            <CommandInput onValueChange={setSearch} placeholder="Placeholder" value={search} variant="small" />
          </div>
          <CommandList>
            <CommandEmpty className="pt-2 pb-4" description="Description" title="Title" />
            {search.length === 0 && (
              <CommandGroup className="px-4 pb-2">
                <CommandItem>
                  <Checkbox
                    checked={checked}
                    id="all"
                    onCheckedChange={() => {
                      toggleAll()
                    }}
                  />
                  <label className="min-h-10.5 pl-4 text-sm font-medium peer-data-[state=checked]:text-primary inline-flex flex-1 cursor-pointer items-center" htmlFor="all">
                    All
                  </label>
                </CommandItem>
              </CommandGroup>
            )}
            <CommandSeparator />
            <CommandGroup className="px-4 pt-2 pb-4">
              {OPTIONS.map((option) => (
                <CommandItem key={option.value} keywords={[option.label]}>
                  <Checkbox
                    checked={selected.includes(option.value)}
                    id={option.value}
                    onCheckedChange={() => {
                      toggleValue(option.value)
                    }}
                  />
                  <label className="min-h-10.5 pl-4 text-sm font-medium peer-data-[state=checked]:text-primary inline-flex flex-1 cursor-pointer items-center" htmlFor={option.value}>
                    {option.label}
                  </label>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

---

## Фильтрация

`Command` использует `commandFilter` — фильтрует элементы по `keywords[0]`, а не по `value`. Это позволяет хранить в `value` технический идентификатор, а поиск вести по отображаемому label.

```tsx
<CommandItem keywords={[option.label]} value={option.value}>
  {option.label}
</CommandItem>
```

Если `keywords` не переданы, фильтрация происходит по `value`.

---

## Композиция

```text
Command
├── CommandInput
└── CommandList
    ├── CommandEmpty
    ├── CommandGroup
    │   └── CommandItem
    ├── CommandSeparator
    └── CommandGroup
        └── CommandItem
```

---

## Свойства

### Command

Принимает свойства [`Command`](https://cmdk.paco.me) из cmdk.

> Фильтрация задана через `commandFilter` и не переопределяется снаружи.

### CommandInput

Принимает все свойства [`Command.Input`](https://cmdk.paco.me) из cmdk, а также дополнительные свойства:

| Свойство  | Тип                  | По умолчанию | Описание          |
| :-------- | :------------------- | :----------- | :---------------- |
| `variant` | `'large' \| 'small'` | `'large'`    | Размер поля ввода |

### CommandList

Принимает все свойства [`Command.List`](https://cmdk.paco.me) из cmdk.

При изменении поискового запроса автоматически сбрасывает позицию прокрутки в начало списка.

### CommandEmpty

Не принимает `children`. Содержимое задается через обязательные свойства:

| Свойство      | Тип      | Описание                    |
| :------------ | :------- | :-------------------------- |
| `description` | `string` | Описание пустого состояния  |
| `title`       | `string` | Заголовок пустого состояния |

Также принимает все остальные свойства [`Command.Empty`](https://cmdk.paco.me) из cmdk.

### CommandGroup

Принимает свойства [`Command.Group`](https://cmdk.paco.me) из cmdk, за исключением:

| Свойство  | Причина           |
| :-------- | :---------------- |
| `heading` | Не поддерживается |

### CommandItem

Принимает свойства [`Command.Item`](https://cmdk.paco.me) из cmdk и [`buttonVariants`](#), а также дополнительные свойства:

| Свойство  | Тип                                   | Описание             |
| :-------- | :------------------------------------ | :------------------- |
| `size`    | `VariantProps<typeof buttonVariants>` | Размер пункта        |
| `variant` | `VariantProps<typeof buttonVariants>` | Вариант стиля пункта |

### CommandSeparator

Принимает все свойства [`Command.Separator`](https://cmdk.paco.me) из cmdk.

Используйте `CommandSeparator` между группами вместо ручного `<div>`, чтобы разделитель корректно скрывался во время поиска.

---

## Доступность

Компонент `CommandInput` автоматически управляет атрибутами для корректной работы со вспомогательными технологиями.

| Механизм           | Описание                                               |
| :----------------- | :----------------------------------------------------- |
| `aria-describedby` | Формируется автоматически из id элемента иконки поиска |
| `aria-invalid`     | Семантическое обозначение ошибки для скринридеров      |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                      | Описание                                                  |
| :------------------------- | :-------------------------------------------------------- |
| `--accent`                 | Фон `CommandItem` при выделении                           |
| `--accent-foreground`      | Текст `CommandItem` при выделении                         |
| `--border`                 | Цвет `CommandSeparator`                                   |
| `--constructive`           | Цвет каретки в `CommandInput`                             |
| `--destructive`            | Фон `CommandInput` в состоянии `aria-invalid`             |
| `--destructive-foreground` | Текст и каретка `CommandInput` в состоянии `aria-invalid` |
| `--muted`                  | Фон `CommandInput`                                        |
| `--muted-foreground`       | Цвет плейсхолдера и иконки поиска в `CommandInput`        |
| `--primary`                | Текст выделенного `CommandItem` с кнопкой                 |
| `--secondary-foreground`   | Цвет иконки и текста описания в `CommandEmpty`            |

---

## API Reference

См. документацию [cmdk API](https://cmdk.paco.me).
