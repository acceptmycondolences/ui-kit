import type { ComponentProps } from 'react'

import type { Tabs as TabsPrimitive } from 'radix-ui'

export type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>

export type TabsListProps = ComponentProps<typeof TabsPrimitive.List>

export type TabsProps = Omit<ComponentProps<typeof TabsPrimitive.Root>, 'activationMode' | 'orientation'>

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger>
