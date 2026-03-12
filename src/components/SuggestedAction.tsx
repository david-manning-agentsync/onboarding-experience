/* PLACEHOLDER */
interface SuggestedActionProps {
  headline: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function SuggestedAction({ headline, description, actionLabel = 'Take Action', onAction }: SuggestedActionProps) {
  return (
    <div className="placeholder-component">
      <span className="label-uppercase text-muted">SuggestedAction (AI)</span>
      <p className="font-semibold text-sm">{headline}</p>
      {description && <p className="text-xs text-secondary">{description}</p>}
      <button className="btn btn--secondary btn--sm" onClick={onAction}>{actionLabel}</button>
    </div>
  )
}
