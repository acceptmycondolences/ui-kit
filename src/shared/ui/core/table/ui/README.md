# Table

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui-kit/core'
```

Компонент `Table` — таблица для отображения структурированных данных.

---

## Использование

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Head 1</TableHead>
      <TableHead>Head 2</TableHead>
      <TableHead>Head 3</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
      <TableCell>Cell 3</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Композиция

```text
Table
├── TableHeader
│   └── TableRow
│       └── TableHead
└── TableBody
    └── TableRow
        └── TableCell
```

---

## Свойства

Все компоненты принимают нативные атрибуты соответствующего HTML-элемента.

| Компонент     | HTML-элемент |
| :------------ | :----------- |
| `Table`       | `<table>`    |
| `TableHeader` | `<thead>`    |
| `TableBody`   | `<tbody>`    |
| `TableRow`    | `<tr>`       |
| `TableHead`   | `<th>`       |
| `TableCell`   | `<td>`       |

`Table` также принимает дополнительное свойство:

| Свойство             | Тип      | Описание                                                           |
| :------------------- | :------- | :----------------------------------------------------------------- |
| `containerClassName` | `string` | Классы для внешнего контейнера с горизонтальной прокруткой таблицы |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                    | Описание                                      |
| :----------------------- | :-------------------------------------------- |
| `--border`               | Цвет разделителя между строками в `TableBody` |
| `--secondary`            | Фон `TableHeader` и `TableRow` при наведении  |
| `--secondary-foreground` | Текст `TableHeader`                           |
