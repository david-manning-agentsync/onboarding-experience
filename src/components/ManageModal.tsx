/* PLACEHOLDER */
import type { ReactNode } from 'react'

interface ManageModalProps {
  open: boolean
  onClose: () => void
  title: string
  children?: ReactNode
  footer?: ReactNode
}

export default function ManageModal({ open, title, children, footer }: ManageModalProps) {
  if (!open) return null

  return (
    <div className="placeholder-component placeholder-component--manage">
      <span className="label-uppercase text-muted">ManageModal — {title}</span>
      <p className="text-xs text-secondary">
        SLDS-styled modal dialog for the Manage (Salesforce) surface. Used for confirmations,
        form submissions, and contextual actions that shouldn't navigate away.
      </p>
      {children}
      {footer && <div className="placeholder-component__footer">{footer}</div>}
    </div>
  )
}
