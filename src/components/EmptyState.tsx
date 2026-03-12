/* PLACEHOLDER */
interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-state__title font-semibold">{title}</p>
      {description && <p className="empty-state__desc text-secondary text-sm">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  )
}
