# Checkbox

```tsx
import { Checkbox } from 'ui-kit/core'
```

Компонент `Checkbox` — флажок для выбора булевого значения или отображения неопределенного состояния. Основан на [Radix Checkbox](https://www.radix-ui.com/docs/primitives/components/checkbox).

---

## Использование

```tsx
<Checkbox />
```

---

## Состояния

### По умолчанию

```tsx
<Checkbox />
```

### Неопределенное (Indeterminate)

```tsx
const [checked, setChecked] = useState<'indeterminate' | boolean>('indeterminate')

<Checkbox checked={checked} onCheckedChange={setChecked} />
```

### Невалидное (Invalid)

```tsx
<Checkbox aria-invalid={true} />
```

### Отключенное (Disabled)

```tsx
<Checkbox checked disabled />
```

---

## Свойства

### Checkbox

Принимает все свойства [`Checkbox.Root`](https://www.radix-ui.com/docs/primitives/components/checkbox#root) из Radix UI.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                                | Описание                                             |
| :----------------------------------- | :--------------------------------------------------- |
| `--constructive`                     | Фон флажка и цвет иконки в состоянии `indeterminate` |
| `--constructive-active`              | Фон флажка при наведении в состоянии `checked`       |
| `--constructive-disabled`            | Фон флажка в состоянии `disabled`                    |
| `--constructive-foreground`          | Цвет иконки в состоянии `checked`                    |
| `--constructive-foreground-active`   | Цвет иконки при наведении в состоянии `checked`      |
| `--constructive-foreground-disabled` | Цвет иконки в состоянии `disabled`                   |
| `--destructive`                      | Фон флажка в состоянии `aria-invalid`                |
| `--destructive-active`               | Фон флажка при наведении в состоянии `aria-invalid`  |
| `--destructive-foreground`           | Цвет иконки и кольца в состоянии `aria-invalid`      |
| `--destructive-foreground-active`    | Цвет иконки при наведении в состоянии `aria-invalid` |
| `--secondary`                        | Фон флажка в состоянии `unchecked`                   |

---

## API Reference

См. документацию [Radix Checkbox API](https://www.radix-ui.com/docs/primitives/components/checkbox#api-reference).
