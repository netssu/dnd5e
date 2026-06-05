// ========== Save / Load ==========
function collectState() {
  const state = { fields: {}, attacks: attacks, habilidades: habilidades, habCanvasHeight: habCanvasHeight, spells: spells };
  document.querySelectorAll('input[name], textarea[name], select[name]').forEach(el => {
    if (el.type === 'checkbox') state.fields[el.name] = el.checked;
    else state.fields[el.name] = el.value;
  });
  return state;
}
function cssEscape(s) {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(s);
  return String(s).replace(/[^a-zA-Z0-9_-]/g, c => '\\' + c);
}
function applyState(state) {
  if (!state || typeof state !== 'object') return;
  if (state.fields) {
    Object.entries(state.fields).forEach(([name, val]) => {
      const el = document.querySelector(`[name="${cssEscape(name)}"]`);
      if (!el) return;
      if (el.type === 'checkbox') el.checked = !!val;
      else el.value = val == null ? '' : val;
    });
  }
  attacks = Array.isArray(state.attacks) ? state.attacks : [];
  habilidades = Array.isArray(state.habilidades) ? state.habilidades : [];
  habCanvasHeight = (typeof state.habCanvasHeight === 'number' && state.habCanvasHeight > 0) ? state.habCanvasHeight : 320;
  applyCanvasHeight();
  spells = (state.spells && typeof state.spells === 'object') ? state.spells : {};
  applyCharacterClassState(state.fields || {});
  ensureSpellState();
  renderAttacks();
  renderHabilidades();
  renderSpellLevels();
  // Re-trigger modifier calc
  document.querySelectorAll('.attr-box input.val').forEach(inp => inp.dispatchEvent(new Event('input')));
}

let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(collectState())); }
    catch (e) { console.warn('save failed', e); }
  }, 200);
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    applyState(JSON.parse(raw));
    return true;
  } catch (e) { console.warn('load failed', e); return false; }
}

// Wire all inputs to save
function wireSave() {
  document.querySelectorAll('input[name], textarea[name], select[name]').forEach(el => {
    const evt = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(evt, save);
  });
}
