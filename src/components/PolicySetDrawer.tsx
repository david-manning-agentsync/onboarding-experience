/* PLACEHOLDER */
import Drawer from './Drawer'

interface PolicySetDrawerProps {
  open: boolean
  onClose: () => void
  policySetId?: string
}

export default function PolicySetDrawer({ open, onClose, policySetId }: PolicySetDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Policy Set">
      <div className="placeholder-component">
        <span className="label-uppercase text-muted">PolicySetDrawer</span>
        <p className="text-xs text-secondary">
          Policy Set detail and edit drawer. Shows name, org-wide flag, task count, description,
          and assigned producers. Policy Set ID: {policySetId ?? '—'}
        </p>
      </div>
    </Drawer>
  )
}
