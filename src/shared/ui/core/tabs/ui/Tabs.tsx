import { Tabs as TabsPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

import { buttonVariants } from '../../button'
import type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from '../model/tabs.props'

export function Tabs({ className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root activationMode="manual" className={classNames('flex flex-col gap-6', className)} {...props} />
  )
}

export function TabsContent({ className, ...props }: TabsContentProps) {
  return <TabsPrimitive.Content className={classNames('flex-1', className)} tabIndex={-1} {...props} />
}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={classNames(
        'flex h-9.5 items-center justify-center rounded-[0.875rem] border bg-background p-px',
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={classNames(
        buttonVariants({
          className: classNames(
            'h-8.5 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground',
            'hover:text-primary',
            'data-[state=active]:bg-constructive data-[state=active]:text-constructive-foreground data-[state=active]:hover:bg-constructive-active data-[state=active]:hover:text-constructive-foreground-active',
          ),
        }),
        className,
      )}
      {...props}
    />
  )
}
