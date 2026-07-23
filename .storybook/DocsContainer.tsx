import type { PropsWithChildren } from 'react'

import {
  DocsContainer as BaseDocsContainer,
  type DocsContainerProps as BaseDocsContainerProps,
} from '@storybook/addon-docs/blocks'
import type { Renderer } from 'storybook/internal/csf'
import { StoryStore } from 'storybook/internal/preview-api'

import { getTheme } from './themes'

interface DocsContainerProps extends BaseDocsContainerProps {
  context: BaseDocsContainerProps['context'] & {
    store: StoryStore<Renderer>
  }
}

export const DocsContainer = ({ children, context }: PropsWithChildren<DocsContainerProps>) => {
  const theme = getTheme(context.store.userGlobals.globals.theme)

  return (
    <BaseDocsContainer context={context} theme={theme}>
      {children}
    </BaseDocsContainer>
  )
}
