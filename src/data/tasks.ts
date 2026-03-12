// PLACEHOLDER — all mock data lives here. Never inline mock data in components.

export type TaskType = 'Regulatory' | 'Org'
export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Blocked' | 'Waived'
export type TaskOwner = 'Producer' | 'OM' | 'System'

export interface Task {
  id: string
  producerId: string
  name: string
  type: TaskType
  status: TaskStatus
  owner: TaskOwner
  required: boolean
  /** Plain-language instructions shown to the task owner */
  detail: string
  /** Optional OM note */
  note?: string
}

export const tasks: Task[] = [
  {
    id: 'task-001',
    producerId: 'prod-001',
    name: 'Confirm Resident State & LOAs',
    type: 'Regulatory',
    status: 'In Progress',
    owner: 'Producer',
    required: true,
    detail: 'Review your NIPR license data and confirm your resident state and lines of authority.',
  },
  {
    id: 'task-002',
    producerId: 'prod-001',
    name: 'Submit E&O Certificate',
    type: 'Org',
    status: 'Not Started',
    owner: 'Producer',
    required: true,
    detail: 'Upload your current Errors & Omissions insurance certificate. Coverage must be active.',
  },
  {
    id: 'task-003',
    producerId: 'prod-001',
    name: 'Complete Background Disclosure',
    type: 'Regulatory',
    status: 'Not Started',
    owner: 'Producer',
    required: true,
    detail: 'Answer the background disclosure questions as required by your resident state.',
  },
  {
    id: 'task-004',
    producerId: 'prod-002',
    name: 'Resolve NIPR License Discrepancy',
    type: 'Regulatory',
    status: 'Blocked',
    owner: 'OM',
    required: true,
    detail: 'NIPR returned a mismatch on the resident state. Review and correct before proceeding.',
    note: 'Reached out to producer on 2026-02-12. Awaiting response.',
  },
  {
    id: 'task-005',
    producerId: 'prod-002',
    name: 'Sign Agency Agreement',
    type: 'Org',
    status: 'Not Started',
    owner: 'Producer',
    required: true,
    detail: 'Review and sign the standard agency agreement via DocuSign link.',
  },
  {
    id: 'task-006',
    producerId: 'prod-003',
    name: 'Set Up CRM Access',
    type: 'Org',
    status: 'In Progress',
    owner: 'OM',
    required: false,
    detail: 'Provision Salesforce access for the producer and assign the correct permission set.',
  },
  {
    id: 'task-007',
    producerId: 'prod-005',
    name: 'Verify Firm E&O',
    type: 'Regulatory',
    status: 'Not Started',
    owner: 'Producer',
    required: true,
    detail: 'Upload the firm-level E&O certificate. Must cover all individual producers named on policy.',
  },
  {
    id: 'task-008',
    producerId: 'prod-005',
    name: 'Complete GWBR Review',
    type: 'Regulatory',
    status: 'Not Started',
    owner: 'System',
    required: true,
    detail: 'AgentSync will automatically run the GWBR rule engine once licensing data is confirmed.',
  },
]
