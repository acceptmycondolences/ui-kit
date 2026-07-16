import './preview.css'

import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import type { GlobalsUpdatedPayload } from 'storybook/internal/types'
import { addons } from 'storybook/preview-api'

import { DocsContainer } from './DocsContainer'

function syncPreviewThemeClass(theme: unknown) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

const channel = addons.getChannel()

function handleGlobalsUpdated({ globals }: GlobalsUpdatedPayload) {
  syncPreviewThemeClass(globals.theme)
}

channel.on(GLOBALS_UPDATED, handleGlobalsUpdated)

import.meta.hot?.dispose(() => {
  channel.off(GLOBALS_UPDATED, handleGlobalsUpdated)
})

const preview: Preview = {
  decorators: [
    (Story, { globals }) => {
      syncPreviewThemeClass(globals.theme)

      return Story()
    },
    withThemeByClassName({
      defaultTheme: 'light',
      themes: {
        dark: 'dark',
        light: '',
      },
    }),
  ],
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: DocsContainer,
    },
    layout: 'centered',
  },
}

export default preview
