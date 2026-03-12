/* PLACEHOLDER */
import Drawer from './Drawer'

interface ManageTaskDrawerProps {
  open: boolean
  onClose: () => void
  taskId?: string
}

export default function ManageTaskDrawer({ open, onClose, taskId }: ManageTaskDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Task Detail (Manage)">
      <div className="placeholder-component">
        <span className="label-uppercase text-muted">ManageTaskDrawer</span>
        <p className="text-xs text-secondary">
          SLDS-styled task detail drawer for the Manage (Salesforce) surface. Same information
          as TaskDrawer but rendered with Salesforce Lightning design conventions. Task ID: {taskId ?? '—'}
        </p>
      </div>
    </Drawer>
  )
}
