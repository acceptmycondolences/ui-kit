# Настройка линтеров и форматтеров

Руководство описывает настройку инструментов качества кода: ESLint, Prettier, EditorConfig, Husky и lint-staged.

---

## ESLint

ESLint — статический анализатор кода. Находит и предотвращает ошибки, обеспечивает единообразие стиля в команде.

### Конфигурация (`eslint.config.js`)

```js
import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import eslintConfigPrettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),
  perfectionist.configs['recommended-natural'],
  ...pluginQuery.configs['flat/recommended'],
  ...pluginRouter.configs['flat/recommended'],
  {
    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked, reactHooks.configs.flat.recommended, reactRefresh.configs.vite, reactX.configs['recommended-typescript'], reactDom.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
    },
  },
  eslintConfigPrettier,
])
```

### Используемые плагины

| Плагин                           | Репозиторий                                                                                                                        | Описание                                                                                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `eslint-plugin-perfectionist`    | [perfectionist.dev](https://perfectionist.dev)                                                                                     | Сортирует элементы кода: объекты, типы, JSX-пропсы, именованные импорты. Пресет `recommended-natural` использует естественный алфавитный порядок |
| `@tanstack/eslint-plugin-query`  | [tanstack.com/query/latest/docs/eslint/eslint-plugin-query](https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query)     | Правила для TanStack Query: предотвращает некорректное использование хуков, предупреждает об устаревших паттернах                                |
| `@tanstack/eslint-plugin-router` | [tanstack.com/router/latest/docs/eslint/eslint-plugin-router](https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router) | Правила для TanStack Router: корректное использование типизированных маршрутов и навигации                                                       |

### Описание полей

| Поле                                           | Описание                                                                                                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `globalIgnores(...)`                           | Исключает директории и файлы из анализа. `dist` — артефакты сборки                                                                                         |
| `perfectionist.configs['recommended-natural']` | Подключает Perfectionist с пресетом `natural` — сортирует объекты, типы, JSX-пропсы и другие элементы кода в естественном алфавитном порядке               |
| `pluginQuery.configs['flat/recommended']`      | Правила для корректного использования TanStack Query                                                                                                       |
| `pluginRouter.configs['flat/recommended']`     | Правила для корректного использования TanStack Router                                                                                                      |
| `js.configs.recommended`                       | Базовый набор правил для JavaScript от команды ESLint                                                                                                      |
| `tseslint.configs.strictTypeChecked`           | Строгие правила TypeScript с использованием информации о типах. Требует подключения `parserOptions.project`                                                |
| `tseslint.configs.stylisticTypeChecked`        | Стилистические правила TypeScript: предпочтение `interface` над `type`, согласованное приведение типов и др.                                               |
| `reactHooks.configs.flat.recommended`          | Правила для корректного использования React Hooks: порядок вызовов, зависимости в `useEffect` и др.                                                        |
| `reactRefresh.configs.vite`                    | Проверяет экспорты компонентов для корректной работы Fast Refresh в Vite                                                                                   |
| `reactX.configs['recommended-typescript']`     | Современные правила для React с поддержкой TypeScript: замена устаревшего `eslint-plugin-react`                                                            |
| `reactDom.configs.recommended`                 | Правила специфичные для React DOM: корректное использование DOM-атрибутов и событий                                                                        |
| `files`                                        | Применяет правила только к файлам `.ts` и `.tsx`                                                                                                           |
| `ecmaVersion: 2020`                            | Разрешает синтаксис ES2020: `BigInt`, `Promise.allSettled`, `globalThis` и др.                                                                             |
| `globals.browser`                              | Добавляет глобальные переменные браузера (`window`, `document`, `fetch` и др.)                                                                             |
| `parserOptions.project`                        | Пути к `tsconfig`-файлам для анализа типов. Необходим для правил `strictTypeChecked`                                                                       |
| `tsconfigRootDir`                              | Корневая директория для разрешения путей к `tsconfig`. Использует `import.meta.dirname` для надежности                                                     |
| `'perfectionist/sort-imports': 'off'`          | Отключает сортировку импортов от Perfectionist — этим занимается Prettier через `@ianvs/prettier-plugin-sort-imports`. Дублирование привело бы к конфликту |
| `'perfectionist/sort-named-imports': 'off'`    | По той же причине — порядок именованных импортов управляется Prettier                                                                                      |
| `eslintConfigPrettier`                         | Отключает все ESLint-правила, которые могут конфликтовать с форматированием Prettier. **Должен быть последним в массиве**                                  |

> **Почему сортировка импортов отдана Prettier, а не Perfectionist**
>
> Проект использует архитектуру [Feature-Sliced Design (FSD)](https://feature-sliced.design). Порядок импортов в FSD семантически значим: слои импортируются строго сверху вниз (`app → pages → widgets → features → entities → shared`). Prettier через `@ianvs/prettier-plugin-sort-imports` позволяет задать этот порядок декларативно через `importOrder`. Perfectionist же сортирует импорты только алфавитно, не учитывая архитектурные границы.

---

## Prettier + EditorConfig

### Prettier

Prettier — форматтер кода. В отличие от ESLint, не анализирует логику — только приводит код к единому стилю.

#### Конфигурация (`prettier.config.js`)

```js
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  endOfLine: 'auto',
  importOrder: ['^(react(/.*)?)$', '^(react-dom(/.*)?)$', '', '<THIRD_PARTY_MODULES>', '', '^~/app/(.*)$', '', '^~/pages/(.*)$', '', '^~/widgets/(.*)$', '', '^~/features/(.*)$', '', '^~/entities/(.*)$', '', '^~/shared/(.*)$', '', '^[.]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: Infinity,
      },
    },
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tailwindAttributes: [...],
  tailwindFunctions: [...],
  tailwindStylesheet: '...',
}
```

#### Описание полей

| Поле                       | Значение | Описание                                                                                                                                                                                                                                                                 |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `endOfLine`                | `'auto'` | Сохраняет символ конца строки, уже присутствующий в файле. EditorConfig гарантирует `lf`                                                                                                                                                                                 |
| `importOrder`              | `[...]`  | Декларативный порядок групп импортов. Пустая строка `''` создает визуальный разделитель между группами. Порядок соответствует слоям FSD: `react → сторонние → app → pages → widgets → features → entities → shared → локальные`                                          |
| `importOrderParserPlugins` | `[...]`  | Парсер-плагины для Babel, которые `@ianvs/prettier-plugin-sort-imports` использует при разборе файлов. `typescript` и `jsx` — для `.ts`/`.tsx`, `decorators-legacy` — для поддержки декораторов                                                                          |
| `overrides`                | `[...]`  | Переопределяет настройки для конкретных типов файлов. Для `*.md` устанавливает `printWidth: Infinity` — Prettier не будет переносить строки в Markdown                                                                                                                   |
| `plugins`                  | `[...]`  | Подключает плагины: [`@ianvs/prettier-plugin-sort-imports`](https://github.com/IanVS/prettier-plugin-sort-imports) для сортировки импортов, [`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) для сортировки Tailwind-классов |
| `printWidth`               | `120`    | Максимальная длина строки. Prettier переносит код, если строка длиннее. Синхронизировано с EditorConfig                                                                                                                                                                  |
| `semi`                     | `false`  | Убирает точку с запятой в конце выражений                                                                                                                                                                                                                                |
| `singleQuote`              | `true`   | Использует одинарные кавычки вместо двойных                                                                                                                                                                                                                              |

#### Игнорирование сгенерированных файлов (`.prettierignore`)

Если проект использует `@tanstack/react-router` с генерацией route tree, добавьте сгенерированный файл в `.prettierignore`:

```gitignore
src/app/router/generatedRouteTree.ts
```

`generatedRouteTree.ts` создается генератором TanStack Router и содержит служебные типы и структуру маршрутов. Его не редактируют вручную и не форматируют через Prettier, чтобы избежать лишних изменений в диффах. Исходные route-файлы остаются обычным кодом проекта и должны форматироваться как обычно.

#### Tailwind-специфичные поля

Эти три поля относятся к плагину `prettier-plugin-tailwindcss`. Плагин автоматически сортирует Tailwind CSS классы в соответствии с официальным порядком. **Значения зависят от проекта** — укажите только те атрибуты и функции, которые реально используются.

| Поле                 | Описание                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tailwindAttributes` | Список JSX-атрибутов (помимо стандартного `className`), в которых плагин будет сортировать Tailwind-классы. Например, `toastOptions`, `classNames`, `containerClassName`  |
| `tailwindFunctions`  | Список функций, в аргументах которых плагин будет сортировать Tailwind-классы. Например, `classNames`, `cva`, `cn` — популярные утилиты для условного объединения классов |
| `tailwindStylesheet` | Путь к основному CSS-файлу проекта с `@tailwind` директивами. Позволяет плагину учитывать кастомные утилиты и темы, определенные в проекте                                |

> Если проект не использует вспомогательные функции для классов или нестандартные атрибуты, эти поля можно опустить — плагин будет сортировать только стандартный атрибут `className`.

---

### EditorConfig

EditorConfig — универсальный стандарт настройки редактора. Работает на уровне IDE и обеспечивает базовое единообразие форматирования **до** того, как код попадет в Prettier. Поддерживается большинством редакторов нативно (VS Code, JetBrains, Vim и др.) без установки плагинов.

#### Конфигурация (`.editorconfig`)

```editorconfig
# https://editorconfig.org
root = true

[*]
charset = utf-8
max_line_length = 120
indent_size = 2
indent_style = space
end_of_line = lf
insert_final_newline = true

[*.md]
max_line_length = 0

[COMMIT_EDITMSG]
max_line_length = 0
```

#### Описание полей

| Поле                                   | Значение | Описание                                                                                                     |
| -------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `root = true`                          | —        | Указывает, что это корневой `.editorconfig`. Редактор прекратит поиск конфигурации выше по дереву директорий |
| `charset`                              | `utf-8`  | Кодировка файлов                                                                                             |
| `max_line_length`                      | `120`    | Максимальная длина строки. Используется редактором для отображения направляющей линии                        |
| `indent_size`                          | `2`      | Размер отступа в пробелах                                                                                    |
| `indent_style`                         | `space`  | Тип отступа: пробелы вместо табуляции                                                                        |
| `end_of_line`                          | `lf`     | Символ конца строки: Unix-стиль (`LF`). Предотвращает смешивание `CRLF`/`LF` в git-репозитории               |
| `insert_final_newline`                 | `true`   | Добавляет пустую строку в конец файла. Требование POSIX и хорошая практика для git diff                      |
| `[*.md] max_line_length = 0`           | `0`      | Отключает ограничение длины строки для Markdown — длинные строки в `.md` нормальны                           |
| `[COMMIT_EDITMSG] max_line_length = 0` | `0`      | То же для сообщений коммитов                                                                                 |

#### Синхронизация с Prettier

Значения Prettier и EditorConfig намеренно согласованы:

| Настройка    | Prettier                     | EditorConfig                              |
| ------------ | ---------------------------- | ----------------------------------------- |
| Конец строки | `endOfLine: 'auto'`          | `end_of_line = lf`                        |
| Длина строки | `printWidth: 120`            | `max_line_length = 120`                   |
| Отступ       | `tabWidth: 2` (по умолчанию) | `indent_size = 2`, `indent_style = space` |

> `endOfLine: 'auto'` в Prettier означает, что он следует символу конца строки, уже присутствующему в файле. Поскольку EditorConfig гарантирует `lf`, Prettier сохраняет его.

---

## Husky + lint-staged

### Husky

[Husky](https://typicode.github.io/husky) — инструмент для управления Git-хуками. Позволяет запускать скрипты в ответ на Git-события: перед коммитом, перед пушем и др.

Хук `pre-commit` запускается автоматически при каждом `git commit` **до** того, как коммит будет создан. Если хук завершается с ошибкой — коммит отменяется.

```sh
# .husky/pre-commit
npx lint-staged
```

### lint-staged

[lint-staged](https://github.com/lint-staged/lint-staged) запускает инструменты только на **файлах, добавленных в git staging area** (`git add`). Это критически важно для производительности — вместо проверки всего проекта обрабатываются только измененные файлы.

```js
// lint-staged.config.js
/** @type {import('lint-staged').Configuration} */
export default {
  '*': ['prettier --ignore-unknown --write --cache', 'eslint'],
}
```

Паттерн `'*'` означает, что для **любого** измененного файла последовательно выполнятся:

1. `prettier --ignore-unknown --write --cache` — форматирует файл. `--ignore-unknown` пропускает типы файлов, которые Prettier не умеет форматировать. `--cache` ускоряет повторные запуски
2. `eslint` — проверяет файл на ошибки

> **Почему нет `eslint --fix`**
>
> `eslint` запускается без флага `--fix` намеренно. Автоматическое исправление скрывает проблему от разработчика — код фиксируется молча, без понимания причины. Разработчик должен самостоятельно разобраться в ошибке и исправить ее осознанно. Это повышает качество кода и понимание инструментов.

---

## Scripts

Единый набор скриптов должен присутствовать в каждом проекте. Это обеспечивает предсказуемый DX и упрощает работу в монорепозитории.

```json
{
  "scripts": {
    "format": "prettier --ignore-unknown --write . --cache",
    "fix": "eslint . --fix",
    "lint": "eslint .",
    "check": "tsc -b",
    "validate": "pnpm format && pnpm fix && pnpm lint && pnpm check",
    "prepare": "husky"
  }
}
```

| Скрипт     | Команда                                              | Описание                                                                                                                                                                                     |
| ---------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`   | `prettier --ignore-unknown --write . --cache`        | Форматирует все файлы проекта. `--ignore-unknown` — пропускает неподдерживаемые типы. `--cache` — повторно не обрабатывает неизмененные файлы                                                |
| `fix`      | `eslint . --fix`                                     | Запускает ESLint с автоисправлением. Устраняет только те нарушения, которые ESLint может исправить безопасно                                                                                 |
| `lint`     | `eslint .`                                           | Проверяет весь проект на ESLint-ошибки без внесения изменений. Используется в CI                                                                                                             |
| `check`    | `tsc -b`                                             | Проверяет типы TypeScript без генерации файлов. `-b` — режим project references, собирает все `tsconfig`-файлы проекта                                                                       |
| `validate` | `pnpm format && pnpm fix && pnpm lint && pnpm check` | Полная проверка проекта: форматирование → автоисправление ESLint → проверка ESLint → проверка типов. Запускается перед созданием PR или релизом                                              |
| `prepare`  | `husky`                                              | Инициализирует Husky при установке зависимостей (`pnpm install`). npm/pnpm автоматически вызывает `prepare` после установки — это гарантирует, что Git-хуки настроены у каждого разработчика |
