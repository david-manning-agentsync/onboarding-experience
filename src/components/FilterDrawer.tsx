/* PLACEHOLDER */
import Drawer from './Drawer'

interface FilterDrawerProps {
  open: boolean
  onClose: () => void
}

export default function FilterDrawer({ open, onClose }: FilterDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Filters">
      <div className="placeholder-component">
        <span className="label-uppercase text-muted">FilterDrawer</span>
        <p className="text-xs text-secondary">
          Advanced filter panel for table views. Generates filter chips on apply. Supports
          status, readiness, resident state, LOA, Policy Set, and date range filters.
        </p>
      </div>
    </Drawer>
  )
}
