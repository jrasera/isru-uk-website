/* ============================================================
   ISRU UK — main.js
   Handles: nav/footer injection, scroll animations,
   mobile menu, Google Sheet news feed, category filters
   ============================================================ */

/* ---- CONFIGURATION ----
   To connect the news feed:
   1. Create a Google Sheet with these column headers in row 1:
      date | title | category | summary | link
   2. File → Share → Publish to web → Sheet1 → CSV → Publish
   3. Copy the URL and paste it below
   4. Do the same for the meetings sheet (second tab of same doc)
      and paste that URL as MEETINGS_SHEET_URL
*/
const NEWS_SHEET_URL    = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_KGAOgI3WA7z6cFtVrcenovr8vzOfEn0wcZBWVPTy6AqQRkYzP9MzSuHg5w0W4GSQmBSD7bU2Iv07/pub?gid=0&single=true&output=csv';
const MEETINGS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_KGAOgI3WA7z6cFtVrcenovr8vzOfEn0wcZBWVPTy6AqQRkYzP9MzSuHg5w0W4GSQmBSD7bU2Iv07/pub?gid=1309897780&single=true&output=csv';

/* ---- LOGO SVG (colour, light backgrounds) ---- */
const LOGO_SVG = `<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
  <g><circle cx="166.82" cy="269.2" r="6.52" fill="#dd0932"/><circle cx="173.18" cy="298.75" r="5.36" fill="#2e5bab"/><circle cx="229.19" cy="301.35" r="4.99" fill="#2e5bab"/><circle cx="131.37" cy="187.81" r="5.1" fill="#2e5bab"/><circle cx="79.3" cy="216.06" r="3.32" fill="#dd0932"/><circle cx="199.99" cy="270.24" r="7.56" fill="#dd0932"/><circle cx="179.58" cy="255.06" r="7.67" fill="#dd0932"/><circle cx="135.81" cy="255.46" r="5.66" fill="#2e5bab"/><circle cx="106.32" cy="238.67" r="4.55" fill="#2e5bab"/><circle cx="211.2" cy="257.13" r="8.35" fill="#dd0932"/><circle cx="191.82" cy="239.34" r="8.9" fill="#dd0932"/><circle cx="151.89" cy="272.56" r="5.89" fill="#dd0932"/><circle cx="159.78" cy="254.04" r="6.82" fill="#dd0932"/><circle cx="178.89" cy="286.38" r="6.04" fill="#2e5bab"/><circle cx="120.07" cy="203.9" r="4.88" fill="#2e5bab"/><circle cx="199.99" cy="286.43" r="6.33" fill="#dd0932"/><circle cx="121.61" cy="245.78" r="5.1" fill="#2e5bab"/><circle cx="135.14" cy="216.89" r="5.89" fill="#dd0932"/><circle cx="201.63" cy="306.35" r="5.36" fill="#dd0932"/><circle cx="180.9" cy="313.73" r="4.77" fill="#2e5bab"/><circle cx="216.09" cy="291.36" r="6" fill="#dd0932"/><circle cx="119.64" cy="220.74" r="5.1" fill="#dd0932"/><circle cx="161.74" cy="209.15" r="7.79" fill="#dd0932"/><circle cx="152.95" cy="221.14" r="7.08" fill="#dd0932"/><circle cx="173.18" cy="239.34" r="7.9" fill="#dd0932"/><circle cx="216.76" cy="273.9" r="7.15" fill="#dd0932"/><circle cx="140.66" cy="237.71" r="6.22" fill="#2e5bab"/><circle cx="144.07" cy="202.41" r="6.33" fill="#2e5bab"/><circle cx="234.85" cy="286" r="5.66" fill="#2e5bab"/></g>
  <g><g><path d="M224.52,113.6v50.44s17.66-17.42,17.66-17.42c-6.57-9.54-12.33-20.42-17.66-33.02Z" fill="#2e5bab"/><path d="M179.88,171.68v-55.75c-7.18,15.85-15.07,28.86-24.54,39.86,8.41,4.86,16.6,10.16,24.54,15.89Z" fill="#2e5bab"/><path d="M273.63,178.51l-17.67,17.42,50.41.67c-12.52-5.5-23.31-11.4-32.74-18.09Z" fill="#2e5bab"/><path d="M303.32,241.23l-55.43-.77c5.6,7.96,10.77,16.17,15.49,24.58,11.07-9.23,24.11-16.89,39.94-23.8Z" fill="#2e5bab"/><path d="M225.99,213.01l40.5-39.94c-7.08-5.77-13.34-12.12-19.01-19.28l-40.54,39.98c3.48,3.2,6.88,6.48,10.21,9.86,3.02,3.07,5.97,6.2,8.84,9.39Z" fill="#dd0932"/><path d="M215.04,173.39l.28-39.97c.19-26.59-3.27-53.07-10.33-78.7-.58-2.11-1.16-4.25-1.75-6.43-1.06,3.74-2.11,7.38-3.16,10.93-7.75,26.19-11.69,53.35-11.88,80.66l-.26,37.82c4.22,3.27,8.36,6.67,12.41,10.18l14.7-14.49Z" fill="#dd0932"/><path d="M231.81,219.67c3.5,4.12,6.87,8.33,10.12,12.62l41.18.29c25.37.18,50.62-3.22,75.03-10.14,4.27-1.21,8.68-2.43,13.23-3.65h0c-2.76-.78-5.47-1.56-8.13-2.34-24.02-7.02-48.88-10.73-73.91-10.9l-42.88-.3-14.63,14.43Z" fill="#dd0932"/></g><path d="M284.8,350.51c-36.3-99.45-115.59-179.78-214.49-217.5,104.55,23.99,191.91,112.65,214.49,217.5h0Z" fill="#2e5bab"/></g>
</svg>`;

