# Button

```tsx
import { Button, buttonVariants } from 'ui-kit/core'
```

Компонент `Button` — триггер для выполнения действий.

---

## Варианты

Внешний вид задается свойством `variant`.

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
<Button variant="constructive">Constructive</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="textConstructive">Text Constructive</Button>
<Button variant="textDestructive">Text Destructive</Button>
```

---

## Размеры

Размер задается свойством `size`.

| Размер   | Высота |
| :------- | :----- |
| `large`  | 56px   |
| `medium` | 40px   |
| `small`  | 28px   |

```tsx
<Button size="large">Large</Button>
<Button size="medium">Medium</Button>
<Button size="small">Small</Button>
```

---

## Состояния

### Disabled

```tsx
<Button disabled>Disabled</Button>
```

### Loading

При `isLoading={true}` содержимое заменяется индикатором загрузки, взаимодействие блокируется.

```tsx
<Button isLoading />
```

---

## Иконки

Передаются как дочерние элементы вместе с текстом или без.

```tsx
<Button>
  <Icon />
  With Icon
</Button>

<Button>
  <Icon />
  <span className="sr-only">Without Icon</span>
</Button>
```

---

## Утилита `buttonVariants`

`buttonVariants` — функция на основе `cva`, которая генерирует CSS-классы кнопки. Используется для применения стилей кнопки к произвольному элементу: `<a>` или любому другому тегу.

```tsx
<a className={buttonVariants({})} href="https://example.com" rel="noopener noreferrer" target="_blank">
  Link
</a>
```

---

## Свойства

Компонент принимает все нативные атрибуты `<button>`, а также:

| Свойство    | Тип             | По умолчанию | Описание           |
| :---------- | :-------------- | :----------: | :----------------- |
| `isLoading` | `boolean`       |   `false`    | Состояние загрузки |
| `size`      | `ButtonSize`    |      —       | Размер кнопки      |
| `variant`   | `ButtonVariant` |      —       | Внешний вид кнопки |

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

### `constructive`

| Токен                                | Описание                   |
| :----------------------------------- | :------------------------- |
| `--constructive`                     | Фон                        |
| `--constructive-active`              | Фон при наведении          |
| `--constructive-disabled`            | Фон в состоянии disabled   |
| `--constructive-foreground`          | Текст                      |
| `--constructive-foreground-active`   | Текст при наведении        |
| `--constructive-foreground-disabled` | Текст в состоянии disabled |

### `destructive`

| Токен                               | Описание                   |
| :---------------------------------- | :------------------------- |
| `--destructive`                     | Фон                        |
| `--destructive-active`              | Фон при наведении          |
| `--destructive-disabled`            | Фон в состоянии disabled   |
| `--destructive-foreground`          | Текст                      |
| `--destructive-foreground-active`   | Текст при наведении        |
| `--destructive-foreground-disabled` | Текст в состоянии disabled |

### `ghost` / `outline`

| Токен                          | Описание                                 |
| :----------------------------- | :--------------------------------------- |
| `--accent`                     | Фон при наведении                        |
| `--accent-disabled`            | Граница в состоянии disabled (`outline`) |
| `--accent-foreground`          | Текст при наведении                      |
| `--accent-foreground-disabled` | Текст в состоянии disabled               |
| `--primary`                    | Граница (`outline`)                      |

### `secondary`

| Токен                             | Описание                   |
| :-------------------------------- | :------------------------- |
| `--secondary`                     | Фон                        |
| `--secondary-disabled`            | Фон в состоянии disabled   |
| `--secondary-foreground`          | Текст                      |
| `--secondary-foreground-disabled` | Текст в состоянии disabled |

### `textConstructive`

| Токен                                | Описание                         |
| :----------------------------------- | :------------------------------- |
| `--constructive`                     | Цвет текста                      |
| `--constructive-active`              | Цвет текста при наведении        |
| `--constructive-foreground-disabled` | Цвет текста в состоянии disabled |

### `textDestructive`

| Токен                               | Описание                         |
| :---------------------------------- | :------------------------------- |
| `--destructive-foreground`          | Цвет текста                      |
| `--destructive-foreground-active`   | Цвет текста при наведении        |
| `--destructive-foreground-disabled` | Цвет текста в состоянии disabled |
