# ui-kit

UI-компоненты на основе Tailwind CSS и Radix UI. Поставляются как именованные ES-экспорты с полной типизацией, встроенными стилями и поддержкой tree-shaking.

---

## Технологический стек

| Инструмент               | Назначение                                          |
| ------------------------ | --------------------------------------------------- |
| Node.js                  | Среда выполнения (>=24.0.0, engineStrict)           |
| pnpm                     | Пакетный менеджер (11.13.1)                         |
| Vite                     | Сборщик (library mode)                              |
| React                    | >=19 (peer dependency)                              |
| TypeScript               | Статическая типизация (strict mode)                 |
| ESLint                   | Линтер                                              |
| Prettier                 | Форматирование кода                                 |
| Husky + lint-staged      | Git-хуки: проверка измененных файлов перед коммитом |
| Tailwind CSS             | Утилитарные стили (v4)                              |
| tw-animate-css           | Анимации для Tailwind CSS                           |
| class-variance-authority | Типизированные варианты компонентов                 |
| clsx                     | Условная сборка className                           |
| cmdk                     | Примитив Command Menu                               |
| input-otp                | Примитив OTP-ввода                                  |
| Radix UI                 | Примитивы доступных компонентов                     |
| tailwind-merge           | Слияние Tailwind-классов без конфликтов             |
| vaul                     | Примитив Drawer                                     |
| Storybook                | Разработка и документация компонентов               |
| Vitest + Playwright      | Тестирование компонентов через Storybook            |
| vite-bundle-analyzer     | Анализ бандла Vite                                  |
| @tailwindcss/vite        | Интеграция Tailwind CSS с Vite                      |
| unplugin-dts             | Генерация TypeScript-деклараций                     |

---

## Структура проекта

```
ui-kit/
├── .storybook/             # Конфигурация Storybook
├── dist/                   # Артефакты сборки (gitignore)
│   ├── config/             # Модули конфигурации
│   ├── lib/                # Модули утилит, типов, хуков
│   ├── styles/
│   │   └── index.css       # Скомпилированные стили
│   ├── ui/                 # Модули отдельных компонентов и их связанная логика
│   ├── config.js           # Точка входа: конфигурация
│   └── lib.js              # Точка входа: библиотечный код
├── src/
│   ├── shared/             # Исходники публикуемой библиотеки
│   │   ├── config/         # Конфигурация, константы и общие настройки
│   │   ├── lib/            # Утилиты, типы, хуки
│   │   ├── styles/         # Глобальные стили и CSS-переменные
│   │   └── ui/             # Компоненты и связанная логика
│   └── widgets/            # Storybook-only виджеты и документационные примеры
└── vite.config.ts          # Конфигурация Vite (library mode)
```

---

## Установка

```bash
pnpm install
```

> Проект использует `engineStrict: true` — версии Node.js и pnpm зафиксированы в `package.json`.

---

## Доступные команды

```bash
# Форматирование кода
pnpm format

# Автоисправление ESLint
pnpm fix

# Линтинг
pnpm lint

# Проверка типов без сборки
pnpm check

# Полная проверка: format → fix → lint → tsc
pnpm validate

# Сборка библиотеки: tsc → vite build
pnpm build

# Запуск тестов Storybook
pnpm test-storybook

# Запуск Storybook (порт 6006)
pnpm storybook

# Сборка статического Storybook
pnpm build-storybook

# Публикация Storybook в Chromatic
pnpm chromatic

# Публикация уже собранного Storybook в Chromatic
pnpm chromatic:ci
```

Для локального запуска Chromatic создайте `.env.local` на основе `.env.example`.
Реальный Chromatic project token не хранится в репозитории; запросите его у одного из maintainers проекта.

```dotenv
VITE_CHROMATIC_PROJECT_TOKEN="<your-project-token>"
CHROMATIC_PROJECT_TOKEN=${VITE_CHROMATIC_PROJECT_TOKEN}
```

В CI задайте `CHROMATIC_PROJECT_TOKEN` или `VITE_CHROMATIC_PROJECT_TOKEN` в GitLab CI/CD variables.

```bash
pnpm chromatic
```

---

## Публичное API

Пакет предоставляет точки входа для конфигурации, утилит, стилей, core-компонентов и addons:

### Конфигурация

```ts
import { FIELD_LENGTHS, MEDIA_QUERIES, OTP_PATTERNS } from 'ui-kit/config'
```

Экспортирует общую конфигурацию и константы, используемые внутри библиотеки и доступные проектам-потребителям.

### Утилиты, типы, хуки

```ts
import {
  classNames,
  formatCreditCard,
  getRequiredEnv,
  getFormDigitsValue,
  isValidCreditCardNumber,
  parseCreditCardExpiry,
  useMeasure,
  useMediaQuery,
  type SelectOption,
} from 'ui-kit/lib'
```

