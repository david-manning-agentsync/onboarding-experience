import { createContext, useContext, useState } from 'react'
import type { PersonaId, VersionId } from './data'

// Views
import LaunchPage from './views/LaunchPage'
import DemoFlow from './views/DemoFlow'
import Dashboard from './views/Dashboard'
import ProducerTable from './views/ProducerTable'
import TaskTable from './views/TaskTable'
import ProducerDetail from './views/ProducerDetail'
import ProducerChecklist from './views/ProducerChecklist'
import ProducerInvite from './views/ProducerInvite'
import ProducerDataConfirm from './views/ProducerDataConfirm'
import PolicySetManagement from './views/PolicySetManagement'
import UserManagement from './views/UserManagement'
import FirmOnboarding from './views/FirmOnboarding'
import ReOnboarding from './views/ReOnboarding'
import ManageDashboard from './views/ManageDashboard'
import ManagePermissions from './views/ManagePermissions'
import ManageAccountSetup from './views/ManageAccountSetup'
import ManageFirmInvite from './views/ManageFirmInvite'
import ManagePolicySetsTab from './views/ManagePolicySetsTab'
import ManageProducerRecord from './views/ManageProducerRecord'
import GlobeContractingTask from './views/GlobeContractingTask'
import GlobeSSO from './views/GlobeSSO'
import OnboardingEmbedded from './views/OnboardingEmbedded'

// Components
import ProtoPanel from './components/ProtoPanel'

// ---------------------------------------------------------------------------
// View registry
// ---------------------------------------------------------------------------

export type ViewId =
  | 'launch'
  | 'demo'
  | 'dashboard'
  | 'producers'
  | 'tasks'
  | 'producer-detail'
  | 'producer-checklist'
  | 'producer-invite'
  | 'producer-data-confirm'
  | 'policy-sets'
  | 'user-management'
  | 'firm-onboarding'
  | 're-onboarding'
  | 'manage-dashboard'
  | 'manage-permissions'
  | 'manage-account-setup'
  | 'manage-firm-invite'
  | 'manage-policy-sets'
  | 'manage-producer-record'
  | 'globe-contracting'
  | 'globe-sso'
  | 'onboarding-embedded'

// ---------------------------------------------------------------------------
// AppContext — cross-view state accessible to any component via useApp()
// ---------------------------------------------------------------------------

interface AppContextValue {
  persona: PersonaId
  setPersona: (p: PersonaId) => void
  version: VersionId
  setVersion: (v: VersionId) => void
  activeView: ViewId
  navigate: (view: ViewId) => void
}

const AppContext = createContext<AppContextValue>({} as AppContextValue)

export const useApp = () => useContext(AppContext)

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const [persona, setPersona] = useState<PersonaId>('manager')
  const [version, setVersion] = useState<VersionId>('mvp')
  const [activeView, setActiveView] = useState<ViewId>('launch')

  function renderView() {
    switch (activeView) {
      case 'launch':                return <LaunchPage />
      case 'demo':                  return <DemoFlow />
      case 'dashboard':             return <Dashboard />
      case 'producers':             return <ProducerTable />
      case 'tasks':                 return <TaskTable />
      case 'producer-detail':       return <ProducerDetail />
      case 'producer-checklist':    return <ProducerChecklist />
      case 'producer-invite':       return <ProducerInvite />
      case 'producer-data-confirm': return <ProducerDataConfirm />
      case 'policy-sets':           return <PolicySetManagement />
      case 'user-management':       return <UserManagement />
      case 'firm-onboarding':       return <FirmOnboarding />
      case 're-onboarding':         return <ReOnboarding />
      case 'manage-dashboard':      return <ManageDashboard />
      case 'manage-permissions':    return <ManagePermissions />
      case 'manage-account-setup':  return <ManageAccountSetup />
      case 'manage-firm-invite':    return <ManageFirmInvite />
      case 'manage-policy-sets':    return <ManagePolicySetsTab />
      case 'manage-producer-record':return <ManageProducerRecord />
      case 'globe-contracting':     return <GlobeContractingTask />
      case 'globe-sso':             return <GlobeSSO />
      case 'onboarding-embedded':   return <OnboardingEmbedded />
    }
  }

  return (
    <AppContext.Provider
      value={{ persona, setPersona, version, setVersion, activeView, navigate: setActiveView }}
    >
      <div className="app-shell">
        <ProtoPanel />
        <main className="main-content">
          {renderView()}
        </main>
      </div>
    </AppContext.Provider>
  )
}
