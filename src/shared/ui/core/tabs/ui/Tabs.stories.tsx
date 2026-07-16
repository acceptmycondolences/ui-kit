import type { Meta, StoryObj } from '@storybook/react-vite'

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
    interactions: {
      disable: true,
    },
  },
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
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
