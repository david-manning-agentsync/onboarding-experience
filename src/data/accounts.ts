// PLACEHOLDER — Salesforce Account mock data for the Manage (SLDS) surface.
// Never inline mock data in components.

export type AccountType = 'Carrier' | 'Distributor' | 'Agency'

export interface Account {
  id: string
  name: string
  type: AccountType
  state: string
  producerCount: number
  policySetId: string
}

export const accounts: Account[] = [
  {
    id: 'acct-001',
    name: 'HorizonTrust Life & Annuity',
    type: 'Carrier',
    state: 'CO',
    producerCount: 142,
    policySetId: 'ps-001',
  },
  {
    id: 'acct-002',
    name: 'Pinnacle Financial Partners',
    type: 'Distributor',
    state: 'GA',
    producerCount: 38,
    policySetId: 'ps-003',
  },
  {
    id: 'acct-003',
    name: 'Apex Insurance Group',
    type: 'Agency',
    state: 'TX',
    producerCount: 21,
    policySetId: 'ps-001',
  },
]
