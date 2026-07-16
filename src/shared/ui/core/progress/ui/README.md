# Progress

```tsx
import { Progress } from 'ui-kit/core'
```

Компонент `Progress` — индикатор выполнения задачи. Основан на [Radix Progress](https://www.radix-ui.com/docs/primitives/components/progress).

---

## Использование

```tsx
<Progress value={value} />
```

---

## Свойства

Принимает все свойства [`Progress.Root`](https://www.radix-ui.com/docs/primitives/components/progress#root) из Radix UI.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен               | Описание       |
| :------------------ | :------------- |
| `--accent-disabled` | Фон трека      |
| `--constructive`    | Фон индикатора |

---

## API Reference

См. документацию [Radix Progress API](https://www.radix-ui.com/docs/primitives/components/progress#api-reference).
