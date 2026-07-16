import { useCallback, useEffect, useId, useRef } from 'react'

import { IconFolderSearch, IconSearch } from '@tabler/icons-react'
import { Command as CommandPrimitive, useCommandState } from 'cmdk'

import { classNames } from '~/shared/lib'

import { buttonVariants } from '../../button'
import { commandFilter } from '../lib/commandFilter'
import type {
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
} from '../model/command.props'

export function Command({ ...props }: CommandProps) {
  return <CommandPrimitive filter={commandFilter} {...props} />
}

export function CommandEmpty({ className, description, title, ...props }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      className={classNames(
        'flex flex-col items-center gap-4 text-center',
        '[&_svg]:pointer-events-none [&_svg]:size-24 [&_svg]:shrink-0 [&_svg]:text-secondary-foreground',
        className,
      )}
      {...props}
    >
      <IconFolderSearch />
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-secondary-foreground">{description}</div>
      </div>
    </CommandPrimitive.Empty>
  )
}

export function CommandGroup({ ...props }: CommandGroupProps) {
  return <CommandPrimitive.Group {...props} />
}

export function CommandInput({ autoComplete = 'off', className, id, variant = 'large', ...props }: CommandInputProps) {
  const generatedId = useId()

  const inputId = id ?? generatedId

  return (
    <div className="relative">
      <span
        className={classNames(
          'absolute top-1/2 -translate-y-1/2',
          '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-secondary-foreground',
          variant === 'large' ? 'left-4' : 'left-3 [&_svg]:size-4',
        )}
        id={`${inputId}-prefix`}
      >
        <IconSearch />
      </span>
      <CommandPrimitive.Input
        aria-describedby={`${inputId}-prefix`}
        autoComplete={autoComplete}
        className={classNames(
          'inline-flex w-full bg-muted caret-constructive transition',
          'placeholder:text-muted-foreground',
          'disabled:pointer-events-none disabled:opacity-40 aria-invalid:bg-destructive aria-invalid:text-destructive-foreground aria-invalid:caret-destructive-foreground aria-invalid:ring-destructive-foreground/40',
          variant === 'large'
            ? 'h-14.5 rounded-[1.125rem] py-3.5 pr-4 pl-13 text-lg font-medium'
            : 'h-10 rounded-xl py-3 pr-3 pl-9 text-sm',
          className,
        )}
        id={inputId}
        {...props}
      />
    </div>
  )
}

export function CommandItem({ className, size, variant, ...props }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      className={classNames(
        buttonVariants({
          className: classNames(
            'w-full justify-start whitespace-normal',
            'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
            'has-[button]:cursor-default has-[button]:rounded-none has-[button]:data-[selected=true]:bg-transparent has-[button]:data-[selected=true]:text-primary',
          ),
          size,
          variant,
        }),
        className,
      )}
      {...props}
    />
  )
}

export function CommandList({ className, ref, ...props }: CommandListProps) {
  const listRef = useRef<HTMLDivElement | null>(null)

  const search = useCommandState((state) => state.search)

  const setListRef = useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node

      if (typeof ref === 'function') {
        ref(node)

        return
      }

      if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 })
  }, [search])

  return (
    <CommandPrimitive.List
      {...props}
      className={classNames('overflow-x-hidden overflow-y-auto', className)}
      ref={setListRef}
    />
  )
}

export function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return <CommandPrimitive.Separator className={classNames('mx-4 h-px border-t', className)} {...props} />
}
