# Repository Instructions

This file is the repository-level `AGENTS.md` for `ui-kit`. Keep it concise and practical: add durable rules only when they prevent repeated mistakes, and move long task-specific guidance into focused markdown files such as `PLANS.md`.

## Instruction Scope

- Codex loads this file as project guidance from the repository root. More specific `AGENTS.override.md` or `AGENTS.md` files in nested directories may override these rules for local work.
- Global Codex guidance from `~/.codex/AGENTS.md` or `~/.codex/AGENTS.override.md` may be loaded before this file. Treat this file as the project-specific layer.
- If guidance appears stale or unexpected, start a new Codex run from the intended directory and check for closer instruction files.

## Project Context

- This repository is a React 19 UI component library based on Tailwind CSS and Radix UI. It is distributed as named ES exports with full TypeScript typings, bundled styles, and tree-shaking support.
- Preserve the ordering convention from this file and `README.md` when listing project concepts, dependencies, commands, source folders, public entrypoints, package exports, or build settings. Even partial lists must keep the same relative order; order is part of the project documentation convention, not incidental formatting.
- Technology stack order follows `README.md`: Node.js, pnpm, Vite, React, TypeScript, ESLint, Prettier, Husky + lint-staged, Tailwind CSS, tw-animate-css, class-variance-authority, clsx, cmdk, input-otp, Radix UI, tailwind-merge, vaul, Storybook, Vitest + Playwright, vite-bundle-analyzer (optional and disabled by default), @tailwindcss/vite, unplugin-dts.
- Use `pnpm` for package commands. The project requires Node.js `>=24.0.0` and `pnpm@11.13.1` according to `package.json`.
- Do not edit generated output in `dist` manually.
- Before inventing conventions, read the relevant project docs:
  - `README.md` for setup, commands, exports, and publishing context.
  - `INTERACTION-TESTS.md` for Storybook interaction test strategy and coverage expectations.

## Ordering Convention

- Default to alphabetical order for lists unless a more specific project order is documented.
- The technology stack is intentionally not purely alphabetical. Keep this order:
  1. Common baseline technologies used across projects: Node.js, pnpm, Vite, React, TypeScript, ESLint, Prettier, Husky + lint-staged.
  2. Project-specific package technologies from package dependency groups when they are listed in docs, preserving the canonical README/package order.
  3. Vite plugin technologies from `vite.config.ts` plugin order, excluding `react()` because React is already part of the common baseline: vite-bundle-analyzer (optional and disabled by default), @tailwindcss/vite, unplugin-dts.
- Keep partial lists in the same relative order as the full canonical list. For example, write Vite, React, TypeScript, Tailwind CSS, Radix UI, Storybook.
- In component README files, keep anatomy/composition tables in render or DOM order rather than alphabetical order.
- In component README files, keep `CSS API` token tables alphabetized by token name unless the section explicitly documents a state-flow order.

## Source Layout

- Treat `src/shared` as the main source area for library code.
- Put configuration, constants, and shared settings in `src/shared/config`.
- Put utilities, types, and hooks in `src/shared/lib`.
- Put global styles and CSS variables in `src/shared/styles`.
- Put components and related logic in `src/shared/ui`.
- Put Storybook-only widgets and documentation examples in `src/widgets`; do not expose them through package entrypoints.

## Commands

- Install dependencies: `pnpm install`.
- Format: `pnpm format`.
- Auto-fix ESLint: `pnpm fix`.
- Lint: `pnpm lint`.
- Type-check: `pnpm check`.
- Full local quality pass: `pnpm validate`.
- Build the library: `pnpm build`.
- Run Storybook tests: `pnpm test-storybook`.
- Run Storybook: `pnpm storybook`.
- Build Storybook: `pnpm build-storybook`.
- Publish Storybook to Chromatic: `pnpm chromatic`.
- Publish already built Storybook to Chromatic: `pnpm chromatic:ci`.

## Working Rules

