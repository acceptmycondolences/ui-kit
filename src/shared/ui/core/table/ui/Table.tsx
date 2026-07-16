import { classNames } from '~/shared/lib'

import type {
  TableBodyProps,
  TableCellProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from '../model/table.props'

export function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div className={classNames('relative overflow-x-auto', containerClassName)}>
      <table className={classNames('w-full border-separate border-spacing-y-2', className)} {...props} />
    </div>
  )
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      className={classNames(
        '[&_tr]:after:absolute [&_tr]:after:bottom-0 [&_tr]:after:left-0 [&_tr]:after:h-px [&_tr]:after:w-full [&_tr]:after:translate-y-1 [&_tr]:after:border-b [&_tr]:after:border-b-border',
        className,
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={classNames(
        'p-3 align-middle text-sm whitespace-nowrap text-secondary-foreground',
        'first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl last:rounded-br-xl',
        className,
      )}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={classNames(
        'px-3 py-2 text-left align-middle text-sm font-medium whitespace-nowrap',
        'first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg',
        className,
      )}
      {...props}
    />
  )
}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={classNames('sticky top-0 left-0 z-50 bg-secondary text-secondary-foreground', className)}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }: TableRowProps) {
  return <tr className={classNames('relative transition-colors', 'hover:bg-secondary', className)} {...props} />
}
