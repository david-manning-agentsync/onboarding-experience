/* PLACEHOLDER */
interface ProgressBarProps {
  /** 0–100 */
  value: number
  label?: string
}

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      {label && <span className="progress-bar__label text-xs text-secondary">{label}</span>}
      <div className="progress-bar__track">
        {/* inline style is acceptable here: dynamic computed width */}
        <div className="progress-bar__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
