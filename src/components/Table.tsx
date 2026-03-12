/* PLACEHOLDER */
import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  label: string
  render?: (row: T) => ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  rows: T[]
}

export function Table<T extends { id: string }>({ columns, rows }: TableProps<T>) {
  return (
    <div className="placeholder-component">
      <span className="label-uppercase text-muted">Table (primitive)</span>
      <p className="text-xs text-secondary">
        {rows.length} rows · {columns.length} columns — embedded/nested use only.
      </p>
    </div>
  )
}

interface TableViewProps {
  title: string
  children?: ReactNode
}

export function TableView({ title, children }: TableViewProps) {
  return (
    <div className="placeholder-view">
      <div className="placeholder-view__badge label-uppercase">Table View</div>
      <h1 className="placeholder-view__title text-2xl font-bold">{title}</h1>
      <p className="placeholder-view__desc text-secondary">
        Full-page table surface with title, toolbar, search, filters, and action buttons.
      </p>
      {children}
    </div>
  )
}
