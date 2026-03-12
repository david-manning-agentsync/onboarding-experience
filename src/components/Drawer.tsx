/* PLACEHOLDER */
import type { ReactNode } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children?: ReactNode
  footer?: ReactNode
}

export default function Drawer({ open, title, children, footer }: DrawerProps) {
  if (!open) return null

  return (
    <div className="placeholder-component">
      <span className="label-uppercase text-muted">Drawer — {title}</span>
      <p className="text-xs text-secondary">
        Base drawer shell. Always use this — never create new drawer or slide-out patterns.
        Footer prop renders action buttons below the scrollable body.
      </p>
      <div className="placeholder-component__body">{children}</div>
      {footer && <div className="placeholder-component__footer">{footer}</div>}
    </div>
  )
}
