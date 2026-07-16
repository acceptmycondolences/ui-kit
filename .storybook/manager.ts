import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import type { GlobalsUpdatedPayload } from 'storybook/internal/types'
import { addons } from 'storybook/manager-api'
import { themes } from 'storybook/theming'

addons.setConfig({
  theme: themes.light,
})

addons.register('synchronous-theme', () => {
  const channel = addons.getChannel()

  channel.on(GLOBALS_UPDATED, ({ globals }: GlobalsUpdatedPayload) => {
    const isDark = globals.theme === 'dark'

    addons.setConfig({
      theme: isDark ? themes.dark : themes.light,
    })
  })
})
