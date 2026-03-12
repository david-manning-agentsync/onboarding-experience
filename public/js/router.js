// router.js — all navigation logic
// DO NOT MODIFY

function go(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function goFlow(flow) {
  const badge = document.getElementById('persona-badge');
  const body = document.body;

  // Remove all theme classes
  body.classList.remove('theme-manage', 'theme-onboarding');

  // Reset nav buttons
  document.querySelectorAll('.demo-flow-btn').forEach(b => b.classList.remove('active'));

  if (flow === 'manage') {
    body.classList.add('theme-manage');
    document.getElementById('btn-flow-manage').classList.add('active');
    badge.textContent = 'Manage User';
    badge.className = 'demo-persona-badge persona-manage';
    go('screen-m-accounts');
  } else if (flow === 'om') {
    body.classList.add('theme-onboarding');
    document.getElementById('btn-flow-om').classList.add('active');
    badge.textContent = 'Operating Manager';
    badge.className = 'demo-persona-badge persona-om';
    go('screen-om-email');
  } else if (flow === 'producer') {
    body.classList.add('theme-onboarding');
    document.getElementById('btn-flow-producer').classList.add('active');
    badge.textContent = 'Producer';
    badge.className = 'demo-persona-badge persona-producer';
    go('screen-p-email');
  }
}

// Task table inline drawer (om-tasks)
function toggleTaskDrawer(drawerId, rowEl) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  document.querySelectorAll('.task-drawer-row').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.task-row-clickable').forEach(r => r.classList.remove('selected'));
  if (!isOpen) {
    drawer.classList.add('open');
    rowEl.classList.add('selected');
  }
}

// Tab switcher for om-producer-record (Tasks / Details)
function switchTab(tabEl, panelId) {
  const allTabs = tabEl.closest('.tabs').querySelectorAll('.tab');
  const allPanels = tabEl.closest('.om-main').querySelectorAll('.tab-panel');
  allTabs.forEach(t => t.classList.remove('active'));
  allPanels.forEach(p => p.classList.remove('active'));
  tabEl.classList.add('active');
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

// Tab switcher for p-tasks (Tasks / Details)
function switchPTab(tabEl, panelId) {
  const allTabs = tabEl.closest('.tabs').querySelectorAll('.tab');
  allTabs.forEach(t => t.classList.remove('active'));
  tabEl.classList.add('active');
  document.querySelectorAll('#screen-p-tasks .tab-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

let _toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
}
