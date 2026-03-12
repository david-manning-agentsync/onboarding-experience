// PLACEHOLDER — Demo flow definitions for the DemoFlow view.
// Each flow stitches together a sequence of views and talking points for stakeholder demos.
// Never inline mock data in components.

export type PersonaId = 'manager' | 'sysadmin' | 'producer'
export type VersionId = 'mvp' | 'post-mvp' | 'ai'

export interface DemoStep {
  id: string
  view: string
  title: string
  talkingPoint: string
}

export interface DemoFlow {
  id: string
  name: string
  persona: PersonaId
  version: VersionId
  description: string
  steps: DemoStep[]
}

export const demoFlows: DemoFlow[] = [
  {
    id: 'flow-001',
    name: 'OM Daily Workflow (MVP)',
    persona: 'manager',
    version: 'mvp',
    description:
      'Walk through how an Operating Manager uses the dashboard and producer table to prioritize their day.',
    steps: [
      {
        id: 'step-001',
        view: 'Dashboard',
        title: 'Pipeline at a glance',
        talkingPoint:
          'Sarah opens AgentSync and immediately sees how many producers are in each readiness stage — no hunting for reports.',
      },
      {
        id: 'step-002',
        view: 'ProducerTable',
        title: 'Find blocked producers',
        talkingPoint:
          'One click on the "Waiting/Blocked" segment takes her to a filtered producer table. She can see exactly who needs help.',
      },
      {
        id: 'step-003',
        view: 'TaskTable',
        title: 'Act on the backlog',
        talkingPoint:
          'The task table shows every open task across all producers. Sarah can sort by overdue date and reassign or complete tasks in bulk.',
      },
    ],
  },
  {
    id: 'flow-002',
    name: 'Producer Self-Service (MVP)',
    persona: 'producer',
    version: 'mvp',
    description: "Walk through the producer's own onboarding checklist experience.",
    steps: [
      {
        id: 'step-004',
        view: 'ProducerDataConfirm',
        title: 'Confirm your data',
        talkingPoint:
          'Jordan receives an invite email, clicks the link, and lands on a simple data confirmation screen pre-filled from NIPR.',
      },
      {
        id: 'step-005',
        view: 'ProducerChecklist',
        title: 'Your checklist',
        talkingPoint:
          "A clear, prioritized checklist tells Jordan exactly what to do next. No confusion about what's required.",
      },
    ],
  },
]
