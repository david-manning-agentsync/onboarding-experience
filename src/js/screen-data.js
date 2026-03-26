/* =============================================================
   screen-data.js
   Data configs for all screens that use the component system.

   Keys match the data-screen attribute on [data-component] divs
   (without the "screen-" prefix).

   To update table content: edit the rows[] arrays below.
   To update columns:       edit the columns[] arrays.
   To update header actions: edit headerActions[].

   React mapping: each config shape mirrors the props of the
   equivalent React component.
   ============================================================= */

const SCREEN_DATA = {

  // ── Accounts List — Carrier view (Agency + MGA distribution network) ──
  'm-accounts': {
    sfChrome: { activeTab: 'Accounts' },
    sfTable: {
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      objectName: 'Accounts',
      viewName: 'All Accounts',
      meta: '10 items &bull; Sorted by Account Name',
      headerActions: [
        { label: 'New',                cls: 'lv-btn--outline', onclick: "go('screen-m-new-account');naInit()" },
        { label: 'Manage Policy Sets', cls: 'lv-btn--outline', onclick: "openManagePSModal()" },
        { label: 'Import',             cls: 'lv-btn--neutral' },
        { label: 'Assign Label',       cls: 'lv-btn--outline' },
      ],
      columns: [
        { label: 'Account Name',  sort: true, minWidth: 300 },
        { label: 'Type',          width: 120 },
        { label: 'Phone',         width: 140 },
        { label: 'Account Owner', width: 180 },
      ],
      rows: [
        {
          num: 1,
          onclick: "go('screen-m-account-record')",
          cells: [
            { t: 'link', text: 'Nationwide Brokers Group', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Agency', '(303) 555-0182', 'JD',
          ],
        },
        {
          num: 2,
          onclick: "go('screen-m-account-record')",
          cells: [
            { t: 'link', text: 'Summit Financial Partners', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Agency', '(415) 555-0239', 'JD',
          ],
        },
        {
          num: 3,
          cells: [{ t: 'link', text: 'Mountain West Insurance Agency' }, 'Agency', '(801) 555-0147', 'JD'],
        },
        {
          num: 4,
          cells: [{ t: 'link', text: 'Blue Ridge Insurance Group' }, 'Agency', '(828) 555-0312', 'JD'],
        },
        {
          num: 5,
          cells: [{ t: 'link', text: 'Coastal Edge Partners' }, 'MGA', '(619) 555-0283', 'JD'],
        },
        {
          num: 6,
          cells: [{ t: 'link', text: 'Heartland Insurance Associates' }, 'Agency', '(316) 555-0094', 'JD'],
        },
        {
          num: 7,
          cells: [{ t: 'link', text: 'Keystone Advisors' }, 'Agency', '(412) 555-0167', 'JD'],
        },
        {
          num: 8,
          cells: [{ t: 'link', text: 'Pacific Coast Advisors' }, 'MGA', '(206) 555-0317', 'JD'],
        },
        {
          num: 9,
          cells: [{ t: 'link', text: 'Apex Managing General Agency' }, 'MGA', '(713) 555-0228', 'JD'],
        },
        {
          num: 10,
          cells: [{ t: 'link', text: 'Pinnacle MGA Solutions' }, 'MGA', '(602) 555-0361', 'JD'],
        },
      ],
    },
  },

  // ── Accounts List — Agency view (single customer account) ─────
  'm-accounts-agency': {
    sfChrome: { activeTab: 'Accounts' },
    sfTable: {
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      objectName: 'Accounts',
      viewName: 'My Account',
      meta: '1 item',
      headerActions: [
        { label: 'Manage Policy Sets', cls: 'lv-btn--outline', onclick: "openManagePSModal()" },
        { label: 'Import',             cls: 'lv-btn--neutral' },
      ],
      columns: [
        { label: 'Account Name',  sort: true, minWidth: 300 },
        { label: 'Type',          width: 120 },
        { label: 'Phone',         width: 140 },
        { label: 'Account Owner', width: 180 },
      ],
      rows: [
        {
          num: 1,
          onclick: "go('screen-m-account-record')",
          cells: [
            { t: 'link', text: 'Summit Financial Partners', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Agency', '(415) 555-0239', 'JD',
          ],
        },
      ],
    },
  },

  // ── Contacts List ──────────────────────────────────────────────
  'm-contacts': {
    sfChrome: { activeTab: 'Contacts' },
    sfTable: {
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
      objectName: 'Contacts',
      viewName: 'All Contacts',
      meta: '8 items &bull; Sorted by Contact Name',
      headerActions: [
        { label: 'New',                 cls: 'lv-btn--outline' },
        { label: 'Onboard as Producer', cls: 'lv-btn--outline', onclick: "openOnboardProducerModal()" },
        { label: 'Import',              cls: 'lv-btn--neutral' },
      ],
      columns: [
        { label: 'Contact Name',   sort: true, minWidth: 220 },
        { label: 'Account',        minWidth: 220 },
        { label: 'Title',          width: 190 },
        { label: 'Phone',          width: 140 },
        { label: 'Contact Owner',  width: 160 },
      ],
      rows: [
        // Nationwide Brokers Group
        {
          num: 1,
          onclick: "go('screen-m-contact-record')",
          cells: [
            { t: 'link', text: 'Sarah Chen', onclick: "event.stopPropagation();go('screen-m-contact-record')" },
            { t: 'link', text: 'Nationwide Brokers Group', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Account Executive', '(303) 555-0191', 'JD',
          ],
        },
        {
          num: 2,
          onclick: "go('screen-m-contact-record')",
          cells: [
            { t: 'link', text: 'Mike Torres', onclick: "event.stopPropagation();go('screen-m-contact-record')" },
            { t: 'link', text: 'Nationwide Brokers Group', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Compliance Manager', '(303) 555-0203', 'JD',
          ],
        },
        {
          num: 3,
          cells: [
            { t: 'link', text: 'Lisa Park' },
            { t: 'link', text: 'Nationwide Brokers Group', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Operations Director', '(303) 555-0247', 'JD',
          ],
        },
        {
          num: 4,
          cells: [
            { t: 'link', text: "James O'Brien" },
            { t: 'link', text: 'Nationwide Brokers Group', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Senior Broker', '(303) 555-0288', 'JD',
          ],
        },
        // Summit Financial Partners
        {
          num: 5,
          cells: [
            { t: 'link', text: 'David Reeves' },
            { t: 'link', text: 'Summit Financial Partners', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Principal Agent', '(415) 555-0261', 'JD',
          ],
        },
        {
          num: 6,
          cells: [
            { t: 'link', text: 'Jennifer Walsh' },
            { t: 'link', text: 'Summit Financial Partners', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Operations Manager', '(415) 555-0274', 'JD',
          ],
        },
        {
          num: 7,
          cells: [
            { t: 'link', text: 'Claire Sutton' },
            { t: 'link', text: 'Summit Financial Partners', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Senior Agent', '(415) 555-0302', 'JD',
          ],
        },
        {
          num: 8,
          cells: [
            { t: 'link', text: 'Angela Fischer' },
            { t: 'link', text: 'Summit Financial Partners', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Compliance Officer', '(415) 555-0318', 'JD',
          ],
        },
      ],
    },
  },

  // ── Contacts List (Carrier) ────────────────────────────────────
  'm-contacts-carrier': {
    sfChrome: { activeTab: 'Contacts' },
    sfTable: {
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
      objectName: 'Contacts',
      viewName: 'All Contacts',
      meta: '8 items &bull; Sorted by Contact Name',
      headerActions: [
        { label: 'New',    cls: 'lv-btn--outline' },
        { label: 'Import', cls: 'lv-btn--neutral' },
      ],
      columns: [
        { label: 'Contact Name',   sort: true, minWidth: 220 },
        { label: 'Account',        minWidth: 220 },
        { label: 'Title',          width: 190 },
        { label: 'Phone',          width: 140 },
        { label: 'Contact Owner',  width: 160 },
      ],
      rows: [
        {
          num: 1,
          onclick: "go('screen-m-contact-record')",
          cells: [
            { t: 'link', text: 'Sarah Chen', onclick: "event.stopPropagation();go('screen-m-contact-record')" },
            { t: 'link', text: 'Nationwide Brokers Group', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Account Executive', '(303) 555-0191', 'JD',
          ],
        },
        {
          num: 2,
          onclick: "go('screen-m-contact-record')",
          cells: [
            { t: 'link', text: 'Mike Torres', onclick: "event.stopPropagation();go('screen-m-contact-record')" },
            { t: 'link', text: 'Nationwide Brokers Group', onclick: "event.stopPropagation();go('screen-m-account-record')" },
            'Compliance Manager', '(303) 555-0203', 'JD',
          ],
        },
        { num: 3, cells: [{ t: 'link', text: 'Lisa Park' }, { t: 'link', text: 'Nationwide Brokers Group' }, 'Operations Director', '(303) 555-0247', 'JD'] },
        { num: 4, cells: [{ t: 'link', text: "James O'Brien" }, { t: 'link', text: 'Nationwide Brokers Group' }, 'Senior Broker', '(303) 555-0288', 'JD'] },
        { num: 5, cells: [{ t: 'link', text: 'David Reeves' }, { t: 'link', text: 'Summit Financial Partners' }, 'Principal Agent', '(415) 555-0261', 'JD'] },
        { num: 6, cells: [{ t: 'link', text: 'Jennifer Walsh' }, { t: 'link', text: 'Summit Financial Partners' }, 'Operations Manager', '(415) 555-0274', 'JD'] },
        { num: 7, cells: [{ t: 'link', text: 'Claire Sutton' }, { t: 'link', text: 'Summit Financial Partners' }, 'Senior Agent', '(415) 555-0302', 'JD'] },
        { num: 8, cells: [{ t: 'link', text: 'Angela Fischer' }, { t: 'link', text: 'Summit Financial Partners' }, 'Compliance Officer', '(415) 555-0318', 'JD'] },
      ],
    },
  },

  // ── Policy Sets List ──────────────────────────────────────────
  'm-policysets': {
    sfChrome: { activeTab: 'Policy Sets' },
    sfTable: {
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      objectName: 'Policy Sets',
      viewName: 'All Policy Sets',
      meta: '4 items &bull; Sorted by Policy Set Name',
      headerActions: [
        { label: 'New',    cls: 'lv-btn--outline',  onclick: "wzReset();go('screen-m-ps-create')" },
        { label: 'Import', cls: 'lv-btn--neutral' },
      ],
      columns: [
        { label: 'Policy Set Name', sort: true, minWidth: 280 },
        { label: 'Type',    width: 110 },
        { label: 'Status',  width: 110 },
        { label: 'Accounts', width: 90 },
        { label: 'Tasks',   width: 80 },
        { label: 'Last Modified', width: 140 },
      ],
      rows: [
        {
          num: 1,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Standard Agent Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Standard Agent Onboarding\')" title="View policy set details">i</button></span>' },
            { t: 'pill', v: 'neutral', text: 'Individual' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '3', '7', 'Mar 8, 2026',
          ],
        },
        {
          num: 2,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Principal Agent Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Principal Agent Onboarding\')" title="View policy set details">i</button></span>' },
            { t: 'pill', v: 'neutral', text: 'Individual' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '1', '5', 'Feb 20, 2026',
          ],
        },
        {
          num: 3,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Carrier A Producer Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Carrier A Producer Onboarding\')" title="View policy set details">i</button></span><span class="ps-contracting-badge">Contracting</span>' },
            { t: 'pill', v: 'neutral', text: 'Individual' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '2', '6', 'Mar 11, 2026',
          ],
        },
        {
          num: 4,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Carrier Z Producer Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Carrier Z Producer Onboarding\')" title="View policy set details">i</button></span><span class="ps-contracting-badge">Contracting</span>' },
            { t: 'pill', v: 'neutral', text: 'Individual' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '1', '6', 'Mar 11, 2026',
          ],
        },
      ],
    },
  },

  // ── Policy Sets List — Carrier view ───────────────────────────
  'm-policysets-carrier': {
    sfChrome: { activeTab: 'Policy Sets' },
    sfTable: {
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      objectName: 'Policy Sets',
      viewName: 'All Policy Sets',
      meta: '5 items &bull; Sorted by Policy Set Name',
      headerActions: [
        { label: 'New',    cls: 'lv-btn--outline',  onclick: "wzReset();go('screen-m-ps-create')" },
        { label: 'Import', cls: 'lv-btn--neutral' },
      ],
      columns: [
        { label: 'Policy Set Name', sort: true, minWidth: 280 },
        { label: 'Type',    width: 110 },
        { label: 'Status',  width: 110 },
        { label: 'Accounts', width: 90 },
        { label: 'Tasks',   width: 80 },
        { label: 'Last Modified', width: 140 },
      ],
      rows: [
        {
          num: 1,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Captive Agent Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Captive Agent Onboarding\')" title="View policy set details">i</button></span>' },
            { t: 'pill', v: 'neutral', text: 'Individual' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '4', '6', 'Mar 8, 2026',
          ],
        },
        {
          num: 2,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Partner Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Partner Onboarding\')" title="View policy set details">i</button></span><span class="ps-contracting-badge">Contracting</span>' },
            { t: 'pill', v: 'neutral', text: 'Firm' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '2', '5', 'Mar 5, 2026',
          ],
        },
        {
          num: 3,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Accident &amp; Health — Producer Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Accident &amp; Health — Producer Onboarding\')" title="View policy set details">i</button></span>' },
            { t: 'pill', v: 'neutral', text: 'Individual' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '3', '7', 'Feb 28, 2026',
          ],
        },
        {
          num: 4,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Health &amp; Life — Producer Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Health &amp; Life — Producer Onboarding\')" title="View policy set details">i</button></span>' },
            { t: 'pill', v: 'neutral', text: 'Individual' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '2', '7', 'Feb 20, 2026',
          ],
        },
        {
          num: 5,
          cells: [
            { t: 'raw', html: '<span class="ps-name-cell"><a class="td-link">Life — Producer Onboarding</a><button class="ps-info-btn" onclick="event.stopPropagation();showPolicySetModal(\'Life — Producer Onboarding\')" title="View policy set details">i</button></span>' },
            { t: 'pill', v: 'neutral', text: 'Individual' },
            { t: 'pill', v: 'active',  text: 'Active' },
            '1', '6', 'Feb 15, 2026',
          ],
        },
      ],
    },
  },

  // ── Producer Details List (Manage / SLDS) ─────────────────────
  'm-producer-details': {
    sfChrome: { activeTab: 'Producer Details' },
    sfTable: {
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><polyline points="16 11 18 13 22 9"/></svg>`,
      objectName: 'Producer Details',
      viewName: 'All Producer Details',
      meta: '6 items &bull; Sorted by Producer Details Name',
      headerActions: [
        { label: 'New',             cls: 'lv-btn--outline' },
        { label: 'Add Policy Sets', cls: 'lv-btn--outline', onclick: "prodShowPSModal(this.closest('.ob-action-bar') || this)" },
        { label: 'Import',          cls: 'lv-btn--neutral' },
      ],
      columns: [
        { label: 'Producer Details Name', sort: true, minWidth: 220 },
        { label: 'Related Producer',      minWidth: 180 },
        { label: 'NPN',                   width: 110 },
        { label: 'SSN',                   width: 110 },
        { label: 'R...',                  width: 54 },
        { label: 'Last Modified',         width: 130 },
        { label: 'Owner',                 width: 80 },
        { label: 'Created Date',          width: 130 },
      ],
      rows: [
        {
          num: 1,
          onclick: "go('screen-m-producer-detail-record')",
          cells: [
            { t: 'link', text: 'Claire Sutton', onclick: "event.stopPropagation();go('screen-m-producer-detail-record')" },
            { t: 'link', text: 'Claire Sutton' },
            '18472910', '***-**-6247', 'CO', 'Mar 10, 2026', 'JD', 'Jan 5, 2025',
          ],
        },
        {
          num: 2,
          cells: [
            'Marcus Webb',
            'Marcus Webb',
            '20938471', '***-**-8812', 'TX', 'Mar 5, 2026', 'JD', 'Jan 12, 2025',
          ],
        },
        {
          num: 3,
          cells: [
            'Priya Nair',
            'Priya Nair',
            '33019847', '***-**-4491', 'FL', 'Feb 28, 2026', 'JD', 'Feb 3, 2025',
          ],
        },
        {
          num: 4,
          cells: [
            'Diego Flores',
            'Diego Flores',
            '19472837', '***-**-7703', 'CA', 'Mar 1, 2026', 'JD', 'Feb 14, 2025',
          ],
        },
        {
          num: 5,
          cells: [
            'Lena Kim',
            'Lena Kim',
            '27384910', '***-**-2258', 'NY', 'Feb 20, 2026', 'JD', 'Feb 20, 2025',
          ],
        },
        {
          num: 6,
          cells: [
            "James O'Brien",
            "James O'Brien",
            '38472019', '***-**-5134', 'OH', 'Feb 15, 2026', 'JD', 'Mar 1, 2025',
          ],
        },
      ],
    },
  },

  // ── Onboarding Tasks (Manage / SLDS — iframe embed) ───────────
  'm-onboarding-tasks': {
    sfChrome: { activeTab: 'Onboarding Tasks' },
  },

  // ── Producers (Onboarding Operations) ─────────────────────────
  'om-producers': {
    obTopnav: { searchPlaceholder: 'Search producers...' },
    obSidebar: { activeNav: 'Producers' },
    obTable: {
      count: '12 producers',
      searchPlaceholder: 'Search producers...',
      actionBar: { label: '+ Add Policy Set', onclick: "prodShowPSModal(this.closest('.ob-action-bar'))" },
      columns: [
        { label: 'Producer' },
        { label: 'NPN',        width: 120 },
        { label: 'Type',       width: 100 },
        { label: 'Status',     width: 130 },
        { label: 'Onboarding', width: 200 },
        { label: 'Residence',  width: 100 },
      ],
      rows: [
        {
          onclick: "openProducerRecord('aot')",
          cells: [
            { t: 'link', text: 'Claire Sutton',     onclick: "event.stopPropagation();openProducerRecord('aot')" },
            '18472910', 'Agent',
            { t: 'ob-badge', v: 'gray',    text: 'In Progress' },
            { t: 'ob-progress', dot: 'progress', text: 'In progress (67%)' },
            'CO',
          ],
        },
        {
          cells: [
            { t: 'link', text: 'Marcus Webb' },
            '20938471', 'Agent',
            { t: 'ob-badge', v: 'gray',    text: 'In Progress' },
            { t: 'ob-progress', dot: 'progress', text: 'In progress (33%)' },
            'TX',
          ],
        },
        {
          cells: [
            { t: 'link', text: 'Priya Nair' },
            '33019847', 'Agent',
            { t: 'ob-badge', v: 'success', text: 'Complete' },
            { t: 'ob-progress', dot: 'complete', text: 'Complete' },
            'FL',
          ],
        },
        {
          cells: [
            { t: 'link', text: 'Diego Flores' },
            '19472837', 'Agent',
            { t: 'ob-badge', v: 'gray',    text: 'In Progress' },
            { t: 'ob-progress', dot: 'progress', text: 'In progress (50%)' },
            'CA',
          ],
        },
        {
          cells: [
            { t: 'link', text: 'Lena Kim' },
            '27384910', 'Agent',
            { t: 'ob-badge', v: 'warning', text: 'Invited' },
            { t: 'ob-progress', dot: 'invited', text: 'In progress (10%)' },
            'NY',
          ],
        },
        {
          cells: [
            { t: 'link', text: "James O'Brien" },
            '38472019', 'Firm',
            { t: 'ob-badge', v: 'success', text: 'Complete' },
            { t: 'ob-progress', dot: 'complete', text: 'Complete' },
            'OH',
          ],
        },
      ],
    },
  },

  // ── Tasks (Onboarding Operations) ─────────────────────────────
  'om-tasks': {
    obTopnav: { searchPlaceholder: 'Search tasks...' },
    obSidebar: { activeNav: 'Tasks' },
    obTaskTable: {
      count: '8 tasks · 3 producers',
      searchPlaceholder: 'Search tasks by name or producer...',
      columns: [
        { label: 'Task' },
        { label: 'Producer' },
        { label: 'Type',     width: 120 },
        { label: 'Status',   width: 130 },
        { label: 'Assigned', width: 120 },
        { label: 'Owner',    width: 100 },
      ],
      rows: [
        {
          id: 'coo-drawer-1',
          cells: [
            { t: 'link', text: 'Contact Info', onclick: "event.stopPropagation();openTaskDrawer(1)" },
            { t: 'link', text: 'Claire Sutton', onclick: "event.stopPropagation();openProducerRecord('coo')" },
            'Form',
            { t: 'ob-badge', v: 'gray', text: 'In Progress' },
            'Mar 3, 2026',
            'Producer',
          ],
          drawer: {
            title: 'Contact Info',
            required: true,
            sections: [
              {
                title: 'Task Details',
                fields: [
                  { label: 'Description', value: 'Claire Sutton needs to provide personal contact information including legal name, date of birth, SSN, and NPN. Required for all producers.' },
                ],
              },
            ],
          },
        },
        {
          id: 'coo-drawer-2',
          cells: [
            { t: 'link', text: 'Employment History', onclick: "event.stopPropagation();openTaskDrawer(1)" },
            { t: 'link', text: 'Marcus Webb' },
            'Form',
            { t: 'ob-badge', v: 'gray', text: 'Open' },
            'Mar 5, 2026',
            'Producer',
          ],
          drawer: {
            title: 'Employment History',
            required: true,
            sections: [
              {
                title: 'Task Details',
                fields: [
                  { label: 'Description', value: 'Marcus Webb needs to provide employment history covering the last 5 years, including any gaps. Required for background check processing.' },
                ],
              },
            ],
          },
        },
        {
          id: 'coo-drawer-3',
          cells: [
            { t: 'link', text: 'NIPR Attestation', onclick: "event.stopPropagation();openTaskDrawer(1)" },
            { t: 'link', text: 'Jordan Rivera' },
            'Attestation',
            { t: 'ob-badge', v: 'gray', text: 'Open' },
            'Mar 8, 2026',
            'Operations',
          ],
          drawer: {
            title: 'NIPR Attestation',
            required: true,
            sections: [
              {
                title: 'Task Details',
                fields: [
                  { label: 'Description', value: 'Jordan Rivera must attest to the accuracy of licensing data verified through NIPR, including resident state license number and active LOAs.' },
                ],
              },
            ],
          },
        },
        {
          id: 'coo-drawer-4',
          cells: [
            { t: 'link', text: 'E-Signature', onclick: "event.stopPropagation();openTaskDrawer(1)" },
            { t: 'link', text: 'Claire Sutton', onclick: "event.stopPropagation();openProducerRecord('coo')" },
            'Signature',
            { t: 'ob-badge', v: 'gray', text: 'Not Started' },
            'Mar 10, 2026',
            'Producer',
          ],
          drawer: {
            title: 'E-Signature',
            required: true,
            sections: [
              {
                title: 'Task Details',
                fields: [
                  { label: 'Description', value: 'Claire Sutton needs to review and sign the Producer Appointment Agreement and NIPR authorization form electronically.' },
                ],
              },
            ],
          },
        },
      ],
    },
  },

};
