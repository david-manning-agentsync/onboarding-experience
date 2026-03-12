# CLAUDE.md — Onboarding Experience Prototype

## What This Is
A **plain HTML + CSS + vanilla JS** clickthrough prototype for AgentSync's Onboarding product experience. This is a **styling and UX prototype** — no framework, no backend, no real auth, all data is hardcoded in HTML. The goal is to communicate product vision, demonstrate the end-to-end demo flow, and align stakeholders across personas.

**Audience:** Customer demos, internal alignment, and design handoff.

**Previous stack:** This project was previously scaffolded as React + TypeScript + Vite. That has been intentionally removed. Do not re-introduce React, TypeScript, JSX, or any component framework. Do not suggest migrating back to React. The current architecture is the correct architecture for this phase.

**Deployed at:** https://david-manning-agentsync.github.io/onboarding-experience/

---

## Product Context
AgentSync is a producer lifecycle management platform in the insurance industry. This prototype covers two product surfaces:

- **Onboarding** — AgentSync's native product. The process of getting licensed insurance producers credentialed, compliant, and ready to sell on behalf of an agency or carrier.
- **Manage** — AgentSync's Salesforce-embedded product. The same producer lifecycle managed through a Salesforce Lightning (SLDS-inspired) interface for carriers and large distributors who live in Salesforce.

Both surfaces are in this prototype. Design and interaction patterns differ meaningfully between the two — Onboarding is clean and modern (Manrope, rounded, airy); Manage is SLDS-inspired (tighter, more bordered, Salesforce conventions).

### Product Design Principles
1. **Automation over manual process.** Focus on doing more automatically, not by hand.
2. **Aggregate views over individual records.** See the system, not just single items.
3. **Enterprise by design.** Flexible platform, opinionated products.
4. **API-first mindset.** Design at the API level.
5. **Make compliance easy.** Clear calls to action, natural language, minimal surface area.
6. **Maximize value, minimize time.** Less time in the system is a win.
7. **Outcomes over features.** Customers pay for results, not clicks.

### Domain Language
| Term | Meaning |
|------|---------|
| **Producer** | A licensed insurance agent or broker being onboarded |
| **NPN** | National Producer Number — unique ID assigned by NIPR |
| **Resident State** | The state where a producer holds their primary license |
| **LOA** | Line of Authority — a specific insurance line a producer is licensed to sell |
| **E&O** | Errors & Omissions insurance — professional liability coverage |
| **Appointment** | A carrier's formal authorization for a producer to sell their products |
| **GWBR** | Gateway Business Rule — AgentSync's regulatory rule engine |
| **Policy Set** | A configurable container of regulatory + organizational requirements |
| **Producer Readiness** | The highest-priority unresolved gate to a producer being sell-ready |
| **Operating Manager (OM)** | The internal user shepherding producers through onboarding |
| **Sell-Ready** | A producer who has met all requirements to actively sell |

---

## Tech Stack
- **Plain HTML** — one file per screen, no templating engine
- **Plain CSS** — token files + component files, no preprocessor
- **Vanilla JavaScript** — simple show/hide routing, no framework
- **Vite** — dev server and build only (serves static files)
- **No React, No TypeScript, No JSX** — do not introduce these
- **No routing library** — navigation is a custom show/hide pattern (see Routing below)
- **Font:** Manrope Variable (`@fontsource-variable/manrope`) for Onboarding theme — already installed

---

## Project Structure

```
src/
  screens/
    manage/
      m-accounts.html
      m-new-account.html
      m-account-record.html
      m-invite.html
      m-policysets.html
      m-policysets-new.html
    onboarding/
      ob-csv-import.html
    operating-manager/
      om-email.html
      om-login.html
      om-transition.html
      om-welcome.html
      om-producers.html
      om-producer-record.html
      om-task-detail.html
      om-invite-producer.html
      om-tasks.html
    producer/
      p-email.html
      p-login.html
      p-transition.html
      p-intake.html
      p-welcome.html
      p-tasks.html
      p-task-detail-1.html
      p-task-detail-2.html
      p-task-detail-3.html
      p-done.html
  js/
    router.js       ← all navigation logic — DO NOT MODIFY
    demo-nav.js     ← demo nav bar logic — DO NOT MODIFY
  styles/
    tokens-manage.css          ← DO NOT MODIFY
    tokens-onboarding.css      ← DO NOT MODIFY
    components-manage.css      ← DO NOT MODIFY
    components-onboarding.css  ← DO NOT MODIFY
    base.css                   ← DO NOT MODIFY
  index.html        ← shell: loads nav, imports styles, mounts screens
```

---

## Routing System — Read This Carefully

**The routing pattern is intentionally simple. Do not replace it with anything more complex.**

