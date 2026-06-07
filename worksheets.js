// Worksheet colours & emojis by subject
const SUBJECT_META = {
  'Math':    { emoji: '🔢', bg: '#FFF0E8', badge: 'badge-Math' },
  'English': { emoji: '📚', bg: '#F0EEFF', badge: 'badge-English' },
  'Bengali': { emoji: '🌿', bg: '#FFF0FA', badge: 'badge-Bengali' },
  'Science': { emoji: '🔬', bg: '#E6FBF5', badge: 'badge-Science' },
  'Logic':   { emoji: '🧩', bg: '#FFFBF0', badge: 'badge-Logic' },
};

let allWorksheets = [];
let activeFilter = 'All';

async function loadWorksheets() {
  try {
    const res = await fetch('worksheets/data.json');
    if (!res.ok) throw new Error('Could not load worksheets');
    allWorksheets = await res.json();
    checkURLParam();
    render();
  } catch (err) {
    document.getElementById('ws-grid').innerHTML =
      '<div class="ws-empty"><span>😔</span>Could not load worksheets. Please try again later.</div>';
  }
}

function checkURLParam() {
  const params = new URLSearchParams(window.location.search);
  const subject = params.get('subject');
  if (subject && SUBJECT_META[subject]) {
    activeFilter = subject;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.subject === subject);
    });
  }
}

function filtered() {
  if (activeFilter === 'All') return allWorksheets;
  return allWorksheets.filter(ws => ws.subject === activeFilter);
}

function render() {
  const list = filtered();
  const grid = document.getElementById('ws-grid');
  const countEl = document.getElementById('ws-count');

  countEl.textContent = `${list.length} worksheet${list.length !== 1 ? 's' : ''} available`;

  if (list.length === 0) {
    grid.innerHTML = '<div class="ws-empty"><span>🔍</span>No worksheets found for this subject yet — check back soon!</div>';
    return;
  }

  grid.innerHTML = list.map(ws => card(ws)).join('');
}

function card(ws) {
  const meta = SUBJECT_META[ws.subject] || { emoji: '📄', bg: '#F5F5F5', badge: '' };
  const hasFile = ws.file && ws.file !== '';
  const tags = (ws.tags || []).slice(0, 3).map(t => `<span class="ws-tag">${t}</span>`).join('');
  const thumb = ws.thumbnail
    ? `<img src="${ws.thumbnail}" alt="${ws.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"/><div class="ws-thumb-placeholder" style="display:none; background:${meta.bg}">${meta.emoji}</div>`
    : `<div class="ws-thumb-placeholder" style="background:${meta.bg}">${meta.emoji}</div>`;

  const btnHtml = hasFile
    ? `<a class="ws-download-btn" href="${ws.file}" download target="_blank" rel="noopener"><span class="btn-icon">⬇️</span> Download PDF</a>`
    : `<button class="ws-download-btn disabled">Coming Soon</button>`;

  return `
    <div class="ws-card">
      <div class="ws-thumb" style="background:${meta.bg}">
        ${thumb}
        <span class="ws-subject-badge ${meta.badge}">${ws.subject}</span>
        ${ws.pages ? `<span class="ws-pages-badge">${ws.pages}p</span>` : ''}
      </div>
      <div class="ws-body">
        <div class="ws-world">${ws.world || ws.class || 'Class 1'}</div>
        <h3 class="ws-title">${ws.title}</h3>
        <p class="ws-desc">${ws.description}</p>
        ${tags ? `<div class="ws-tags">${tags}</div>` : ''}
        ${btnHtml}
      </div>
    </div>
  `;
}

// Filter buttons
document.getElementById('ws-filters').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  activeFilter = btn.dataset.subject;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();

  // Update URL without reload
  const url = new URL(window.location);
  if (activeFilter === 'All') url.searchParams.delete('subject');
  else url.searchParams.set('subject', activeFilter);
  history.replaceState(null, '', url);
});

loadWorksheets();
