# Toaster

```tsx
import { Toaster } from 'ui-kit/core'
import { toast } from 'sonner'
```

Компонент `Toaster` — контейнер для отображения всплывающих уведомлений. Рендерится один раз на уровне приложения; уведомления вызываются через imperative API `toast`.

---

## Использование

```tsx
// 1. Подключить компонент Toaster один раз на уровне провайдера
<Toaster />

// 2. Вызывать из любого места приложения
toast('Title', { closeButton: true, description: 'Description' })
```

---

## Варианты

| Вариант   | Метод             | Описание                           |
| :-------- | :---------------- | :--------------------------------- |
| `default` | `toast()`         | Нейтральное уведомление            |
| `error`   | `toast.error()`   | Деструктивное событие или ошибка   |
| `info`    | `toast.info()`    | Информационное сообщение           |
| `loading` | `toast.loading()` | Асинхронная операция в процессе    |
| `success` | `toast.success()` | Успешное завершение операции       |
| `warning` | `toast.warning()` | Предупреждение, требующее внимания |

```tsx
toast('Title', { closeButton: true, description: 'Description' })
toast.error('Title', { closeButton: true, description: 'Description' })
toast.info('Title', { closeButton: true, description: 'Description' })
toast.loading('Title', { closeButton: true, description: 'Description' })
toast.success('Title', { closeButton: true, description: 'Description' })
toast.warning('Title', { closeButton: true, description: 'Description' })
```

---

## Свойства `toast()`

Все параметры соответствуют API библиотеки [sonner](https://sonner.emilkowal.ski/toast#api-reference).

---

## Размещение

Компонент `Toaster` рендерится **единожды** — как правило, в корневом провайдере приложения. Уведомления отображаются по центру сверху. Дублирование компонента приводит к наложению уведомлений.

```tsx
// app/providers/Providers.tsx
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
```

---

## Размер

На экранах шире `600px` уведомление имеет фиксированную ширину `16.25rem` (`260px`). На меньших экранах Sonner адаптирует ширину к доступному пространству с учетом боковых отступов.

---

## CSS API

Токены, используемые компонентом. Переопределяются на уровне темы через `:root` или `.dark`.

| Токен                      | Описание                                      |
| :------------------------- | :-------------------------------------------- |
| `--border`                 | Граница уведомления                           |
| `--constructive`           | Цвет иконки варианта `success`                |
| `--destructive-foreground` | Цвет иконки варианта `error`                  |
| `--font-sans`              | Шрифт уведомления                             |
| `--informative`            | Цвет иконки варианта `info`                   |
| `--muted-foreground`       | Цвет иконки закрытия в состоянии по умолчанию |
| `--popover`                | Фон уведомления                               |
| `--popover-foreground`     | Цвет заголовка и описания                     |
| `--primary`                | Цвет иконки закрытия при наведении            |
| `--shadow-toaster`         | Тень уведомления                              |
| `--warning`                | Цвет иконки варианта `warning`                |
