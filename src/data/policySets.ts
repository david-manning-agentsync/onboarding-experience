// PLACEHOLDER — all mock data lives here. Never inline mock data in components.

export interface PolicySet {
  id: string
  name: string
  /** true = applies to all producers org-wide by default */
  orgWide: boolean
  taskCount: number
  description: string
}

export const policySets: PolicySet[] = [
  {
    id: 'ps-001',
    name: 'Standard Individual Producer',
    orgWide: true,
    taskCount: 6,
    description:
      'Baseline requirements for individual producers: license verification, LOA confirmation, E&O upload, background disclosure, agency agreement, and GWBR review.',
  },
  {
    id: 'ps-002',
    name: 'Referral Partner (Limited)',
    orgWide: false,
    taskCount: 3,
    description:
      'Streamlined set for referral-only partners who do not hold a resident license. Covers NPN lookup, E&O, and agency agreement only.',
  },
  {
    id: 'ps-003',
    name: 'Agency / Firm',
    orgWide: false,
    taskCount: 8,
    description:
      'Extended requirements for firm-level onboarding including firm E&O, principal officer license verification, and entity NPN validation.',
  },
]
