/* =============================================================
   components.js
   Render functions for shared prototype components.

   Usage:
     Each screen file has mount points:
       <div data-component="sf-chrome" data-screen="m-accounts"></div>
       <div data-component="sf-table"  data-screen="m-accounts"></div>

     After all screen HTML loads, call initScreenComponents().
     It reads SCREEN_DATA[screenKey] from screen-data.js and
     calls the appropriate render function.

   React mapping:
     renderSFChrome  → <SFNav activeTab="Accounts" />
     renderSFTable   → <SFListView config={...} />
     renderOBTopnav  → <OBTopNav />
     renderOBSidebar → <OBSidebar activeNav="Producers" />
     renderOBTable   → <OBTable columns={...} rows={...} />
   ============================================================= */

// ── Utility: extract plain text from a cell descriptor ────────
function _cellText(cell) {
  if (!cell && cell !== 0) return '';
  if (typeof cell === 'string' || typeof cell === 'number') return String(cell);
  return cell.text || '';
}

// ── SVG icon strings ──────────────────────────────────────────

const _IC = {
  search:    `<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-text-muted);flex-shrink:0"><circle cx="9" cy="9" r="6"/><path d="M14 14l4 4"/></svg>`,
  searchSm:  `<svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-text-muted)"><circle cx="9" cy="9" r="6"/><path d="M14 14l4 4"/></svg>`,
  star:      `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2l2.4 5 5.6.8-4 3.9.9 5.5L10 14.8l-4.9 2.4.9-5.5L2 7.8l5.6-.8z"/></svg>`,
  caretDown: `<svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><path d="M2 3l3 4 3-4H2z"/></svg>`,
  plus:      `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 4v12M4 10h12"/></svg>`,
  bell:      `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2a6 6 0 016 6c0 3.5 1 5 1.5 6H2.5C3 13 4 11.5 4 8a6 6 0 016-6zm0 16a2 2 0 002-2H8a2 2 0 002 2z"/></svg>`,
  help:      `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="8"/><path d="M8 8a2 2 0 114 0c0 1.5-2 2-2 3.5M10 15.5v.5"/></svg>`,
  gear:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  waffle:    `<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="8" y="1" width="5" height="5" rx="1"/><rect x="15" y="1" width="5" height="5" rx="1"/><rect x="1" y="8" width="5" height="5" rx="1"/><rect x="8" y="8" width="5" height="5" rx="1"/><rect x="15" y="8" width="5" height="5" rx="1"/><rect x="1" y="15" width="5" height="5" rx="1"/><rect x="8" y="15" width="5" height="5" rx="1"/><rect x="15" y="15" width="5" height="5" rx="1"/></svg>`,
  editTabs:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  pin:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  refresh:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  filter:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  columns:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>`,
  sort:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>`,
  trash:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
  listSettings: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  navProducers: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><polyline points="16 11 18 13 22 9"/></svg>`,
  navTasks:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"/><polyline points="12 7 16 7 20 7"/><rect x="3" y="14" width="6" height="6" rx="1"/><polyline points="12 16 16 16 20 16"/></svg>`,
  // Account icon for lv-card
  accountIcon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  // Shield icon for policy sets
  shieldIcon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
};

// ── SF nav tab definitions ────────────────────────────────────

const SF_TABS = [
  { label: 'Companies',              screen: null },
  { label: 'Contacts',               screen: 'screen-m-contacts' },
  { label: 'Accounts',               onclick: 'goAccountsCtx()' },
  { label: 'People',                 screen: null },
  { label: 'Producer Details',       screen: 'screen-m-producer-details' },
  { label: 'Onboarding Tasks',       screen: 'screen-m-onboarding-tasks', agencyOnly: true },
  { label: 'Producer Assignments',   screen: null },
  { label: 'Producer Compliance...', screen: null },
  { label: 'Policy Sets',            screen: 'screen-m-policysets' },
  { label: 'More',                   screen: null },
];

