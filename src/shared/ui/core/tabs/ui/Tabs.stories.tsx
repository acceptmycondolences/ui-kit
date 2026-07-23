import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/core'

const meta = {
  component: Tabs,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstTab = canvas.getByRole('tab', { name: 'Trigger 1' })
    const secondTab = canvas.getByRole('tab', { name: 'Trigger 2' })

    await userEvent.click(secondTab)
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Content 2')

    await userEvent.click(firstTab)
    await userEvent.keyboard('{ArrowRight}')

    await expect(secondTab).toHaveFocus()
    await expect(firstTab).toHaveAttribute('aria-selected', 'true')

    await userEvent.keyboard('{Enter}')
    await expect(secondTab).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Content 2')

    await userEvent.keyboard('{ArrowLeft}')

    await expect(firstTab).toHaveFocus()
    await expect(secondTab).toHaveAttribute('aria-selected', 'true')

    await userEvent.keyboard(' ')
    await expect(firstTab).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Content 1')
  },
  render: () => (
    <Tabs defaultValue="1">
      <TabsList>
        <TabsTrigger value="1">Trigger 1</TabsTrigger>
        <TabsTrigger value="2">Trigger 2</TabsTrigger>
      </TabsList>
      <TabsContent value="1">Content 1</TabsContent>
      <TabsContent value="2">Content 2</TabsContent>
    </Tabs>
  ),
}
