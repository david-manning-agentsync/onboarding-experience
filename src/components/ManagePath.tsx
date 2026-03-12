/* PLACEHOLDER */
interface ManagePathProps {
  steps: string[]
  currentStep: number
}

export default function ManagePath({ steps, currentStep }: ManagePathProps) {
  return (
    <div className="placeholder-component placeholder-component--manage">
      <span className="label-uppercase text-muted">ManagePath</span>
      <p className="text-xs text-secondary">
        Salesforce Lightning Path component showing producer onboarding stage progression.
        Step {currentStep + 1} of {steps.length}: {steps[currentStep] ?? '—'}
      </p>
    </div>
  )
}