// ══════════════════════════════════════════════════════════════
// renderSFChrome({ activeTab })
//
// Renders the 2-row Salesforce nav (utility bar + app bar).
// Replace data-component="sf-chrome" content with this.
//
// React equivalent: <SFNav activeTab="Accounts" />
// ══════════════════════════════════════════════════════════════
function renderSFChrome({ activeTab = '' } = {}) {
  const tabs = SF_TABS.map(t => {
    const isActive  = t.label === activeTab;
    const isLinked  = !!(t.screen || t.onclick);
    const isDim     = !isActive && !isLinked;
    const cls = ['ms-nav__tab', isActive ? 'active' : '', isDim ? 'ms-nav__tab--dim' : '', t.agencyOnly ? 'context-agency-only' : ''].filter(Boolean).join(' ');
    const handler = t.onclick ? ` onclick="${t.onclick}"`
      : t.screen ? ` onclick="go('${t.screen}')"` : '';
    return `<div class="${cls}"${handler}>${t.label} <span class="ms-nav__caret">▾</span></div>`;
  }).join('');

  return `
<div class="ms-nav">
  <!-- Utility bar -->
  <div class="ms-nav__utility">
    <a class="ms-logo">
      <img src="assets/agentsync-logo.png" width="32" height="32" alt="AgentSync" style="display:block">
    </a>
    <div class="ms-nav__search">
      ${_IC.search}
      <input type="text" placeholder="Search...">
    </div>
    <div class="ms-nav__icons">
      <div class="ms-nav__icon--combo" title="Favorites">
        ${_IC.star}${_IC.caretDown}
      </div>
      <div class="ms-nav__icon" title="New">${_IC.plus}</div>
      <div class="ms-nav__icon" title="Notifications" style="position:relative">
        ${_IC.bell}
        <span class="ms-nav__badge">1</span>
      </div>
      <div class="ms-nav__icon" title="Help">${_IC.help}</div>
      <div class="ms-nav__icon" title="Setup" onclick="go('screen-m-settings')">${_IC.gear}</div>
      <div class="ms-nav__avatar">JD</div>
    </div>
  </div>
  <!-- App bar -->
  <div class="ms-nav__app">
    <div class="ms-nav__waffle">${_IC.waffle}</div>
    <span class="ms-nav__appname">AgentSync</span>
    <div class="ms-nav__tabs">${tabs}</div>
    <div class="ms-nav__edit" title="Edit tabs">${_IC.editTabs}</div>
  </div>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// _renderCell(cell)
//
// Converts a cell descriptor to HTML string.
//
// Cell types:
//   String            → plain text
//   { t:'link', text, onclick }         → <a class="td-link">
//   { t:'pill', v:'active|draft|neutral|error', text } → <span class="lv-pill lv-pill--*">
//   { t:'ob-badge', v:'gray|success|warning', text }   → <span class="ob-badge ob-badge--*">
//   { t:'ob-progress', dot:'progress|complete|invited', text } → ob-cell with dot
//   { t:'raw', html }  → raw HTML (escape hatch)
// ══════════════════════════════════════════════════════════════
function _renderCell(cell) {
  if (cell === null || cell === undefined) return '';
  if (typeof cell === 'string' || typeof cell === 'number') return String(cell);
  switch (cell.t) {
    case 'link':
      return `<a class="td-link"${cell.onclick ? ` onclick="${cell.onclick}"` : ''}>${cell.text}</a>`;
    case 'pill':
      return `<span class="lv-pill lv-pill--${cell.v}">${cell.text}</span>`;
    case 'ob-badge':
      return `<span class="ob-badge ob-badge--${cell.v || 'gray'}">${cell.text}</span>`;
    case 'ob-progress':
      return `<div class="ob-cell"><span class="ob-dot ob-dot--${cell.dot || 'progress'}"></span>${cell.text}</div>`;
    case 'raw':
      return cell.html;
    default:
      return String(cell.text || '');
  }
}

// ══════════════════════════════════════════════════════════════
// renderSFTable(config)
//
// Renders a full Salesforce list-view card: header, toolbar,
// and data table.
//
// Config shape:
//   iconSvg      - SVG markup for the card icon
//   objectName   - e.g. "Accounts"
//   viewName     - e.g. "Recently Viewed"
//   meta         - e.g. "4 items • Sorted by Account Name"
//   headerActions - [{ label, cls:'lv-btn--outline|neutral', onclick }]
//   columns      - [{ label, sort?:true, width?, minWidth? }]
//   rows         - [{ num, cells[], onclick? }]
//     cells: first cell is always the link/name column;
//            remaining map to columns in order.
//
// React equivalent: <SFListView config={...} />
// ══════════════════════════════════════════════════════════════
function renderSFTable(config) {
  const {
    iconSvg = _IC.accountIcon,
    objectName = 'Records',
    viewName = 'All Records',
    meta = '',
    headerActions = [],
    columns = [],
    rows = [],
  } = config;

  // Header action buttons
  const headerBtns = headerActions.map(a =>
    `<button class="lv-btn ${a.cls || 'lv-btn--neutral'}"${a.onclick ? ` onclick="${a.onclick}"` : ''}>${a.label}</button>`
  ).join('');

  // Column headers (skip first two for num + checkbox)
  const thCols = columns.map(col => {
    const w = col.width ? ` style="width:${col.width}px"` : col.minWidth ? ` style="min-width:${col.minWidth}px"` : '';
    const inner = col.sort !== false
      ? `<div class="th-sort">${col.label} <span class="sort-caret">▾</span></div>`
      : col.label;
    return `<th${w}>${inner}</th>`;
  }).join('');

  // Table rows
  const tbodyRows = rows.map((row, i) => {
    const rowClick = row.onclick ? ` onclick="${row.onclick}"` : '';
    const cells = (row.cells || []).map((cell, ci) => {
      // First data cell (after num + checkbox) is the name/link column
      if (ci === 0) {
        const cellHtml = _renderCell(cell);
        return `<td>${cellHtml}</td>`;
      }
      return `<td>${_renderCell(cell)}</td>`;
    }).join('');

    return `<tr${rowClick}>
      <td class="td-num">${row.num !== undefined ? row.num : i + 1}</td>
      <td class="td-chk"><input type="checkbox" onclick="event.stopPropagation()"></td>
      ${cells}
      <td class="td-action"><button class="row-action-btn" onclick="event.stopPropagation()">▼</button></td>
    </tr>`;
  }).join('');

  return `
<div class="lv-card">
  <!-- Card header -->
  <div class="lv-card__header">
    <div class="lv-card__header-left">
      <div class="lv-card__icon">${iconSvg}</div>
      <div>
        <div class="lv-card__object-name">${objectName}</div>
        <div class="lv-card__view-name">
          ${viewName}
          <span class="lv-card__view-caret">▼</span>
        </div>
      </div>
      <div class="lv-card__pin" title="Pin this view">${_IC.pin}</div>
    </div>
    <div class="lv-card__header-right">${headerBtns}</div>
  </div>

  <!-- Toolbar -->
  <div class="lv-card__toolbar">
    <span class="lv-meta">${meta}</span>
    <div class="lv-toolbar-actions">
      <div class="lv-search-wrap">
        ${_IC.searchSm}
        <input class="lv-search" type="text" placeholder="Search this list...">
      </div>
      <div class="lv-icon-btn" title="List settings">${_IC.listSettings}</div>
      <div class="lv-icon-btn" title="Toggle columns">${_IC.columns}</div>
      <div class="lv-icon-btn" title="Refresh">${_IC.refresh}</div>
      <div class="lv-icon-btn" title="Sort">${_IC.sort}</div>
      <div class="lv-icon-btn" title="Edit columns">${_IC.editTabs}</div>
      <div class="lv-icon-btn" title="Delete">${_IC.trash}</div>
      <div class="lv-icon-btn" title="Filter">${_IC.filter}</div>
    </div>
  </div>

  <!-- Table -->
  <table>
    <thead>
      <tr>
        <th class="th-num"></th>
        <th class="th-chk"><input type="checkbox"></th>
        ${thCols}
        <th class="td-action"></th>
      </tr>
    </thead>
    <tbody>${tbodyRows}</tbody>
  </table>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// renderOBTopnav(config)
//
// Renders the Onboarding topnav bar.
// Config: { searchPlaceholder?, notificationCount?, avatar? }
//
// React equivalent: <OBTopNav />
// ══════════════════════════════════════════════════════════════
function renderOBTopnav({ searchPlaceholder = 'Search...', notificationCount = 4, avatar = 'JT' } = {}) {
  const badge = notificationCount > 0
    ? `<span class="coo-topnav__icon-badge">${notificationCount}</span>`
    : '';
  return `
<div class="coo-topnav">
  <a class="coo-topnav__logo">
    <img src="assets/agentsync-logo.png" width="32" height="32" alt="AgentSync" style="display:block">
    <span class="coo-topnav__logo-text">Onboarding</span>
  </a>
  <div class="coo-topnav__search">
    ${_IC.search}
    <input type="text" placeholder="${searchPlaceholder}">
  </div>
  <div class="coo-topnav__actions">
    <div class="coo-topnav__icon" title="Notifications" style="position:relative">
      ${_IC.bell}${badge}
    </div>
    <div class="coo-topnav__icon" title="Help">${_IC.help}</div>
    <div class="coo-topnav__avatar">${avatar}</div>
  </div>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// renderOBSidebar(config)
//
// Renders the left sidebar navigation for Onboarding screens.
// Config: { activeNav: 'Producers'|'Tasks' }
//
// React equivalent: <OBSidebar activeNav="Producers" />
// ══════════════════════════════════════════════════════════════
function renderOBSidebar({ activeNav = '' } = {}) {
  const navItems = [
    { label: 'Producers', icon: _IC.navProducers, screen: 'screen-om-producers' },
    { label: 'Tasks',     icon: _IC.navTasks,     screen: 'screen-om-tasks' },
  ];
  const items = navItems.map(item => {
    const isActive = item.label === activeNav;
    return `<div class="coo-nav-item${isActive ? ' active' : ''}" onclick="go('${item.screen}')">
      ${item.icon}
      ${item.label}
    </div>`;
  }).join('');

  return `
<div class="coo-sidebar">
  <div class="coo-sidebar__label">Navigation</div>
  ${items}
</div>`;
}

// ══════════════════════════════════════════════════════════════
// renderOBTable(config)
//
// Renders a MUI DataGrid-inspired table for Onboarding screens.
// Supports multi-select action bar.
//
// Config shape:
//   count          - display text, e.g. "12 producers"
//   searchPlaceholder
//   actionBar      - { label, onclick } — shown when rows selected
//   columns        - [{ label, width? }] — excludes checkbox col
//   rows           - [{ id, cells[], onclick? }]
//
// React equivalent:
//   <DataGrid
//     rows={rows} columns={columns}
//     checkboxSelection
//     slots={{ toolbar: OBTableToolbar }}
//   />
// ══════════════════════════════════════════════════════════════
function renderOBTable(config) {
  const {
    count = '',
    searchPlaceholder = 'Search...',
    actionBar = null,
    columns = [],
    rows = [],
  } = config;

  // Header row
  const thCols = columns.map(col => {
    const w = col.width ? ` style="width:${col.width}px"` : '';
    return `<th${w}>${col.label}</th>`;
  }).join('');

  // Data rows
  const tbodyRows = rows.map(row => {
    const rowClick = row.onclick ? ` onclick="${row.onclick}"` : '';
    const cells = (row.cells || []).map(cell => `<td>${_renderCell(cell)}</td>`).join('');
    return `<tr${rowClick}>
      <td class="td-cb" onclick="event.stopPropagation()">
        <input type="checkbox" class="prod-row-cb" onclick="prodToggleRow(this)">
      </td>
      ${cells}
    </tr>`;
  }).join('');

  // Action bar HTML (shown when has-selection; CTA on right)
  const actionBarHtml = actionBar ? `
<div class="ob-action-bar">
  <span class="ob-action-bar__count">0 selected</span>
  <button class="ob-action-bar__clear" onclick="prodClearSelection(this)">Clear</button>
  <button class="ob-action-bar__btn ob-action-bar__cta" onclick="${actionBar.onclick || ''}">${actionBar.label}</button>
</div>` : '';

  return `
<div class="ob-table-wrap">
  <div class="toolbar-default">
    <div class="pt-search-wrap">
      ${_IC.search}
      <input class="pt-search" type="text" placeholder="${searchPlaceholder}">
    </div>
    <button class="pt-ghost-btn">${_IC.filter} Filter</button>
    <button class="pt-ghost-btn">${_IC.columns} Columns</button>
  </div>
  ${actionBarHtml}
  <table>
    <thead>
      <tr>
        <th class="td-cb"><input type="checkbox" class="prod-all-cb" onclick="prodToggleAll(this)"></th>
        ${thCols}
      </tr>
    </thead>
    <tbody>${tbodyRows}</tbody>
  </table>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// renderOBTaskTable(config)
//
// Renders the Onboarding tasks table with inline expand drawers.
// Each row has a corresponding hidden drawer row below it.
//
// Config shape:
//   columns - [{ label }]
//   rows    - [{
//     id,        // used for drawer id, e.g. "coo-drawer-1"
//     cells[],
//     drawer: { title?, required?, sections: [{ title, fields: [{ label, value }] }] }
//   }]
//
// React equivalent: a virtualized table with expandable row panels
// ══════════════════════════════════════════════════════════════
function renderOBTaskTable(config) {
  const { columns = [], rows = [], count = '', searchPlaceholder = 'Search tasks...' } = config;
  const colCount = columns.length + 1; // +1 for checkbox

  const thCols = columns.map(col => `<th>${col.label}</th>`).join('');

  const tbodyRows = rows.map((row, i) => {
    const drawerId = row.id || `task-drawer-${i}`;
    const cells = (row.cells || []).map(cell => `<td>${_renderCell(cell)}</td>`).join('');
    const d = row.drawer || {};

    // Derive field values from row.cells — single source of truth
    const taskName   = _cellText(row.cells && row.cells[0]);
    const producer   = _cellText(row.cells && row.cells[1]);
    const type       = _cellText(row.cells && row.cells[2]);
    const statusCell = row.cells && row.cells[3];
    const statusTxt  = _cellText(statusCell);
    const assigned   = _cellText(row.cells && row.cells[4]);
    const owner      = _cellText(row.cells && row.cells[5]);

    // Status badge color
    const statusV = (statusCell && statusCell.v) || 'gray';
    const statusColorMap = {
      success: 'background:var(--color-success-100);color:var(--color-success-600)',
      warning: 'background:var(--color-warning-100);color:var(--color-warning-600)',
      gray:    'background:var(--color-gray-100);color:var(--color-gray-600)',
    };
    const statusStyle = statusColorMap[statusV] || statusColorMap.gray;

    // Required / Optional badge
    const reqBadge = d.required === false
      ? `<span class="badge" style="background:var(--color-gray-100);color:var(--color-gray-500);">Optional</span>`
      : `<span class="badge" style="background:var(--color-danger-100);color:var(--color-danger-600);">Required</span>`;

    // Overview section — auto-built from row cells
    const overviewFields = [
      { label: 'Producer', value: producer },
      { label: 'Type',     value: type },
      { label: 'Owner',    value: owner },
    ].filter(f => f.value).map(f => `
              <div class="pr-detail-field">
                <div class="pr-detail-field__label">${f.label}</div>
                <div class="pr-detail-field__value">${f.value}</div>
              </div>`).join('');

    // Extra sections from drawer config
    const extraSections = (d.sections || []).map(sec => {
      const fieldsHtml = (sec.fields || []).map(f => `
              <div class="pr-detail-field">
                <div class="pr-detail-field__label">${f.label}</div>
                <div class="pr-detail-field__value">${f.value}</div>
              </div>`).join('');
      return `
          <div class="pr-detail-section">
            <div class="pr-detail-section__head">
              <span class="pr-detail-section__title">${sec.title}</span>
              <span class="pr-detail-section__chevron">▾</span>
            </div>
            <div class="pr-detail-section__content">${fieldsHtml}
            </div>
          </div>`;
    }).join('');

    return `<tr class="task-row-clickable" onclick="toggleTaskDrawer('${drawerId}', this)">
      <td class="td-cb"></td>
      ${cells}
    </tr>
    <tr id="${drawerId}" class="task-drawer-row">
      <td colspan="${colCount}">
        <div class="task-drawer-inner">
          <div class="task-drawer-detail">
            <div class="pr-detail-head">
              <div class="pr-detail-head__title">${d.title || taskName}</div>
              <div class="pr-detail-head__meta">
                ${reqBadge}
                <span class="badge" style="${statusStyle}">${statusTxt}</span>
                ${assigned ? `<span style="font-size:var(--font-size-xs);color:var(--color-text-muted);">Assigned ${assigned}</span>` : ''}
              </div>
            </div>
            <div class="pr-detail-body">
              <div class="pr-detail-section">
                <div class="pr-detail-section__head">
                  <span class="pr-detail-section__title">Overview</span>
                  <span class="pr-detail-section__chevron">▾</span>
                </div>
                <div class="pr-detail-section__content">
                  ${overviewFields}
                </div>
              </div>
              ${extraSections}
            </div>
          </div>
        </div>
      </td>
    </tr>`;
  }).join('');

  const thCb = `<th class="td-cb"></th>`;
  return `
<div class="ob-table-wrap">
  <div class="toolbar-default">
    <div class="pt-search-wrap">
      ${_IC.search}
      <input class="pt-search" type="text" placeholder="${searchPlaceholder}">
    </div>
    <button class="pt-ghost-btn">${_IC.filter} Filter</button>
    <button class="pt-ghost-btn">${_IC.columns} Columns</button>
  </div>
  <table>
    <thead>
      <tr>${thCb}${thCols}</tr>
    </thead>
    <tbody>${tbodyRows}</tbody>
  </table>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// initScreenComponents()
//
// Called once after all screen HTML files are loaded.
// Scans for [data-component] mount points and renders the
// appropriate component using SCREEN_DATA.
//
// Reads from: SCREEN_DATA (defined in screen-data.js)
// ══════════════════════════════════════════════════════════════
function initScreenComponents() {
  if (typeof SCREEN_DATA === 'undefined') {
    console.warn('components.js: SCREEN_DATA not found. Did you load screen-data.js first?');
    return;
  }

  document.querySelectorAll('[data-component]').forEach(el => {
    const component = el.dataset.component;
    const screenKey = el.dataset.screen; // e.g. "m-accounts"
    const data = screenKey ? (SCREEN_DATA[screenKey] || {}) : {};

    switch (component) {
      case 'sf-chrome':
        el.innerHTML = renderSFChrome(data.sfChrome || {});
        break;
      case 'sf-table':
        if (data.sfTable) el.innerHTML = renderSFTable(data.sfTable);
        break;
      case 'ob-topnav':
        el.innerHTML = renderOBTopnav(data.obTopnav || {});
        break;
      case 'ob-sidebar':
        el.innerHTML = renderOBSidebar(data.obSidebar || {});
        break;
      case 'ob-table':
        if (data.obTable) el.innerHTML = renderOBTable(data.obTable);
        break;
      case 'ob-task-table':
        if (data.obTaskTable) el.innerHTML = renderOBTaskTable(data.obTaskTable);
        break;
      default:
        console.warn('components.js: unknown component type:', component);
    }
  });
}
