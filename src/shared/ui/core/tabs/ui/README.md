# Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui-kit/core'
```

Компонент `Tabs` — набор панелей с контентом, отображаемых по одной. Основан на [Radix Tabs](https://www.radix-ui.com/docs/primitives/components/tabs).

---

## Использование

```tsx
<Tabs defaultValue="1">
  <TabsList>
    <TabsTrigger value="1">Trigger 1</TabsTrigger>
    <TabsTrigger value="2">Trigger 2</TabsTrigger>
  </TabsList>
  <TabsContent value="1">Content 1</TabsContent>
  <TabsContent value="2">Content 2</TabsContent>
</Tabs>
```

---

## Композиция

```text
Tabs
├── TabsList
│   ├── TabsTrigger
│   └── TabsTrigger
├── TabsContent
└── TabsContent
```

---

## Свойства

### Tabs

Принимает свойства [`Tabs.Root`](https://www.radix-ui.com/docs/primitives/components/tabs#root) из Radix UI, за исключением:

| Свойство         | Причина                    |
| :--------------- | :------------------------- |
| `activationMode` | Зафиксировано как `manual` |
| `orientation`    | Не поддерживается          |

### TabsList

Принимает все свойства [`Tabs.List`](https://www.radix-ui.com/docs/primitives/components/tabs#list) из Radix UI.

### TabsTrigger

Принимает свойства [`Tabs.Trigger`](https://www.radix-ui.com/docs/primitives/components/tabs#trigger) из Radix UI.

### TabsContent

Принимает все свойства [`Tabs.Content`](https://www.radix-ui.com/docs/primitives/components/tabs#content) из Radix UI.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                              | Описание                                      |
| :--------------------------------- | :-------------------------------------------- |
| `--background`                     | Фон `TabsList`                                |
| `--border`                         | Граница `TabsList`                            |
| `--constructive`                   | Фон активного `TabsTrigger`                   |
| `--constructive-active`            | Фон активного `TabsTrigger` при наведении     |
| `--constructive-foreground`        | Текст активного `TabsTrigger`                 |
| `--constructive-foreground-active` | Текст активного `TabsTrigger` при наведении   |
| `--muted-foreground`               | Текст неактивного `TabsTrigger`               |
| `--primary`                        | Текст неактивного `TabsTrigger` при наведении |

---

## API Reference

См. документацию [Radix Tabs API](https://www.radix-ui.com/docs/primitives/components/tabs#api-reference).
