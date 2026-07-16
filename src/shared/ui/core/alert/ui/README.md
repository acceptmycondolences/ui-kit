# Alert

```tsx
import { Alert, AlertDescription, AlertTitle } from 'ui-kit/core'
```

Компонент `Alert` — информационный блок для привлечения внимания пользователя к важному сообщению.

---

## Использование

```tsx
<Alert>
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>
```

---

## Анатомия

| Компонент          | Описание                            |
| :----------------- | :---------------------------------- |
| `Alert`            | Корневой контейнер с `role="alert"` |
| `AlertTitle`       | Заголовок сообщения (полужирный)    |
| `AlertDescription` | Текст сообщения                     |

---

## Иконка

При передаче `<svg>`-элемента в качестве дочернего компонент автоматически переключается на двухколоночную сетку: иконка слева, заголовок и описание справа.

```tsx
<Alert>
  <IconAlertCircleFilled />
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>
```

---

## Свойства

### `Alert`

Принимает все нативные атрибуты `<div>`. Атрибут `role="alert"` задается автоматически.

### `AlertTitle`

Принимает все нативные атрибуты `<div>`.

### `AlertDescription`

Принимает все нативные атрибуты `<div>`.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                      | Описание             |
| :------------------------- | :------------------- |
| `--destructive`            | Фон контейнера       |
| `--destructive-foreground` | Цвет иконки и текста |