One screen is visible at a time. Screens are shown and hidden by toggling an `.active` class. All navigation is handled by two functions in `src/js/router.js`:

```js
// Show a screen by its ID
function go(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

// Switch between demo flows (also updates persona label and nav state)
function goFlow(flow) {
  // 'manage' | 'om' | 'producer'
}
```

**Rules:**
- Every screen element has class `screen` and a unique `id`
- Only the screen with class `screen active` is visible (`display: block`)
- All other screens have `display: none`
- Buttons and links call `go('screen-id')` directly via `onclick`
- Do not use hash routing, History API, query params, or any other navigation pattern
- Do not introduce a router library

---

## Theme System

Two CSS themes. Each screen uses exactly one theme — they never mix (except `ob-csv-import.html` which switches from Manage chrome to Onboarding styling inside a Manage shell).

| Theme | Screens | Body class |
|-------|---------|------------|
| `theme-manage` | All `manage/` screens | `class="theme-manage"` on `<body>` |
| `theme-onboarding` | All `operating-manager/` and `producer/` screens | `class="theme-onboarding"` on `<body>` |

The active theme class is set by `goFlow()` in `router.js` when switching between flows.

### CSS Files — Import Order in index.html
```html
<link rel="stylesheet" href="/src/styles/tokens-onboarding.css">
<link rel="stylesheet" href="/src/styles/tokens-manage.css">
<link rel="stylesheet" href="/src/styles/components-onboarding.css">
<link rel="stylesheet" href="/src/styles/components-manage.css">
<link rel="stylesheet" href="/src/styles/base.css">
```

### Styling Rules
- **Never hardcode colors, font sizes, spacing, or border radii.** Always use CSS custom properties from the token files (e.g. `var(--color-primary-600)`, `var(--space-4)`).
- **Never use inline styles for themeable values.** Inline styles are only acceptable for dynamic values (e.g. progress bar fill percentage: `style="width: 50%"`).
- **Never modify the token files or component files.** Add new styles only in screen-level `<style>` blocks or a `src/styles/screens.css` file.
- **Use existing component class names** from `components-manage.css` and `components-onboarding.css` before writing new CSS. Check those files first.
- **Theme-agnostic class names.** A class like `.btn--primary` renders correctly in both themes because token values differ — don't create theme-prefixed classes like `.manage-btn`.

---

## Demo Nav Bar

Fixed at top of every screen. `z-index: var(--z-toast)`. Neutral dark background — intentionally outside both product themes.

Contains:
- App wordmark: "AgentSync Demo"
- Active persona badge (color-coded pill): updates when flow changes
- Three flow buttons: "Manage Flow" / "Operating Manager Flow" / "Producer Flow"
- Spring/Fall toggle — Spring is active, Fall is visually disabled (grayed out, not clickable)

Height: ~44px. All screen content must be offset by this height (use `padding-top` or `margin-top` on the screen container).

The nav is rendered once in `index.html` and managed by `src/js/demo-nav.js`. Do not duplicate it in screen files.

---

## Personas

| Persona | Flow | Theme | Access |
|---------|------|-------|--------|
| Manage User | Manage Flow | theme-manage | Account management, Policy Sets, invite flow |
| Operating Manager | OM Flow | theme-onboarding | Producer table, task table, invite producers |
| Producer | Producer Flow | theme-onboarding | Own task checklist only, no sidebar |

Persona is displayed in the demo nav badge. It updates automatically when `goFlow()` is called.

---

## Screen Flows

### Manage Flow
```
m-accounts → m-new-account → m-account-record → m-invite → m-account-record (toast)
m-accounts → m-account-record (existing)
m-accounts (tab) → m-policysets → ob-csv-import → m-policysets-new → m-accounts
```

### Operating Manager Flow
```
om-email → om-login → om-transition → om-welcome
om-welcome → om-producers → om-producer-record → om-task-detail → om-producer-record
om-producers → om-invite-producer → om-producers (toast)
om-welcome → om-tasks (inline drawer, no page nav for task detail)
om-tasks → om-producer-record (via producer name link)
```

### Producer Flow
```
p-email → p-login → p-transition → p-intake → p-welcome → p-tasks
p-tasks → p-task-detail-1 → p-tasks
p-tasks → p-task-detail-2 → p-tasks
p-tasks → p-task-detail-3 → (mark done) → p-done
p-done → p-tasks (view completed)
```

---

## Toast Notifications

Rendered once in `index.html`. Triggered by `showToast('message')` from `router.js`.

- Fixed bottom-right position
- `z-index: var(--z-toast)`
- Uses Onboarding success colors when Onboarding theme is active; Manage success colors when Manage theme is active
- Auto-dismisses after 3.5 seconds
- Fires on: invite sent, account saved, task marked done, policy set created