const LOGO_SVG_WHITE = `<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
  <g opacity="0.8"><circle cx="166.83" cy="269.17" r="6.52" fill="#fff"/><circle cx="173.19" cy="298.72" r="5.36" fill="#fff"/><circle cx="229.2" cy="301.32" r="4.99" fill="#fff"/><circle cx="131.38" cy="187.78" r="5.1" fill="#fff"/><circle cx="79.31" cy="216.03" r="3.32" fill="#fff"/><circle cx="200" cy="270.21" r="7.56" fill="#fff"/><circle cx="179.59" cy="255.03" r="7.67" fill="#fff"/><circle cx="135.82" cy="255.43" r="5.66" fill="#fff"/><circle cx="106.33" cy="238.64" r="4.55" fill="#fff"/><circle cx="211.21" cy="257.1" r="8.35" fill="#fff"/><circle cx="191.83" cy="239.31" r="8.9" fill="#fff"/><circle cx="151.9" cy="272.53" r="5.89" fill="#fff"/><circle cx="159.79" cy="254.01" r="6.82" fill="#fff"/><circle cx="178.9" cy="286.35" r="6.04" fill="#fff"/><circle cx="120.08" cy="203.87" r="4.88" fill="#fff"/><circle cx="200" cy="286.4" r="6.33" fill="#fff"/><circle cx="121.62" cy="245.75" r="5.1" fill="#fff"/><circle cx="135.15" cy="216.86" r="5.89" fill="#fff"/><circle cx="201.64" cy="306.32" r="5.36" fill="#fff"/><circle cx="180.91" cy="313.7" r="4.77" fill="#fff"/><circle cx="216.1" cy="291.33" r="6" fill="#fff"/><circle cx="119.65" cy="220.71" r="5.1" fill="#fff"/><circle cx="161.75" cy="209.12" r="7.79" fill="#fff"/><circle cx="152.96" cy="221.11" r="7.08" fill="#fff"/><circle cx="173.19" cy="239.31" r="7.9" fill="#fff"/><circle cx="216.77" cy="273.88" r="7.15" fill="#fff"/><circle cx="140.67" cy="237.68" r="6.22" fill="#fff"/><circle cx="144.08" cy="202.38" r="6.33" fill="#fff"/><circle cx="234.86" cy="285.97" r="5.66" fill="#fff"/></g>
  <g opacity="0.8"><g><path d="M224.53,113.57v50.44s17.66-17.42,17.66-17.42c-6.57-9.54-12.33-20.42-17.66-33.02Z" fill="#fff"/><path d="M179.89,171.65v-55.75c-7.18,15.85-15.07,28.86-24.54,39.86,8.41,4.86,16.6,10.16,24.54,15.89Z" fill="#fff"/><path d="M273.64,178.48l-17.67,17.42,50.41.67c-12.52-5.5-23.31-11.4-32.74-18.09Z" fill="#fff"/><path d="M303.33,241.2l-55.43-.77c5.6,7.96,10.77,16.17,15.49,24.58,11.07-9.23,24.11-16.89,39.94-23.8Z" fill="#fff"/><path d="M226,212.98l40.5-39.94c-7.08-5.77-13.34-12.12-19.01-19.28l-40.54,39.98c3.48,3.2,6.88,6.48,10.21,9.86,3.02,3.07,5.97,6.2,8.84,9.39Z" fill="#fff"/><path d="M215.05,173.36l.28-39.97c.19-26.59-3.27-53.07-10.33-78.7-.58-2.11-1.16-4.25-1.75-6.43-1.06,3.74-2.11,7.38-3.16,10.93-7.75,26.19-11.69,53.35-11.88,80.66l-.26,37.82c4.22,3.27,8.36,6.67,12.41,10.18l14.7-14.49Z" fill="#fff"/><path d="M231.82,219.64c3.5,4.12,6.87,8.33,10.12,12.62l41.18.29c25.37.18,50.62-3.22,75.03-10.14,4.27-1.21,8.68-2.43,13.23-3.65h0c-2.76-.78-5.47-1.56-8.13-2.34-24.02-7.02-48.88-10.73-73.91-10.9l-42.88-.3-14.63,14.43Z" fill="#fff"/></g><path d="M284.81,350.49c-36.3-99.45-115.59-179.78-214.49-217.5,104.55,23.99,191.91,112.65,214.49,217.5h0Z" fill="#fff"/></g>
</svg>`;

