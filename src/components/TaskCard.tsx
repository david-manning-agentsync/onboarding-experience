/* PLACEHOLDER */
interface TaskCardProps {
  taskId?: string
  taskName?: string
}

export default function TaskCard({ taskId, taskName = 'Task' }: TaskCardProps) {
  return (
    <div className="placeholder-component">
      <span className="label-uppercase text-muted">TaskCard — {taskName}</span>
      <p className="text-xs text-secondary">
        Compact card representation of a single task. Used in producer checklist and summary
        surfaces. Shows status dot, name, type badge, and owner. ID: {taskId ?? '—'}
      </p>
    </div>
  )
}
