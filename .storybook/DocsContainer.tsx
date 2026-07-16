import type { PropsWithChildren } from 'react'

import {
  DocsContainer as BaseDocsContainer,
  type DocsContainerProps as BaseDocsContainerProps,
} from '@storybook/addon-docs/blocks'
import type { Renderer } from 'storybook/internal/csf'
import { StoryStore } from 'storybook/internal/preview-api'
import { themes } from 'storybook/theming'

interface DocsContainerProps extends BaseDocsContainerProps {
  context: BaseDocsContainerProps['context'] & {
    store: StoryStore<Renderer>
  }
}

export const DocsContainer = ({ children, context }: PropsWithChildren<DocsContainerProps>) => {
  const theme = context.store.userGlobals.globals.theme === 'dark' ? themes.dark : themes.light

  return (
    <BaseDocsContainer context={context} theme={theme}>
      {children}
    </BaseDocsContainer>
  )
}
