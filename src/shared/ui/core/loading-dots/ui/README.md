# LoadingDots

```tsx
import { LoadingDots } from 'ui-kit/core'
```

Компонент `LoadingDots` — анимированный индикатор загрузки из трех пульсирующих точек.

---

## Варианты

Цвет точек задается свойством `variant` и соответствует палитре компонента `Button`.

| Вариант            | Назначение                                 |
| :----------------- | :----------------------------------------- |
| `constructive`     | Основное действие                          |
| `destructive`      | Опасное действие                           |
| `ghost`            | Вспомогательное действие без фона          |
| `outline`          | Вторичное действие с границей              |
| `secondary`        | Вторичное действие                         |
| `textConstructive` | Текстовая ссылка конструктивного характера |
| `textDestructive`  | Текстовая ссылка деструктивного характера  |

```tsx
<LoadingDots variant="constructive" />
<LoadingDots variant="destructive" />
<LoadingDots variant="ghost" />
<LoadingDots variant="outline" />
<LoadingDots variant="secondary" />
<LoadingDots variant="textConstructive" />
<LoadingDots variant="textDestructive" />
```

---

## Доступность

Компонент имеет `aria-label="Loading"` и `role="status"`, что позволяет скринридерам корректно его интерпретировать. Дополнительная разметка не требуется.

---

## Свойства

Компонент принимает все нативные атрибуты `<div>`, кроме `children`, а также:

| Свойство  | Тип                  | По умолчанию | Описание   |
| :-------- | :------------------- | :----------: | :--------- |
| `variant` | `LoadingDotsVariant` |      —       | Цвет точек |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Вариант            | Токен                       | Описание   |
| :----------------- | :-------------------------- | :--------- |
| `constructive`     | `--constructive-foreground` | Цвет точек |
| `destructive`      | `--destructive-foreground`  | Цвет точек |
| `ghost`            | `--primary`                 | Цвет точек |
| `outline`          | `--primary`                 | Цвет точек |
| `secondary`        | `--secondary-foreground`    | Цвет точек |
| `textConstructive` | `--constructive`            | Цвет точек |
| `textDestructive`  | `--destructive-foreground`  | Цвет точек |
