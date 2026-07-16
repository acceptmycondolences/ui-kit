/// <reference types="vitest/config" />

import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'

// import { analyzer } from 'vite-bundle-analyzer'

const isStorybookProcess = process.argv.some((argument) => argument.includes('storybook'))

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

function getDirectoryEntries(source: string, output: string) {
  return Object.fromEntries(
    readdirSync(path.resolve(dirname, source), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => [`${output}/${entry.name}/index`, path.resolve(dirname, `${source}/${entry.name}/index.ts`)]),
  )
}

const addonEntries = getDirectoryEntries('src/shared/ui/addons', 'ui/addons')
const coreEntries = getDirectoryEntries('src/shared/ui/core', 'ui/core')

interface Manifest {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

const pkg = JSON.parse(readFileSync(path.resolve(dirname, 'package.json'), 'utf-8')) as Manifest

const externalPkgs = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})]

function external(id: string) {
  return externalPkgs.some((externalPkg) => externalPkg === id || id.startsWith(`${externalPkg}/`))
}

// https://vite.dev/config
export default defineConfig(({ command, mode }) => {
  const shouldBuildTypes =
    command === 'build' && mode !== 'test' && !process.env.STORYBOOK && !process.env.VITEST && !isStorybookProcess

  return {
    build: {
      copyPublicDir: false,
      cssCodeSplit: true,
      lib: {
        entry: {
          config: path.resolve(dirname, 'src/shared/config/index.ts'),
          lib: path.resolve(dirname, 'src/shared/lib/index.ts'),
          'styles/index': path.resolve(dirname, 'src/shared/styles/index.ts'),
          'ui/addons/index': path.resolve(dirname, 'src/shared/ui/addons/index.ts'),
          'ui/core/index': path.resolve(dirname, 'src/shared/ui/core/index.ts'),
          ...addonEntries,
          ...coreEntries,
        },
        formats: ['es'],
      },
      rolldownOptions: {
        external,
        output: {
          assetFileNames: '[name][extname]',
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: path.resolve(dirname, 'src/shared'),
        },
      },
      sourcemap: true,
    },
    plugins: [
      // analyzer(),
      react(),
      tailwindcss(),
      ...(shouldBuildTypes
        ? [
            dts({
              entryRoot: path.resolve(dirname, 'src/shared'),
              exclude: ['**/*.stories.tsx'],
              include: ['src/shared/**/*'],
              tsconfigPath: './tsconfig.app.json',
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
        '~': path.resolve(dirname, './src'),
      },
    },
    // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            browser: {
              enabled: true,
              headless: true,
              instances: [
                {
                  browser: 'chromium',
                },
              ],
              provider: playwright({}),
            },
            name: 'storybook',
          },
        },
      ],
    },
  }
})
