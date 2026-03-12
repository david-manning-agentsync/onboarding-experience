# CLAUDE.md — Onboarding Experience Prototype

## What This Is
A **React + TypeScript + Vite** prototype for AgentSync's Onboarding product experience. This is a **design and product prototype** — no backend, no real auth, all data is mocked. The goal is to communicate product vision, test UX patterns, and align stakeholders across personas and feature maturity levels.

**Audience:** Customer demos, internal alignment, and engineering handoff. Code should be written cleanly enough that an engineer can read it and understand the intent — use clear variable names, logical component boundaries, and avoid prototype-only hacks that would confuse a handoff reader.

**Deployed at:** https://david-manning-agentsync.github.io/onboarding-experience/

---

## Product Context
AgentSync is a producer lifecycle management platform in the insurance industry. This prototype covers two product surfaces:

- **Onboarding** — AgentSync's native product. The process of getting licensed insurance producers credentialed, compliant, and ready to sell on behalf of an agency or carrier.
- **Manage** — AgentSync's Salesforce-embedded product. The same producer lifecycle managed through a Salesforce Lightning (SLDS-inspired) interface for carriers and large distributors who live in Salesforce.

Both surfaces are in this prototype. A theme toggle switches between them. Design and interaction patterns differ meaningfully between the two — Onboarding is clean and modern (Manrope, rounded, airy); Manage is SLDS-inspired (tighter, more bordered, Salesforce conventions).

### Product Design Principles
Every design decision should reflect these principles:
1. **Automation over manual process.** Focus on doing more automatically, not by hand.
2. **Aggregate views over individual records.** See the system, not just single items.
3. **Enterprise by design.** A flexible platform allows products to be opinionated and configurable without compromise.
4. **API-first mindset.** Design at the API level; great APIs unlock revenue and guide product direction.
5. **Make compliance easy.** Clear calls to action, natural language, minimal surface area.
6. **Maximize value, minimize time.** Deliver results quickly; less time in the system is a win.
7. **Outcomes over features.** Customers pay for results, not for clicks or bells and whistles.

### Domain Language
Use real insurance industry terminology throughout — in mock data, UI labels, and placeholder copy.

| Term | Meaning |
|------|---------|
| **Producer** | A licensed insurance agent or broker being onboarded |
| **NPN** | National Producer Number — unique ID assigned by NIPR to every licensed producer |
| **Resident State** | The state where a producer holds their primary license |
| **LOA** | Line of Authority — a specific insurance line a producer is licensed to sell (Life, Health, P&C, etc.) |
| **E&O** | Errors & Omissions insurance — professional liability coverage required of producers |
| **Appointment** | A carrier's formal authorization for a producer to sell their products |
| **GWBR** | Gateway Business Rule — AgentSync's regulatory rule engine that determines compliance requirements by state/line |
| **Policy Set** | A configurable container of regulatory + organizational requirements applied to producers |
| **Producer Readiness** | The highest-priority unresolved gate to a producer being sell-ready |
| **Operating Manager (OM)** | The internal user shepherding producers through onboarding |
| **Sell-Ready** | A producer who has met all licensing, LOA, and organizational requirements to actively sell |

---

## Project Goals
Operating Managers need to answer three questions fast:
1. What types of producers are we onboarding?
2. How are producers progressing?
3. What does the workload look like, and how can I help move things forward?

Every design decision should serve those questions. Favor **action-oriented, scannable UI** over decoration. Dashboards and tables are the primary surfaces — every chart should offer a one-click path to a filtered table where the user can act.

---

## Tech Stack
- **React 18 + TypeScript** (`.tsx` throughout)
- **Vite** (dev server, build)
- **No component library** — all UI uses our hand-rolled CSS theme system
- **No backend** — all data lives in `src/data.tsx`
- **No routing library** — view switching is handled via state in `App.tsx`
- **Font:** Manrope Variable (`@fontsource-variable/manrope`) for Onboarding theme

---

## Theme System

This prototype has two visual themes that can be toggled at runtime. The active theme is set by adding a class to `<body>`:

| Class | Theme | Surface |
|-------|-------|---------|
| `theme-onboarding` | HorizonTrust / AgentSync native | Onboarding product |
| `theme-manage` | SLDS-inspired / Salesforce Lightning | Manage / Salesforce product |