Экспортирует: `classNames`, `env`, `formatters`, `getters`, `parsers`, `types`, `useMeasure`, `useMediaQuery`, `validators`

`getters` включает `getFormDigitsValue(currentValue: unknown, parsedValue: string)`: helper для digit-полей форм. Он возвращает `parsedValue` строкой, если текущее значение поля строковое, иначе приводит значение к `number`. Это позволяет `FormCardExpiryField`, `FormCardNumberField`, `FormInvoiceNumberField`, `FormPhoneField`, `FormPinflField`, `FormReceiptNumberField` и `FormTinField` сохранять тип, заданный в `defaultValues`.

`validators` включает `isValidCreditCardNumber(value: number | string)` и `isValidPinfl(value: number | string)`. `isValidCreditCardNumber` очищает значение до цифр через `parseCreditCardNumber`, требует длину `FIELD_LENGTHS.CARD_NUMBER` и проверяет контрольную сумму по алгоритму Луна. `isValidPinfl` очищает значение до цифр через `parsePinfl`, требует длину `FIELD_LENGTHS.PINFL` и проверяет контрольную цифру ПИНФЛ по весам `7, 3, 1`.

### Стили

```css
@import 'ui-kit/styles';
```

Подключает CSS-контракт библиотеки: дизайн-токены (CSS-переменные, темная тема) и Tailwind CSS 4 `@source`, который регистрирует собранные модули компонентов в `dist/ui`.

В проектах с Tailwind CSS 4 подключайте этот entrypoint через CSS `@import` в том же stylesheet, где импортируется `tailwindcss`, чтобы Tailwind обработал `@source`.

### UI-компоненты

```ts
import { Badge, Button, LoadingDots } from 'ui-kit/core'
```

Каждый компонент поставляется вместе со связанной логикой — типами пропсов, типами размеров и вариантов. У части компонентов дополнительно экспортируются константы (массивы допустимых размеров и вариантов) и CVA-варианты для использования в смежных компонентах:

```ts
import { BUTTON_SIZES, BUTTON_VARIANTS, buttonVariants, type ButtonProps, type ButtonSize, type ButtonVariant } from 'ui-kit/core'
```

Полный список компонентов core entrypoint:

`Alert`, `AlertDialog`, `Badge`, `Button`, `Checkbox`, `Command`, `Dialog`, `Drawer`, `DropdownMenu`, `Field`, `Input`, `InputOTP`, `LoadingDots`, `Popover`, `Progress`, `SearchBar`, `Select`, `Sheet`, `Table`, `Tabs`, `Textarea`, `Toaster`

`Form` использует опциональный `react-hook-form` и импортируется отдельно:

```ts
import { Form } from 'ui-kit/addons/form'
```

---

## Использование

Подключите стили в корневом CSS-файле проекта, а именно, `app/styles/index.css`:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@import 'ui-kit/styles';

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --font-sans: var(--font-sans);

  --color-border: var(--border);
  --color-ring: var(--ring);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-constructive: var(--constructive);
  --color-constructive-foreground: var(--constructive-foreground);
  --color-informative: var(--informative);
  --color-informative-foreground: var(--informative-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);

  --color-secondary-disabled: var(--secondary-disabled);
  --color-secondary-foreground-disabled: var(--secondary-foreground-disabled);
  --color-constructive-active: var(--constructive-active);
  --color-constructive-foreground-active: var(--constructive-foreground-active);
  --color-constructive-disabled: var(--constructive-disabled);
  --color-constructive-foreground-disabled: var(--constructive-foreground-disabled);
  --color-destructive-active: var(--destructive-active);
  --color-destructive-foreground-active: var(--destructive-foreground-active);
  --color-destructive-disabled: var(--destructive-disabled);
  --color-destructive-foreground-disabled: var(--destructive-foreground-disabled);
  --color-accent-disabled: var(--accent-disabled);
  --color-accent-foreground-disabled: var(--accent-foreground-disabled);

  --shadow-toaster: var(--shadow-toaster);
}