/* ---- NAV ---- */
function buildNav() {
  const path = window.location.pathname.split('/').pop() || 'home.html';
  const links = [
    { href: 'home.html',     label: 'Home' },
    { href: 'people.html',    label: 'People' },
    { href: 'news.html',      label: 'News' },
    { href: 'events.html',    label: 'Events' },
    { href: 'resources.html', label: 'Resources' },
  ];
  const linkItems = links.map(l =>
    `<li><a href="${l.href}"${path === l.href ? ' class="active"' : ''}>${l.label}</a></li>`
  ).join('');

  const el = document.getElementById('nav-placeholder');
  if (!el) return;
  el.innerHTML = `
    <nav class="nav" id="nav">
      <div class="nav-inner">
        <a href="home.html" class="nav-logo">
          ${LOGO_SVG}
          <span class="nav-logo-text">ISRU UK</span>
        </a>
        <ul class="nav-links" id="navLinks">
          ${linkItems}
          <li><a href="home.html#join" class="nav-cta">Join Us</a></li>
        </ul>
        <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;

  document.getElementById('mobileToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
  });
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ---- FOOTER ---- */
function buildFooter() {
  const el = document.getElementById('footer-placeholder');
  if (!el) return;
  el.innerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          ${LOGO_SVG_WHITE}
          <p>The United Kingdom's collaborative network for In-Situ Resource Utilisation — connecting industry, academia, and government.</p>
        </div>
        <div>
          <h4>Site</h4>
          <ul>
            <li><a href="home.html">Home</a></li>
            <li><a href="people.html">People</a></li>
            <li><a href="news.html">News</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="resources.html">Resources</a></li>
          </ul>
        </div>
        <div>
          <h4>Get Involved</h4>
          <ul>
            <li><a href="home.html#join">Join Us</a></li>
            <li><a href="home.html#contact">Contact</a></li>
            <li><a href="https://www.jiscmail.ac.uk/cgi-bin/webadmin?A0=PLANETARY-ISRU" target="_blank" rel="noopener">JISCMail</a></li>
          </ul>
        </div>
        <div>
          <h4>External</h4>
          <ul>
            <li><a href="https://www.gov.uk/government/organisations/uk-space-agency" target="_blank" rel="noopener">UK Space Agency</a></li>
            <li><a href="https://www.esa.int" target="_blank" rel="noopener">ESA</a></li>
            <li><a href="mailto:uk_isru@outlook.com">uk_isru@outlook.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} ISRU UK. All rights reserved.</span>
        <span>isru.uk</span>
      </div>
    </footer>`;
}

/* ---- SCROLL ANIMATIONS ---- */
function initAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

/* ---- CSV PARSER ---- */
function parseCSV(text) {
  const rows = [];
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
  for (let i = 1; i < lines.length; i++) {
    const vals = [];
    let current = '';
    let inQuotes = false;
    for (const ch of lines[i]) {
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === ',' && !inQuotes) { vals.push(current.trim()); current = ''; }
      else { current += ch; }
    }
    vals.push(current.trim());
    if (vals.some(v => v)) {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = vals[idx] || ''; });
      rows.push(obj);
    }
  }
  return rows;
}

