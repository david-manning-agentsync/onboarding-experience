/* PLACEHOLDER */
import Drawer from './Drawer'

interface ColumnDrawerProps {
  open: boolean
  onClose: () => void
}

export default function ColumnDrawer({ open, onClose }: ColumnDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Manage Columns">
      <div className="placeholder-component">
        <span className="label-uppercase text-muted">ColumnDrawer</span>
        <p className="text-xs text-secondary">
          Column visibility and ordering panel for table views. Users can show/hide columns
          and drag to reorder. Changes persist per-persona in prototype state.
        </p>
      </div>
    </Drawer>
  )
}
