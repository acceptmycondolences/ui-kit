# Textarea

```tsx
import { Textarea } from 'ui-kit/core'
```

Компонент `Textarea` — многострочное поле ввода с поддержкой состояний ошибки и блокировки.

---

## Использование

```tsx
<Textarea placeholder="Placeholder" />
```

---

## Примеры

### С ошибкой

```tsx
<Textarea aria-invalid placeholder="Placeholder" />
```

### Заблокированное

```tsx
<Textarea disabled placeholder="Placeholder" />
```

---

## Свойства

Принимает все стандартные свойства `<textarea>`.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                         | Описание                                               |
| :---------------------------- | :----------------------------------------------------- |
| `--constructive`              | Цвет каретки в обычном состоянии                       |
| `--destructive`               | Фон поля в состоянии ошибки                            |
| `--destructive-foreground`    | Цвет текста, каретки и плейсхолдера в состоянии ошибки |
| `--destructive-foreground/40` | Цвет обводки в состоянии ошибки                        |
| `--muted`                     | Фон поля                                               |
| `--muted-foreground`          | Цвет плейсхолдера                                      |