@layer base {
  * {
    @apply scrollbar-thin scrollbar-thumb-[#dedfe1] scrollbar-track-background border-border outline-hidden dark:scrollbar-thumb-[#3a3d45];
  }

  :focus-visible {
    @apply ring-3 ring-ring;
  }

  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

`ui-kit/styles` уже содержит Tailwind CSS 4 `@source`, указывающий на собранные компоненты библиотеки. Потребителю не нужно добавлять относительный путь вида `@source '../../../node_modules/ui-kit/dist'`.

Не используйте `@source 'ui-kit'`: в Tailwind CSS 4 `@source` принимает путь относительно stylesheet, а не npm package export. Для Vite + Tailwind CSS 4 стабильный контракт библиотеки — один импорт `@import 'ui-kit/styles';`.

Затем импортируйте утилиты, типы, хуки, компоненты, которые вам нужны.

Компоненты построены на Radix UI и принимают все стандартные пропсы соответствующих примитивов, расширенные через `class-variance-authority`.

---

## Шрифты

Библиотека использует корпоративный шрифт `pnfont`. Файлы шрифтов не включены в пакет — их необходимо разместить в проекте-потребителе вручную.

Создайте директорию `public/fonts/pnfont/` и поместите в нее файлы:

> Шрифт подключается через `@font-face` в `src/shared/styles/index.css` и автоматически применяется при импорте `ui-kit/styles`.

---

## Peer Dependencies

Установите зависимости в проекте-потребителе:

```bash
pnpm add sonner @tabler/icons-react
```

| Пакет                 | Версия  | Статус       |
| --------------------- | ------- | ------------ |
| `@tabler/icons-react` | >=3.0.0 | обязательный |
| `sonner`              | >=2.0.0 | обязательный |

Опциональные зависимости нужны только при использовании `Form` и примеров валидации:

```bash
pnpm add @hookform/resolvers react-hook-form valibot
```

| Пакет                 | Версия  | Статус       |
| --------------------- | ------- | ------------ |
| `@hookform/resolvers` | >=3.0.0 | опциональный |
| `react-hook-form`     | >=7.0.0 | опциональный |
| `valibot`             | >=1.0.0 | опциональный |

---

## Конфигурация сборки

### `vite.config.ts`

Библиотека собирается в режиме Vite Library Mode:

- **`copyPublicDir: false`** — папка `public/` не копируется в `dist/`
- **`cssCodeSplit: true`** — стили каждого компонента выносятся в отдельный файл
- **Точки входа:** `src/shared/config/index.ts` → `dist/config.js`, `src/shared/lib/index.ts` → `dist/lib.js`, `src/shared/styles/index.ts` → `dist/styles/index.js`, `src/shared/ui/addons/index.ts` → `dist/ui/addons/index.js`, `src/shared/ui/core/index.ts` → `dist/ui/core/index.js`, `src/shared/ui/addons/*/index.ts` → `dist/ui/addons/*/index.js`, `src/shared/ui/core/*/index.ts` → `dist/ui/core/*/index.js`
- **Формат:** `es` (ES Modules)
- **`rolldownOptions`** — актуальный API Vite 8 (вместо устаревшего `rollupOptions`)
- **`external`** — все пакеты из `dependencies` и `peerDependencies` автоматически исключаются из бандла
- **`preserveModules: true`** — каждый компонент становится отдельным модулем в `dist/`, бандлер потребителя включает только используемые
- **`sourcemap: true`** — source maps генерируются для удобства отладки
- **`unplugin-dts`** — генерирует декларации только по структуре `src/shared`, включая `dist/ui/addons/index.d.ts`, `dist/ui/addons/*/index.d.ts`, `dist/ui/core/index.d.ts` и `dist/ui/core/*/index.d.ts`; Storybook-only код из `*.stories.tsx` и `src/widgets` в декларации пакета не входит

---

## Подключение библиотеки

После сборки (`pnpm build`) библиотека готова к подключению. В `package.json` настроены все необходимые поля:

```json
{
  "exports": {
    "./config": {
      "import": "./dist/config.js",
      "types": "./dist/config/index.d.ts"
    },
    "./lib": {
      "import": "./dist/lib.js",
      "types": "./dist/lib/index.d.ts"
    },
    "./styles": "./dist/styles/index.css",
    "./addons": {
      "import": "./dist/ui/addons/index.js",
      "types": "./dist/ui/addons/index.d.ts"
    },
    "./addons/*": {
      "import": "./dist/ui/addons/*/index.js",
      "types": "./dist/ui/addons/*/index.d.ts"
    },
    "./core": {
      "import": "./dist/ui/core/index.js",
      "types": "./dist/ui/core/index.d.ts"
    },
    "./core/*": {
      "import": "./dist/ui/core/*/index.js",
      "types": "./dist/ui/core/*/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": ["**/*.css"]
}
```

- **`exports`** — основной способ разрешения для современных сборщиков; точки входа: конфигурация, утилиты, стили, addons, отдельные addons по пути, core-компоненты, отдельные core-компоненты по пути
- **`files`** — в npm-пакет включается только папка `dist/`
- **`sideEffects: ["**/\*.css"]`\*\* — CSS-файлы помечены как side effects, чтобы сборщик не исключил их при tree-shaking
