import type { ComponentProps } from 'react'

export type TableBodyProps = ComponentProps<'tbody'>

export type TableCellProps = ComponentProps<'td'>

export type TableHeaderProps = ComponentProps<'thead'>

export type TableHeadProps = ComponentProps<'th'>

export type TableProps = ComponentProps<'table'> & {
  containerClassName?: string
}

export type TableRowProps = ComponentProps<'tr'>
