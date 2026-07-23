import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import type { GlobalsUpdatedPayload } from 'storybook/internal/types'
import { addons } from 'storybook/manager-api'

import { getTheme, lightTheme } from './themes'

addons.setConfig({
  theme: lightTheme,
})

addons.register('synchronous-theme', () => {
  const channel = addons.getChannel()

  channel.on(GLOBALS_UPDATED, ({ globals }: GlobalsUpdatedPayload) => {
    addons.setConfig({
      theme: getTheme(globals.theme),
    })
  })
})
