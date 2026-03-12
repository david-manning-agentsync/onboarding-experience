/* PLACEHOLDER */
import type { ReactNode, ButtonHTMLAttributes } from 'react'

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...rest }: ButtonProps) {
  return (
    <button className={`btn btn--${variant} btn--${size} ${className}`} {...rest}>
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------
type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

interface BadgeProps {
  variant: BadgeVariant
  children: ReactNode
}

export function Badge({ variant, children }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{children}</span>
}

// ---------------------------------------------------------------------------
// StatusBadge — maps domain status strings to badge variants
// ---------------------------------------------------------------------------
type ProducerStatus = 'Invited' | 'In Progress' | 'Waiting/Blocked' | 'Completed' | 'Terminated'

const STATUS_VARIANT: Record<ProducerStatus, BadgeVariant> = {
  'Invited':          'info',
  'In Progress':      'info',
  'Waiting/Blocked':  'warning',
  'Completed':        'success',
  'Terminated':       'danger',
}

interface StatusBadgeProps {
  status: ProducerStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={STATUS_VARIANT[status] ?? 'neutral'}>{status}</Badge>
}

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, className = '', ...rest }: InputProps) {
  return (
    <div className="form-field">
      {label && <label className="form-label" htmlFor={id}>{label}</label>}
      <input id={id} className={`input ${className}`} {...rest} />
    </div>
  )
}