### Files
| File | Role |
|------|------|
| `src/styles/tokens-onboarding.css` | CSS custom properties for Onboarding theme (colors, type, spacing, radius, shadows) |
| `src/styles/tokens-manage.css` | CSS custom properties for Manage / SLDS theme |
| `src/styles/components-onboarding.css` | Base component styles for Onboarding theme |
| `src/styles/components-manage.css` | Base component styles for Manage / SLDS theme |
| `src/styles/base.css` | Shared resets and layout primitives (not theme-specific) |
| `src/theme/ThemeProvider.tsx` | React context + toggle. Wraps `<App>`. Exposes `useTheme()` hook. |

### Rules
- **Never hardcode colors, font sizes, spacing, or border radii in component files.** Always use CSS custom properties from the token files (e.g. `var(--color-primary-600)`, `var(--space-4)`).
- **Never use inline styles for themeable values.** Inline styles are acceptable only for dynamic values (e.g. computed widths, progress bar fill percentage).
- **Component class names should be theme-agnostic.** The same `.btn--primary` class renders differently under each theme because the token values differ.
- **The toggle lives in `ProtoPanel.tsx`** and switches the class on `<body>`.

### ThemeProvider Pattern
```tsx
// src/theme/ThemeProvider.tsx
const ThemeContext = createContext<{ theme: 'onboarding' | 'manage', toggle: () => void }>()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'onboarding' | 'manage'>('onboarding')
  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])
  return <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'onboarding' ? 'manage' : 'onboarding') }}>
    {children}
  </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
```

---

## File Map

### `src/`
| File | Role |
|------|------|
| `App.tsx` | Root. Owns `persona`, `version`, and active view state. Routes to views. |
| `data.tsx` | **All mock data.** Types, seed data, and helpers. Never inline mock data in components. |
| `main.tsx` | Vite entry point. Imports all CSS theme files. |

### `src/styles/`
All CSS lives here. See Theme System above. Import order in `main.tsx`:
1. `tokens-onboarding.css`
2. `tokens-manage.css`
3. `components-onboarding.css`
4. `components-manage.css`
5. `base.css`

### `src/theme/`
| File | Role |
|------|------|
| `ThemeProvider.tsx` | Theme context, toggle logic, body class switching |

### `src/components/`
| File | Role |
|------|------|
| `ProtoPanel.tsx` | Prototype control bar — persona, version, and theme switcher |
| `Sidebar.tsx` | Left nav (Onboarding surface) |
| `Table.tsx` | `Table` (primitive) and `TableView` (full-page surface with toolbar, search, filters) |
| `Drawer.tsx` | Base drawer — always use this, never create new drawer patterns |
| `TaskDrawer.tsx` | Producer task detail — built on `Drawer.tsx` |
| `SearchBar.tsx` | Shared search input |
| `UI.tsx` | Shared micro-components (buttons, inputs, badges) |

### `src/views/`
| File | Role |
|------|------|
| `Dashboard.tsx` | OM overview — charts + quick actions |
| `Producers.tsx` | Producer table — sortable, filterable, searchable |
| `Tasks.tsx` | Cross-producer task table |

---

## Design Patterns

### Tables
- **`TableView`** is the standard full-page table surface. Use it for any view with a title, toolbar, search, and filters.
- **`Table`** is for embedded/nested use only.
- Column definitions are named constants at the top of the view file — never inline in JSX.

### Drawers
- Always use `Drawer.tsx` as the base. Never create new drawer or slide-out patterns.
- Always use the `footer` prop for action buttons — never render buttons inside the scrollable body.

### Tabs
- Define a local `ViewTabs` component in the view file.
- Tabs sit below the page title, above the toolbar.

### Badges / Status
- Define all status badges in `UI.tsx`. Never define badge colors inline in a component.
- Use real domain status values: `Invited` | `In Progress` | `Waiting/Blocked` | `Completed` | `Terminated`

### State
- No global state library. Cross-view concerns (persona, version, theme, active view) live in `App.tsx`.
- Local state stays in the component.

### No backend
- Never introduce fetch calls, APIs, or async data patterns. Static prototype only.

---

## Personas & Version Toggling

Controlled by `ProtoPanel.tsx`. State lives in `App.tsx`.

### Personas
| ID | Name | Role | What they see |
|----|------|------|---------------|
| `manager` | Sarah Chen | Operating Manager | Dashboard, producer table, task table, task actions. Default. |
| `sysadmin` | Alex Morgan | System Admin | Everything Sarah sees + policy set config, invite management |
| `producer` | Jordan Smith | Producer | Their own task checklist only |

