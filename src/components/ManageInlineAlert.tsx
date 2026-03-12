/* PLACEHOLDER */
type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface ManageInlineAlertProps {
  variant: AlertVariant
  title: string
  body?: string
}

export default function ManageInlineAlert({ variant, title, body }: ManageInlineAlertProps) {
  return (
    <div className={`placeholder-component placeholder-component--manage alert alert--${variant}`}>
      <span className="label-uppercase text-muted">ManageInlineAlert — {variant}</span>
      <p className="font-semibold text-sm">{title}</p>
      {body && <p className="text-xs text-secondary">{body}</p>}
    </div>
  )
}
