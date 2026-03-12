// PLACEHOLDER — Salesforce Contact mock data for the Manage (SLDS) surface.
// Contacts represent producers in the Salesforce data model.
// Never inline mock data in components.

export interface Contact {
  id: string
  accountId: string
  name: string
  email: string
  /** National Producer Number */
  npn: string
  title: string
  phone?: string
}

export const contacts: Contact[] = [
  {
    id: 'contact-001',
    accountId: 'acct-001',
    name: 'Jordan Smith',
    email: 'jordan.smith@example.com',
    npn: '12345678',
    title: 'Licensed Producer',
    phone: '720-555-0101',
  },
  {
    id: 'contact-002',
    accountId: 'acct-002',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    npn: '23456789',
    title: 'Senior Agent',
    phone: '512-555-0202',
  },
  {
    id: 'contact-003',
    accountId: 'acct-003',
    name: 'Derek Okonkwo',
    email: 'derek.okonkwo@example.com',
    npn: '34567890',
    title: 'Independent Agent',
  },
]