### Versions
| ID | Label | Color | Intent |
|----|-------|-------|--------|
| `mvp` | MVP | green | Core onboarding primitives |
| `post-mvp` | Post | indigo | Enhanced workflows, richer OM tooling |
| `ai` | AI | purple | AI-assisted features: task generation, readiness reasoning, suggestions |

**Versions are additive.** Use `personaId` and `version` props to gate features. Keep conditional logic close to where the UI diverges.

---

## Placeholders Are Valid
Not everything needs to be fully built. Placeholders are a legitimate prototype tool — use them intentionally. A placeholder should communicate *what will be here* clearly enough that a customer in a demo doesn't feel like they're looking at an unfinished product.

---

## Data Model (Mock)

All types and seed data in `src/data.tsx`. Never inline mock data in components.

### Key Types
- **`Producer`** — `id`, `name`, `npn`, `classification` (readiness), `status`, `resident` (state), `tasks[]`
- **`Task`** — `id`, `name`, `type` (Regulatory | Org), `status`, `owner`, `required`, `detail`
- **`PolicySet`** — `id`, `name`, `orgWide`, `tasks` count, `desc`

### Producer Readiness (precedence order)
`Ineligible` → `Needs License` → `Needs LOAs` → `Needs Regulatory Follow-ups` → `Needs Partner Setup` → `Needs Internal Setup` → `Ready`

---

## Working With Claude Effectively

### The Session Lifecycle
1. **Start** — paste `CLAUDE.md` + a one-sentence "where we left off" note
2. **Build** — Claude writes or rewrites code; apply locally and test
3. **Fix** — describe errors in the same session
4. **Deploy** — push to git once working locally
5. **End** — start fresh for the next unit of work

**Start a new session when:**
- Code is tested and deployed ✓
- You're shifting to a meaningfully different feature or file
- Responses start feeling off — wrong patterns, ignoring constraints
- You hit a context limit warning

**Mid-session safeguard** (always active):
> Monitor context usage throughout this session. When you estimate we're at roughly 75% of the context window, proactively warn me before responding so we have a few prompts to wrap up cleanly and deploy before starting a new session.

> ⚠️ **If a session crashes**, start fresh immediately. Paste `CLAUDE.md` and a brief note on what was last deployed.

> ⚠️ **If patch updates produce cascading errors**, skip further patches and ask for a full file rewrite instead.

### Applying Code
- **Full file rewrite** — open file, `Cmd+A`, paste, save.
- **Terminal commands** — paste directly into VS Code terminal.
- **If something breaks** — paste the full error and which file you just changed.

### How to Ask for Good Results
- **Be specific about persona and version.** "Add a readiness filter to the producer table, visible to `manager` in all versions."
- **Reference file names.** "Update `TaskDrawer.tsx`" not "update the task drawer."
- **Describe the goal.** "An OM needs to reject a task and leave a note" beats "add a reject button."
- **For theme-specific work**, say which surface: "This is for the Manage/SLDS theme" or "This is Onboarding only."
- **Paste shared component files upfront** when your work touches them.

### End-of-Session Checklist
Before closing, ask: **"What should I do before ending this session?"**
- ✅ What was built and what files changed
- 🧪 Things to test locally before deploying
- 🚀 Git commit message to use
- 📋 Suggested next tasks
- 📎 Anything extra to carry into next session

---

## Deployment
```bash
npm run deploy    # builds and pushes to gh-pages branch
git add .
git commit -m "feat: ..."
git push          # pushes source to main
```

Always run both — `npm run deploy` updates the live site; `git push` updates the source.

---

## Current State

| Area | State |
|------|-------|
| Project scaffold | ✅ Vite + React + TS, GitHub repo, Pages live |
| Manrope font | ✅ Installed (`@fontsource-variable/manrope`) |
| tokens-onboarding.css | ✅ Written — not yet wired |
| tokens-manage.css | ✅ Written — not yet wired |
| components-onboarding.css | ✅ Written — not yet wired |
| components-manage.css | ✅ Written — not yet wired |
| ThemeProvider | ⬜ Not yet built |
| Theme toggle in ProtoPanel | ⬜ Not yet built |
| main.tsx CSS imports | ⬜ Not yet wired |
| ProtoPanel | ⬜ Not yet built |
| Sidebar | ⬜ Not yet built |
| Dashboard | ⬜ Not yet built |
| Producer table | ⬜ Not yet built |
| Task table | ⬜ Not yet built |
| Drawers | ⬜ Not yet built |
| Mock data | ⬜ Not yet built |