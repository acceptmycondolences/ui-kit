# Badge

```tsx
import { Badge, badgeVariants } from 'ui-kit/core'
```

Компонент `Badge` — метка для отображения статуса, категории или короткого информационного тега.

---

## Варианты

Внешний вид задается свойством `variant`.

| Вариант            | Назначение                         |
| :----------------- | :--------------------------------- |
| `constructive`     | Позитивный статус                  |
| `constructiveSoft` | Мягкий позитивный статус           |
| `destructive`      | Негативный статус                  |
| `destructiveSoft`  | Мягкий негативный статус           |
| `informative`      | Информационный статус              |
| `informativeSoft`  | Мягкий информационный статус       |
| `muted`            | Приглушенный статус                |
| `mutedSoft`        | Мягкий приглушенный статус         |
| `warning`          | Предупреждение, требующее внимания |
| `warningSoft`      | Мягкое предупреждение              |

```tsx
<Badge variant="constructive">Constructive</Badge>
<Badge variant="constructiveSoft">Constructive Soft</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="destructiveSoft">Destructive Soft</Badge>
<Badge variant="informative">Informative</Badge>
<Badge variant="informativeSoft">Informative Soft</Badge>
<Badge variant="muted">Muted</Badge>
<Badge variant="mutedSoft">Muted Soft</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="warningSoft">Warning Soft</Badge>
```

---

## Иконки

Передаются как дочерние элементы вместе с текстом или без.

```tsx
<Badge variant="constructive">
  <Icon />
  With Icon
</Badge>

<Badge variant="destructive">
  <Icon />
  <span className="sr-only">Without Icon</span>
</Badge>
```

---

## Утилита `badgeVariants`

`badgeVariants` — функция на основе `cva`, которая генерирует CSS-классы метки. Используется для применения стилей badge к произвольному элементу.

```tsx
<span className={badgeVariants({ variant: 'informative' })}>Informative</span>
```

---

## Свойства

Компонент принимает все нативные атрибуты `<span>`, а также:

| Свойство  | Тип            | По умолчанию | Описание          |
| :-------- | :------------- | :----------: | :---------------- |
| `variant` | `BadgeVariant` |      —       | Внешний вид метки |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.
Варианты `constructiveSoft`, `informativeSoft` и `warningSoft` используют фиксированные значения фона и токены для цвета текста.

### `constructive`

| Токен                       | Описание |
| :-------------------------- | :------- |
| `--constructive`            | Фон      |
| `--constructive-foreground` | Текст    |

### `constructiveSoft`

| Токен            | Описание |
| :--------------- | :------- |
| `--constructive` | Текст    |

### `destructive`

| Токен                      | Описание |
| :------------------------- | :------- |
| `--destructive-foreground` | Фон      |

### `destructiveSoft`

| Токен                      | Описание |
| :------------------------- | :------- |
| `--destructive`            | Фон      |
| `--destructive-foreground` | Текст    |

### `informative`

| Токен                      | Описание |
| :------------------------- | :------- |
| `--informative`            | Фон      |
| `--informative-foreground` | Текст    |

### `informativeSoft`

| Токен           | Описание |
| :-------------- | :------- |
| `--informative` | Текст    |

### `muted`

| Токен                | Описание |
| :------------------- | :------- |
| `--muted-foreground` | Фон      |

### `mutedSoft`

| Токен                 | Описание |
| :-------------------- | :------- |
| `--accent-foreground` | Текст    |
| `--muted`             | Фон      |

### `warning`

| Токен                  | Описание |
| :--------------------- | :------- |
| `--warning`            | Фон      |
| `--warning-foreground` | Текст    |

### `warningSoft`

| Токен       | Описание |
| :---------- | :------- |
| `--warning` | Текст    |
