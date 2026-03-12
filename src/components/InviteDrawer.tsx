/* PLACEHOLDER */
import Drawer from './Drawer'

interface InviteDrawerProps {
  open: boolean
  onClose: () => void
}

export default function InviteDrawer({ open, onClose }: InviteDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Invite Producer"
      footer={
        <div className="placeholder-component">
          <span className="text-xs text-muted">Send Invite / Cancel buttons render here</span>
        </div>
      }
    >
      <div className="placeholder-component">
        <span className="label-uppercase text-muted">InviteDrawer</span>
        <p className="text-xs text-secondary">
          Producer invite form. NPN lookup, name pre-fill, resident state, LOA selection, and
          Policy Set assignment. Supports single and bulk invite flows.
        </p>
      </div>
    </Drawer>
  )
}
