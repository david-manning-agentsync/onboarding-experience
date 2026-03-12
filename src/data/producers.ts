// PLACEHOLDER — all mock data lives here. Never inline mock data in components.

export type ProducerStatus = 'Invited' | 'In Progress' | 'Waiting/Blocked' | 'Completed' | 'Terminated'

export type ProducerReadiness =
  | 'Ineligible'
  | 'Needs License'
  | 'Needs LOAs'
  | 'Needs Regulatory Follow-ups'
  | 'Needs Partner Setup'
  | 'Needs Internal Setup'
  | 'Ready'

export type ProducerClassification = 'Individual' | 'Firm'

export interface Producer {
  id: string
  name: string
  /** National Producer Number */
  npn: string
  email: string
  /** Resident state abbreviation */
  resident: string
  status: ProducerStatus
  readiness: ProducerReadiness
  classification: ProducerClassification
  policySetId: string
  invitedAt: string
  taskIds: string[]
}

export const producers: Producer[] = [
  {
    id: 'prod-001',
    name: 'Jordan Smith',
    npn: '12345678',
    email: 'jordan.smith@example.com',
    resident: 'CO',
    status: 'In Progress',
    readiness: 'Needs LOAs',
    classification: 'Individual',
    policySetId: 'ps-001',
    invitedAt: '2026-02-15',
    taskIds: ['task-001', 'task-002', 'task-003'],
  },
  {
    id: 'prod-002',
    name: 'Maria Garcia',
    npn: '23456789',
    email: 'maria.garcia@example.com',
    resident: 'TX',
    status: 'Waiting/Blocked',
    readiness: 'Needs Regulatory Follow-ups',
    classification: 'Individual',
    policySetId: 'ps-001',
    invitedAt: '2026-02-10',
    taskIds: ['task-004', 'task-005'],
  },
  {
    id: 'prod-003',
    name: 'Derek Okonkwo',
    npn: '34567890',
    email: 'derek.okonkwo@example.com',
    resident: 'FL',
    status: 'In Progress',
    readiness: 'Needs Internal Setup',
    classification: 'Individual',
    policySetId: 'ps-002',
    invitedAt: '2026-02-20',
    taskIds: ['task-006'],
  },
  {
    id: 'prod-004',
    name: 'Sun Li',
    npn: '45678901',
    email: 'sun.li@example.com',
    resident: 'CA',
    status: 'Completed',
    readiness: 'Ready',
    classification: 'Individual',
    policySetId: 'ps-001',
    invitedAt: '2026-01-28',
    taskIds: [],
  },
  {
    id: 'prod-005',
    name: 'Pinnacle Financial Partners',
    npn: '56789012',
    email: 'onboarding@pinnaclefp.com',
    resident: 'GA',
    status: 'Invited',
    readiness: 'Needs License',
    classification: 'Firm',
    policySetId: 'ps-003',
    invitedAt: '2026-03-01',
    taskIds: ['task-007', 'task-008'],
  },
]