/* ---- CATEGORY PILL COLOURS ---- */
function categoryPill(cat) {
  const map = {
    'meeting':     'pill-blue',
    'news':        'pill-gray',
    'funding':     'pill-green',
    'international': 'pill-red',
    'outreach':    'pill-red',
  };
  const cls = map[(cat || '').toLowerCase()] || 'pill-gray';
  return `<span class="pill ${cls}">${cat}</span>`;
}

/* ---- FORMAT DATE ---- */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ---- NEWS FEED (news.html) ---- */
async function loadNewsFeed(containerId, filterBarId) {
  const container = document.getElementById(containerId);
  const filterBar = document.getElementById(filterBarId);
  if (!container) return;

  if (NEWS_SHEET_URL === 'YOUR_NEWS_SHEET_CSV_URL_HERE') {
    container.innerHTML = renderSampleNews();
    if (filterBar) setupFilters(filterBar, container);
    return;
  }

  container.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  try {
    const res = await fetch(NEWS_SHEET_URL);
    const text = await res.text();
    const rows = parseCSV(text).reverse(); // newest first
    if (!rows.length) { container.innerHTML = emptyState('No news items yet.'); return; }
    renderNews(rows, container);
    if (filterBar) setupFilters(filterBar, container);
  } catch (e) {
    container.innerHTML = `<div class="empty-state"><p>Could not load news. Please check back soon or email <a href="mailto:uk_isru@outlook.com">uk_isru@outlook.com</a>.</p></div>`;
  }
}

function renderNews(rows, container) {
  container.innerHTML = rows.map(r => `
    <article class="news-item fade-in" data-category="${(r.category||'').toLowerCase()}">
      <div class="news-meta">
        <span class="news-date">${formatDate(r.date)}</span>
        ${r.category ? categoryPill(r.category) : ''}
      </div>
      <h3 class="news-title">${r.link ? `<a href="${r.link}" target="_blank" rel="noopener">${r.title}</a>` : r.title}</h3>
      ${r.summary ? `<p class="news-summary">${r.summary}</p>` : ''}
    </article>`).join('');
  initAnimations();
}

function renderSampleNews() {
  const samples = [
    { date: '2026-04-01', category: 'Meeting', title: 'ISRU UK General Meeting — April 2026', summary: 'Quarterly general meeting featuring directorate updates and an invited talk on lunar oxygen extraction. Slides available via the JISCMail list.' },
    { date: '2026-03-15', category: 'International', title: 'ISRU UK represented at LPSC 2026', summary: 'Several ISRU UK members presented work at the 57th Lunar and Planetary Science Conference in Houston, Texas.' },
    { date: '2026-02-01', category: 'Meeting', title: 'ISRU UK General Meeting — February 2026', summary: 'Meeting notes and slides now available. Topics included the ESA LCNS programme update and a presentation on regolith simulant standards.' },
    { date: '2025-11-20', category: 'News', title: 'ISRU UK attends Space Resources Week 2025', summary: 'Members of the ISRU UK network attended Space Resources Week in Luxembourg, presenting current UK capabilities and engaging with the international community.' },
  ];
  return samples.map(r => `
    <article class="news-item fade-in" data-category="${r.category.toLowerCase()}">
      <div class="news-meta">
        <span class="news-date">${formatDate(r.date)}</span>
        ${categoryPill(r.category)}
      </div>
      <h3 class="news-title">${r.title}</h3>
      <p class="news-summary">${r.summary}</p>
    </article>`).join('');
}

function setupFilters(filterBar, container) {
  const categories = new Set(['all']);
  container.querySelectorAll('[data-category]').forEach(el => {
    if (el.dataset.category) categories.add(el.dataset.category);
  });
  filterBar.innerHTML = [...categories].map(cat =>
    `<button class="filter-btn${cat === 'all' ? ' active' : ''}" data-filter="${cat}">${cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}</button>`
  ).join('');
  filterBar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      container.querySelectorAll('.news-item').forEach(item => {
        item.style.display = (f === 'all' || item.dataset.category === f) ? '' : 'none';
      });
    });
  });
  initAnimations();
}

