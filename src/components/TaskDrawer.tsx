/* PLACEHOLDER */
import Drawer from './Drawer'

interface TaskDrawerProps {
  open: boolean
  onClose: () => void
  taskId?: string
}

export default function TaskDrawer({ open, onClose, taskId }: TaskDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Task Detail"
      footer={
        <div className="placeholder-component">
          <span className="text-xs text-muted">Action buttons render here via footer prop</span>
        </div>
      }
    >
      <div className="placeholder-component">
        <span className="label-uppercase text-muted">TaskDrawer</span>
        <p className="text-xs text-secondary">
          Producer task detail drawer. Built on Drawer.tsx. Shows task name, type (Regulatory /
          Org), status, owner, instructions, and OM notes. Task ID: {taskId ?? '—'}
        </p>
      </div>
    </Drawer>
  )
}