---

## Design Patterns

### Tables
- Sticky header where content scrolls
- Uppercase column headers with `--tracking-caps` (Manage) or `--tracking-wide` (Onboarding)
- Hover row highlight using theme hover token
- Clickable rows/names get `cursor: pointer`
- Empty state: centered text + CTA — never a blank white box

### Badges / Status Pills
| Status | Manage | Onboarding |
|--------|--------|------------|
| Active / Complete | `--color-success-base` bg, white text | `--color-success-100` bg, `--color-success-600` text |
| In Progress / Warning | `--color-warning-base` bg, white text | `--color-warning-100` bg, `--color-warning-600` text |
| Error / Danger | `--color-danger-base` bg, white text | `--color-danger-100` bg, `--color-danger-600` text |
| Neutral / Gray | `--color-gray-400` bg, white text | `--color-gray-100` bg, `--color-gray-500` text |
| Brand / Info | `--color-brand-500` bg, white text | `--color-primary-100` bg, `--color-primary-600` text |

### Buttons
**Manage:** Primary = `--color-brand-500` bg, `--radius-sm` (2px), `--input-height` (32px). Secondary = white bg, `--color-border-default` border.

**Onboarding:** Primary = `--color-primary-600` bg, `--radius-md` (8px), 40px height. Secondary = white bg, `--color-border-strong` border. Success action (Mark Done) = `--color-success-600` bg.

### Drawers / Inline Panels
- Task Table uses inline row expansion (no page navigation) — clicking a row reveals a drawer below it
- Producer record uses horizontal tabs (Tasks / Details) — tab switching shows/hides panels in place
- No slide-out drawers in this prototype

---

## What Not To Do
- Do not introduce React, TypeScript, JSX, or any JS framework
- Do not replace the `go()` / `goFlow()` routing with hash routing, History API, or a router library
- Do not modify any file in `src/styles/`
- Do not hardcode hex values — always use CSS custom properties
- Do not add fetch calls, API calls, or async patterns
- Do not create new drawer or routing patterns — use what exists
- Do not duplicate the demo nav bar inside screen files

---

## Placeholders Are Valid
Not everything needs to be pixel-perfect. A clearly labeled placeholder communicates intent. Prefer a well-labeled placeholder over a broken or half-built component.

---

## Working With Claude Effectively

### Session Lifecycle
1. **Start** — paste `CLAUDE.md` + one sentence on where we left off
2. **Build** — Claude writes or rewrites files; apply locally and test
3. **Fix** — describe errors in the same session
4. **Deploy** — push to git once working
5. **End** — start fresh for the next unit of work

**Start a new session when:**
- Work is tested and looks right locally
- You're shifting to a different screen or flow area
- Responses start feeling off — wrong patterns, ignoring constraints
- You hit a context limit warning

**Mid-session safeguard:**
> Monitor context usage. When you estimate we're at ~75% of the context window, warn me before responding so we can wrap up cleanly.

> ⚠️ If a session crashes, start fresh. Paste CLAUDE.md and a note on what was last confirmed working.

> ⚠️ If patch updates produce cascading errors, skip further patches and ask for a full file rewrite instead.

### Applying Code
- **Full file rewrite** — open file, `Cmd+A`, paste, save
- **Terminal commands** — paste directly into VS Code terminal
- **If something breaks** — paste the full error and which file you just changed

---

## Deployment
```bash
npm run build     # build to dist/
npm run deploy    # push dist/ to gh-pages
git add .
git commit -m "feat: ..."
git push          # push source to main
```

Always run both — `npm run deploy` updates the live site; `git push` updates the source.

---

## Current State

| Area | State |
|------|-------|
| Project scaffold | ✅ Vite, GitHub repo, Pages live |
| Manrope font | ✅ Installed |
| tokens-onboarding.css | ✅ Complete |
| tokens-manage.css | ✅ Complete |
| components-onboarding.css | ✅ Complete |
| components-manage.css | ✅ Complete |
| base.css | ✅ Complete |
| ThemeProvider (React) | 🗑️ Removed — replaced by body class pattern |
| All React/TS components | 🗑️ Removed — replaced by plain HTML screens |
| Routing (router.js) | ✅ Scaffolded — go(), goFlow(), showToast() |
| Demo nav (demo-nav.js) | ✅ Scaffolded |
| index.html shell | ✅ Complete — loads all screens via fetch() |
| Manage screens (6) | ✅ Scaffolded with content and styling |
| Onboarding CSV import (1) | ✅ Scaffolded |
| Operating Manager screens (9) | ✅ Scaffolded with content and styling |
| Producer screens (10) | ✅ Scaffolded with content and styling |