- Keep scope tight. Do not refactor unrelated files or change public APIs unless the task requires it.
- Follow nearby Vite, React, TypeScript, Tailwind CSS, Radix UI, and Storybook patterns.
- Follow Feature-Sliced Design import direction. `shared` code must not depend on higher layers.
- Preserve the public API entrypoints described in `README.md`: config from `src/shared/config/index.ts` and `ui-kit/config`, utilities/types/hooks from `src/shared/lib/index.ts` and `ui-kit/lib`, styles from `ui-kit/styles`, addons from `src/shared/ui/addons/index.ts` and `ui-kit/addons`, addon subpaths from `ui-kit/addons/*`, core UI components from `src/shared/ui/core/index.ts` and `ui-kit/core`, and core component subpaths from `ui-kit/core/*`.
- Within `src/shared/ui/<group>/<component>`, import the component's own segments relatively. Import shared configuration through `~/shared/config`, shared utilities/types/hooks through `~/shared/lib`, and sibling core components through their nearest public API such as `../../button`. Do not import sibling components through the aggregate `~/shared/ui/addons` or `~/shared/ui/core` barrels in runtime component code; those barrels are for package entrypoints, Storybook stories, and documentation examples.
- When changing packaging or tree-shaking behavior, inspect `package.json` exports, `vite.config.ts`, and the runtime import boundaries.
- For new public components or public component behavior/prop changes, update the colocated `*.stories.tsx` and `ui/README.md`.
- Prefer named exports and preserve the library export structure defined in `package.json` and Vite config.
- Maintain type safety. Avoid `any`, unsafe casts, and runtime assumptions unless there is a clear local precedent and reason.
- Keep components accessible by default. Preserve Radix UI keyboard, focus, ARIA, and portal behavior.
- Use existing utilities for class names, variants, and Tailwind conflict resolution before adding new helpers.
- Keep styles compatible with the current Tailwind CSS setup and existing CSS variable system.
- Do not manually edit lockfiles except as a consequence of dependency-management commands.

## Public API And Packaging

- The package has public entrypoints for config, utilities/types/hooks, styles, addons, addon subpaths, core UI components, and core component subpaths.
- Vite library entries map `src/shared/config/index.ts` to `dist/config.js`, `src/shared/lib/index.ts` to `dist/lib.js`, `src/shared/styles/index.ts` to `dist/styles/index.js`, `src/shared/ui/addons/index.ts` to `dist/ui/addons/index.js`, `src/shared/ui/addons/*/index.ts` to `dist/ui/addons/*/index.js`, `src/shared/ui/core/index.ts` to `dist/ui/core/index.js`, and `src/shared/ui/core/*/index.ts` to `dist/ui/core/*/index.js`.
- `package.json` exports should stay aligned with the README examples: `./config`, `./lib`, `./styles`, `./addons`, `./addons/*`, `./core`, and `./core/*`.
- CSS files are side effects. Preserve `sideEffects: ["**/*.css"]` behavior so styles are not removed during tree-shaking.
- Keep `dist` as generated package output only. Publishable library source belongs under `src/shared`; Storybook-only widgets and documentation examples belong under `src/widgets`.

## Validation

- Run the narrowest useful checks for the change, then broaden when the blast radius is larger.
- Use `pnpm lint` and `pnpm check` for most TypeScript and component changes.
- Use `pnpm build` when exports, build configuration, package output, styles, or public API behavior may be affected.
- Use `pnpm test-storybook` when interactive component behavior or story `play` functions change.
- Use `pnpm build-storybook` when Storybook behavior, docs, or visual component surfaces change.
- Storybook interaction coverage belongs in the component story via `play` functions and `storybook/test`; prefer accessible behavior assertions over styling assertions.
- Use `pnpm validate` only when a full format, fix, lint, and type-check pass is appropriate.
- If a command cannot be run, report why and explain the remaining risk.
- When formatting or auto-fix commands modify files, review the diff before finishing.

## Done Criteria

- The requested behavior is implemented with minimal unrelated churn.
- Exports, types, styles, accessibility behavior, and Storybook coverage remain coherent for changed or new components.
- Relevant checks have been run in this session, or skipped checks are explicitly reported with the reason.
- The final diff has been reviewed for accidental public API changes, broken exports, generated-file edits, and style regressions.

## ExecPlans

When writing complex features or significant refactors, use an ExecPlan (as described in PLANS.md) from design to implementation.