/* ---- MEETINGS FEED (events.html) ---- */
async function loadMeetingsFeed(upcomingId, pastId) {
  const upcoming = document.getElementById(upcomingId);
  const past = document.getElementById(pastId);

  if (MEETINGS_SHEET_URL === 'YOUR_MEETINGS_SHEET_CSV_URL_HERE') {
    if (upcoming) upcoming.innerHTML = renderSampleUpcoming();
    if (past) past.innerHTML = renderSamplePast();
    initAnimations();
    return;
  }
  try {
    const res = await fetch(MEETINGS_SHEET_URL);
    const text = await res.text();
    const rows = parseCSV(text);
    const now = new Date();
    const upcomingRows = rows.filter(r => new Date(r.date) >= now).sort((a,b) => new Date(a.date)-new Date(b.date));
    const pastRows = rows.filter(r => new Date(r.date) < now).sort((a,b) => new Date(b.date)-new Date(a.date));
    if (upcoming) upcoming.innerHTML = upcomingRows.length ? upcomingRows.map(meetingCard).join('') : `<p style="color:var(--gray-500)">No upcoming meetings scheduled.</p>`;
    if (past) past.innerHTML = pastRows.length ? pastRows.map(pastMeetingRow).join('') : `<p style="color:var(--gray-500)">No past meetings recorded yet.</p>`;
    initAnimations();
  } catch(e) {
    if (upcoming) upcoming.innerHTML = renderSampleUpcoming();
    if (past) past.innerHTML = renderSamplePast();
    initAnimations();
  }
}

/* Expected sheet columns: date | title | description | slides_link | recording_link | type */
function meetingCard(r) {
  return `
    <div class="meeting-card card fade-in">
      <div class="meeting-card-header">
        <div>
          <div class="meeting-date">${formatDate(r.date)}</div>
          <h3 class="meeting-title">${r.title}</h3>
          ${r.type ? categoryPill(r.type) : ''}
        </div>
      </div>
      ${r.description ? `<p class="meeting-desc">${r.description}</p>` : ''}
      <div class="meeting-links">
        ${r.slides_link ? `<a href="${r.slides_link}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">📄 Slides</a>` : ''}
        ${r.recording_link ? `<a href="${r.recording_link}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">▶ Recording</a>` : ''}
      </div>
    </div>`;
}

function pastMeetingRow(r) {
  return `
    <div class="past-meeting fade-in">
      <div class="past-meeting-date">${formatDate(r.date)}</div>
      <div class="past-meeting-info">
        <h4>${r.title}</h4>
        ${r.description ? `<p>${r.description}</p>` : ''}
        <div class="meeting-links">
          ${r.slides_link ? `<a href="${r.slides_link}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">📄 Slides</a>` : ''}
          ${r.recording_link ? `<a href="${r.recording_link}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">▶ Recording</a>` : ''}
        </div>
      </div>
    </div>`;
}

function renderSampleUpcoming() {
  return meetingCard({ date: '2026-06-03', title: 'ISRU UK General Meeting — June 2026', description: 'Bi-monthly general meeting. Directorate updates followed by invited presentation. Open to all — general public welcome in listen-only mode.', type: 'General Meeting' });
}

function renderSamplePast() {
  return [
    { date: '2026-04-01', title: 'ISRU UK General Meeting — April 2026', description: 'Invited talk: Lunar oxygen extraction technologies.', slides_link: '', recording_link: '' },
    { date: '2026-02-04', title: 'ISRU UK General Meeting — February 2026', description: 'UKSA update and presentation on regolith simulant standards.', slides_link: '', recording_link: '' },
    { date: '2025-12-03', title: 'ISRU UK General Meeting — December 2025', description: 'Year in review and planning for 2026.', slides_link: '', recording_link: '' },
  ].map(pastMeetingRow).join('');
}

function emptyState(msg) {
  return `<div class="empty-state"><p>${msg}</p></div>`;
}

/* ---- CONTACT FORM ---- */
function initContactForm() {
  const btn = document.getElementById('contactSubmit');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const name    = (document.getElementById('c-name')    || {}).value || '';
    const org     = (document.getElementById('c-org')     || {}).value || '';
    const email   = (document.getElementById('c-email')   || {}).value || '';
    const subject = (document.getElementById('c-subject') || {}).value || 'Website Enquiry';
    const message = (document.getElementById('c-message') || {}).value || '';
    const body = `Name: ${name}\nOrganisation: ${org}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:uk_isru@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  initAnimations();
  initContactForm();
});
