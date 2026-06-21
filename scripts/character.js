// ========== Tabs ==========
document.querySelectorAll('nav.tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('nav.tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ========== Attribute modifier calculation ==========
function calcMod(val) {
  if (val === '' || val === null || isNaN(val)) return 0;
  return Math.floor((parseInt(val) - 10) / 2);
}
function fmtMod(m) { return (m >= 0 ? '+' : '') + m; }

document.querySelectorAll('.attr-box').forEach(box => {
  const input = box.querySelector('input.val');
  const modEl = box.querySelector('[data-mod]');
  const update = () => { modEl.textContent = fmtMod(calcMod(input.value)); };
  input.addEventListener('input', () => { update(); save(); });
  update();
});

function enhanceSkillRowsWithExpertise() {
  document.querySelectorAll('.skills-card .row').forEach(row => {
    const profInp = row.querySelector('input[type="checkbox"][name$="_p"]');
    if (!profInp) return;
    const base = profInp.name.replace(/_p$/, '');
    if (row.querySelector('[name="' + base + '_e"]')) return;

    const label = document.createElement('label');
    label.className = 'skill-expertise';
    label.title = 'Expertise (dobra o bônus de proficiência)';

    const expInp = document.createElement('input');
    expInp.type = 'checkbox';
    expInp.name = base + '_e';
    expInp.setAttribute('aria-label', 'Expertise em ' + base.replace(/^sk_/, '').replace(/_/g, ' '));

    const badge = document.createElement('span');
    badge.textContent = 'E';

    label.appendChild(expInp);
    label.appendChild(badge);
    profInp.insertAdjacentElement('afterend', label);
  });
}

function syncExpertiseState(base) {
  const profInp = document.querySelector('[name="' + base + '_p"]');
  const expInp = document.querySelector('[name="' + base + '_e"]');
  if (!profInp || !expInp) return false;
  if (!profInp.checked && expInp.checked) expInp.checked = false;
  expInp.disabled = !profInp.checked;
  return !!expInp.checked;
}

enhanceSkillRowsWithExpertise();

// ========== Auto-fill skills & saves ==========
const SKILL_ATTR_MAP = {
  sv_forca: 'attr_forca',
  sv_destreza: 'attr_destreza',
  sv_constituicao: 'attr_constituicao',
  sv_inteligencia: 'attr_inteligencia',
  sv_sabedoria: 'attr_sabedoria',
  sv_carisma: 'attr_carisma',
  sk_acrobacia: 'attr_destreza',
  sk_arcanismo: 'attr_inteligencia',
  sk_atletismo: 'attr_forca',
  sk_atuacao: 'attr_carisma',
  sk_enganacao: 'attr_carisma',
  sk_furtividade: 'attr_destreza',
  sk_historia: 'attr_inteligencia',
  sk_intimidacao: 'attr_carisma',
  sk_intuicao: 'attr_sabedoria',
  sk_investigacao: 'attr_inteligencia',
  sk_animais: 'attr_sabedoria',
  sk_medicina: 'attr_sabedoria',
  sk_natureza: 'attr_inteligencia',
  sk_percepcao: 'attr_sabedoria',
  sk_persuasao: 'attr_carisma',
  sk_prestidigitacao: 'attr_destreza',
  sk_religiao: 'attr_inteligencia',
  sk_sobrevivencia: 'attr_sabedoria',
};

function getProfBonus() {
  const inp = document.querySelector('[name="prof_bonus"]');
  const v = inp ? parseInt(inp.value) : 0;
  return isNaN(v) ? 0 : v;
}

function recalcDerived() {
  const profBonus = getProfBonus();
  Object.entries(SKILL_ATTR_MAP).forEach(([base, attrName]) => {
    const attrInp = document.querySelector('[name="' + attrName + '"]');
    const profInp = document.querySelector('[name="' + base + '_p"]');
    const valInp = document.querySelector('[name="' + base + '_v"]');
    if (!attrInp || !profInp || !valInp) return;
    if (attrInp.value === '' || attrInp.value === null) return; // don't write if no attribute set
    const mod = calcMod(attrInp.value);
    const expertise = syncExpertiseState(base);
    const total = mod + (profInp.checked ? profBonus * (expertise ? 2 : 1) : 0);
    valInp.value = total;
  });
}

// Wire triggers
document.querySelectorAll('.attr-box input.val').forEach(inp => {
  inp.addEventListener('input', () => { recalcDerived(); save(); });
});
Object.keys(SKILL_ATTR_MAP).forEach(base => {
  const cb = document.querySelector('[name="' + base + '_p"]');
  if (cb) cb.addEventListener('change', () => { recalcDerived(); save(); });
  const exp = document.querySelector('[name="' + base + '_e"]');
  if (exp) exp.addEventListener('change', () => { recalcDerived(); save(); });
});
const _profInp = document.querySelector('[name="prof_bonus"]');
if (_profInp) _profInp.addEventListener('input', () => { recalcDerived(); save(); });
