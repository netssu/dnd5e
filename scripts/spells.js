// ========== Spells ==========
const OFFICIAL_SPELLS = Array.isArray(window.SPELL_COMPENDIUM) ? window.SPELL_COMPENDIUM : [];
const SPELL_CLASS_LABELS_LOCAL = window.SPELL_CLASS_LABELS || {};
const SPELL_CLASS_ORDER = ['barbaro', 'bardo', 'bruxo', 'clerigo', 'druida', 'feiticeiro', 'guerreiro', 'ladino', 'mago', 'monge', 'paladino', 'ranger'];
const FULL_CASTER_CLASSES = new Set(['bardo', 'clerigo', 'druida', 'feiticeiro', 'mago']);
const NON_CASTER_CLASSES = new Set(['barbaro', 'guerreiro', 'ladino', 'monge']);
const CLASS_DISPLAY_LABELS = {
  barbaro: 'Bárbaro',
  bardo: 'Bardo',
  bruxo: 'Bruxo',
  clerigo: 'Clérigo',
  druida: 'Druida',
  feiticeiro: 'Feiticeiro',
  guerreiro: 'Guerreiro',
  ladino: 'Ladino',
  mago: 'Mago',
  monge: 'Monge',
  paladino: 'Paladino',
  ranger: 'Patrulheiro',
};
const SPELL_CLASS_ALIASES = {
  barbaro: 'barbaro',
  barbarian: 'barbaro',
  bardo: 'bardo',
  bard: 'bardo',
  bruxo: 'bruxo',
  warlock: 'bruxo',
  clerigo: 'clerigo',
  cleric: 'clerigo',
  druida: 'druida',
  druid: 'druida',
  feiticeiro: 'feiticeiro',
  sorcerer: 'feiticeiro',
  guerreiro: 'guerreiro',
  fighter: 'guerreiro',
  ladino: 'ladino',
  rogue: 'ladino',
  mago: 'mago',
  wizard: 'mago',
  monge: 'monge',
  monk: 'monge',
  paladino: 'paladino',
  paladin: 'paladino',
  ranger: 'ranger',
  patrulheiro: 'ranger',
  custom: 'custom',
  customizada: 'custom',
  customizado: 'custom',
  personalizada: 'custom',
  personalizado: 'custom'
};

function normalizeText(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function initSpellControls() {
  const select = document.getElementById('character-class');
  if (select) {
    select.innerHTML = [
      '<option value="custom">Classe customizada</option>',
      ...SPELL_CLASS_ORDER.map(cls => `<option value="${cls}">${escapeHtml(CLASS_DISPLAY_LABELS[cls] || SPELL_CLASS_LABELS_LOCAL[cls] || cls)}</option>`)
    ].join('');
    select.value = 'custom';
    select.addEventListener('change', () => {
      syncSpellClassMirror();
      renderSpellLevels();
      save();
    });
  }
  const lvl = document.getElementById('character-class-level');
  if (lvl) {
    lvl.addEventListener('input', () => {
      syncSpellClassMirror();
      renderSpellLevels();
      save();
    });
  }
  const customName = document.getElementById('character-custom-class');
  if (customName) customName.addEventListener('input', () => {
    syncSpellClassMirror();
    renderSpellSummary();
    save();
  });
  const search = document.getElementById('spell-search');
  if (search) search.addEventListener('input', () => { renderSpellLevels(); save(); });
  const hideUnprepared = document.getElementById('spell-hide-unprepared');
  if (hideUnprepared) hideUnprepared.addEventListener('change', () => { renderSpellLevels(); save(); });
  syncSpellClassMirror();
}

function getNormalizedSpellClass(rawValue) {
  const raw = normalizeText(rawValue);
  if (!raw) return null;
  if (SPELL_CLASS_ALIASES[raw]) return SPELL_CLASS_ALIASES[raw];
  const words = raw.split(' ');
  for (const word of words) {
    if (SPELL_CLASS_ALIASES[word]) return SPELL_CLASS_ALIASES[word];
  }
  const found = Object.keys(SPELL_CLASS_ALIASES).find(alias => raw.includes(alias));
  return found ? SPELL_CLASS_ALIASES[found] : null;
}

function extractClassLevel(rawValue) {
  const match = String(rawValue || '').match(/\b(20|1[0-9]|[1-9])\b/);
  return match ? parseInt(match[1], 10) : null;
}

function normalizeSpellClassInput(rawValue) {
  const select = document.getElementById('character-class');
  if (!select) return;
  const normalized = getNormalizedSpellClass(rawValue || select.value);
  select.value = normalized || select.value || 'custom';
  syncSpellClassMirror();
}

function applyCharacterClassState(fields = {}) {
  const select = document.getElementById('character-class');
  const lvl = document.getElementById('character-class-level');
  const customName = document.getElementById('character-custom-class');
  if (select) {
    const source = fields.classe_personagem || fields.m_classe || fields.classe_nivel || select.value;
    select.value = getNormalizedSpellClass(source) || select.value || 'custom';
  }
  if (lvl) {
    const sourceLevel = fields.nivel_classe || fields.m_nivel_classe || extractClassLevel(fields.classe_nivel) || lvl.value || 1;
    const value = Math.max(1, Math.min(20, parseInt(sourceLevel, 10) || 1));
    lvl.value = value;
  }
  if (customName && fields.classe_custom_nome == null && fields.classe_nivel && getSelectedSpellClass() === 'custom') {
    customName.value = String(fields.classe_nivel)
      .replace(/\b(20|1[0-9]|[1-9])\b/i, '')
      .replace(/\b(n.vel|nivel|level)\b/ig, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  syncSpellClassMirror();
}

function getCharacterClassLabel() {
  const cls = getSelectedSpellClass();
  if (isOfficialSpellClass(cls)) return SPELL_CLASS_LABELS_LOCAL[cls] || cls;
  const customName = document.getElementById('character-custom-class');
  return (customName && customName.value.trim()) || 'Classe customizada';
}

function syncSpellClassMirror() {
  const cls = getSelectedSpellClass();
  const customName = document.getElementById('character-custom-class');
  if (customName) customName.hidden = cls !== 'custom';
  const classDisplay = document.getElementById('spell-class-display');
  if (classDisplay) classDisplay.textContent = getCharacterClassLabel();
  const levelDisplay = document.getElementById('spell-level-display');
  if (levelDisplay) levelDisplay.textContent = getClassLevel();
}

function ensureSpellState() {
  SPELL_LEVELS.forEach(l => { if (!Array.isArray(spells[l.lvl])) spells[l.lvl] = []; });
  if (!spells._slots || typeof spells._slots !== 'object' || Array.isArray(spells._slots)) spells._slots = {};
  if (!spells._prepared || typeof spells._prepared !== 'object' || Array.isArray(spells._prepared)) spells._prepared = {};
}

function getSelectedSpellClass() {
  const select = document.getElementById('character-class');
  return select && select.value ? select.value : 'custom';
}

function isOfficialSpellClass(cls) {
  return SPELL_CLASS_ORDER.includes(cls);
}

function getClassLevel() {
  const inp = document.getElementById('character-class-level');
  const value = inp ? parseInt(inp.value, 10) : 1;
  if (isNaN(value)) return 1;
  return Math.max(1, Math.min(20, value));
}

function allowedSpellLevelsForClass(cls, classLevel) {
  const allowed = new Set();
  // Classes não-conjuradoras: nenhum círculo de magia disponível
  if (NON_CASTER_CLASSES.has(cls)) {
    return allowed;
  }
  if (!isOfficialSpellClass(cls)) {
    SPELL_LEVELS.forEach(l => allowed.add(l.lvl));
    return allowed;
  }
  if (cls === 'paladino' || cls === 'ranger') {
    if (classLevel < 2) return allowed;
    const max = classLevel >= 17 ? 5 : classLevel >= 13 ? 4 : classLevel >= 9 ? 3 : classLevel >= 5 ? 2 : 1;
    for (let i = 1; i <= max; i++) allowed.add(i);
    return allowed;
  }
  allowed.add(0);
  if (cls === 'bruxo') {
    const pactMax = classLevel >= 9 ? 5 : Math.max(1, Math.ceil(classLevel / 2));
    for (let i = 1; i <= pactMax; i++) allowed.add(i);
    if (classLevel >= 11) allowed.add(6);
    if (classLevel >= 13) allowed.add(7);
    if (classLevel >= 15) allowed.add(8);
    if (classLevel >= 17) allowed.add(9);
    return allowed;
  }
  if (FULL_CASTER_CLASSES.has(cls)) {
    const max = Math.min(9, Math.ceil(classLevel / 2));
    for (let i = 1; i <= max; i++) allowed.add(i);
  }
  return allowed;
}

function getSpellSearch() {
  const input = document.getElementById('spell-search');
  return normalizeText(input ? input.value : '');
}

function shouldHideUnprepared() {
  const input = document.getElementById('spell-hide-unprepared');
  return !!(input && input.checked);
}

function spellMatchesQuery(sp, query) {
  if (!query) return true;
  return normalizeText([
    sp.nome, sp.english, sp.escola, sp.tempo, sp.alcance,
    sp.componentes, sp.duracao, sp.material, sp.descricao
  ].join(' ')).includes(query);
}

function customSpellMatchesQuery(sp, query) {
  if (!query) return true;
  return normalizeText([
    sp.nome, sp.escola, sp.tempo, sp.alcance,
    sp.componentes, sp.duracao, sp.material, sp.descricao
  ].join(' ')).includes(query);
}

function isOfficialPrepared(id) {
  ensureSpellState();
  return !!spells._prepared[id];
}

function setOfficialPrepared(id, prepared) {
  ensureSpellState();
  if (prepared) spells._prepared[id] = true;
  else delete spells._prepared[id];
}

function getVisibleSpellLevels() {
  ensureSpellState();
  const cls = getSelectedSpellClass();
  if (!isOfficialSpellClass(cls)) return SPELL_LEVELS;
  const allowed = allowedSpellLevelsForClass(cls, getClassLevel());
  return SPELL_LEVELS.filter(lv => {
    if (allowed.has(lv.lvl)) return true;
    if (spells[lv.lvl] && spells[lv.lvl].length) return true;
    const slot = spells._slots && spells._slots[lv.lvl];
    return !!(slot && (slot.total || slot.used));
  });
}

function getOfficialSpellsForLevel(lvl) {
  const cls = getSelectedSpellClass();
  if (!isOfficialSpellClass(cls)) return [];
  const allowed = allowedSpellLevelsForClass(cls, getClassLevel());
  if (!allowed.has(lvl)) return [];
  const query = getSpellSearch();
  return OFFICIAL_SPELLS
    .filter(sp => sp.nivel === lvl && Array.isArray(sp.classes) && sp.classes.includes(cls))
    .filter(sp => spellMatchesQuery(sp, query));
}

function renderSpellLevels() {
  ensureSpellState();
  const container = document.getElementById('spell-levels');
  container.innerHTML = '';
  const levels = getVisibleSpellLevels();
  levels.forEach(lv => {
    const section = document.createElement('div');
    section.className = 'spell-level-section';
    const isCantrip = lv.lvl === 0;
    section.innerHTML = `
      <div class="spell-level-header">
        <div class="spell-level-title">
          <div class="level-badge">${lv.lvl}</div>
          <div>
            <div class="name">${lv.name}</div>
            ${lv.sub ? `<span class="sub">${lv.sub}</span>` : ''}
          </div>
        </div>
        ${isCantrip ? '' : `
          <div class="slot-tracker">
            <span>Total</span>
            <input type="number" data-slot-total="${lv.lvl}" value="${(spells._slots && spells._slots[lv.lvl]?.total) || ''}">
            <span>Usados</span>
            <input type="number" data-slot-used="${lv.lvl}" value="${(spells._slots && spells._slots[lv.lvl]?.used) || ''}">
          </div>
        `}
      </div>
      <div class="spell-cards" data-cards="${lv.lvl}"></div>
      <button class="add-spell-btn" data-add-spell="${lv.lvl}">+ Adicionar Magia de ${isCantrip ? 'Truque' : (lv.lvl + 'º Círculo')}</button>
    `;
    container.appendChild(section);
  });
  // Render cards
  levels.forEach(lv => renderSpellCards(lv.lvl));
  // Wire add buttons
  container.querySelectorAll('[data-add-spell]').forEach(btn => {
    btn.addEventListener('click', e => {
      const lvl = parseInt(e.target.dataset.addSpell);
      spells[lvl].push(newSpell(shouldHideUnprepared()));
      renderSpellLevels();
      save();
      const inputs = document.querySelectorAll(`[data-sp-l="${lvl}"][data-sp-k="nome"]`);
      if (inputs.length) inputs[inputs.length - 1].focus();
    });
  });
  // Wire slot inputs
  container.querySelectorAll('[data-slot-total]').forEach(inp => {
    inp.addEventListener('input', e => {
      const lvl = parseInt(e.target.dataset.slotTotal);
      if (!spells._slots) spells._slots = {};
      if (!spells._slots[lvl]) spells._slots[lvl] = {};
      spells._slots[lvl].total = e.target.value;
      save();
    });
  });
  container.querySelectorAll('[data-slot-used]').forEach(inp => {
    inp.addEventListener('input', e => {
      const lvl = parseInt(e.target.dataset.slotUsed);
      if (!spells._slots) spells._slots = {};
      if (!spells._slots[lvl]) spells._slots[lvl] = {};
      spells._slots[lvl].used = e.target.value;
      save();
    });
  });
  renderSpellSummary();
}

function newSpell(preparada = false) {
  return {
    nome: '', escola: '', tempo: '', alcance: '',
    componentes: '', duracao: '', material: '',
    descricao: '', preparada
  };
}

function officialSpellCard(sp) {
  const prepared = isOfficialPrepared(sp.id);
  return {
    type: 'official',
    name: sp.nome || '',
    prepared,
    spell: sp
  };
}

function customSpellCard(sp, i, lvl) {
  return {
    type: 'custom',
    name: sp.nome || '',
    prepared: !!sp.preparada,
    spell: sp,
    index: i,
    lvl
  };
}

function renderSpellCards(lvl) {
  const wrap = document.querySelector(`[data-cards="${lvl}"]`);
  if (!wrap) return;
  wrap.innerHTML = '';
  const query = getSpellSearch();
  const officialCards = getOfficialSpellsForLevel(lvl).map(officialSpellCard);
  const customCards = spells[lvl]
    .map((sp, i) => customSpellCard(sp, i, lvl))
    .filter(card => customSpellMatchesQuery(card.spell, query));
  const hideUnprepared = shouldHideUnprepared();
  const cards = officialCards.concat(customCards).filter(card => !hideUnprepared || card.prepared).sort((a, b) => {
    if (a.prepared !== b.prepared) return a.prepared ? -1 : 1;
    if (a.type !== b.type) return a.type === 'official' ? -1 : 1;
    return a.name.localeCompare(b.name, 'pt-BR');
  });
  if (!cards.length) {
    const empty = document.createElement('div');
    empty.className = 'spell-empty';
    empty.textContent = hideUnprepared ? 'Nenhuma magia preparada neste círculo.' : 'Nenhuma magia neste círculo.';
    wrap.appendChild(empty);
    return;
  }
  cards.forEach(cardData => {
    if (cardData.type === 'official') renderOfficialSpellCard(wrap, cardData.spell);
    else renderCustomSpellCard(wrap, cardData.spell, cardData.index, lvl);
  });
  wireRenderedCustomSpellCards(wrap);
}

function renderOfficialSpellCard(wrap, sp) {
  const prepared = isOfficialPrepared(sp.id);
  const card = document.createElement('div');
  card.className = 'spell-card official' + (prepared ? ' prepared' : '');
  card.innerHTML = `
    <div class="spell-card-top">
      <div class="spell-card-title">
        <div class="spell-name-display">${escapeHtml(sp.nome || '')}</div>
        <div class="spell-school-display">${escapeHtml(sp.escola || '')}${sp.english ? ` · ${escapeHtml(sp.english)}` : ''}</div>
      </div>
      <span class="spell-origin">Oficial</span>
    </div>
    <div class="spell-meta">
      <div class="spell-meta-item">${ICONS.time}<input type="text" readonly value="${escapeHtml(sp.tempo || '')}"></div>
      <div class="spell-meta-item">${ICONS.range}<input type="text" readonly value="${escapeHtml(sp.alcance || '')}"></div>
      <div class="spell-meta-item">${ICONS.comp}<input type="text" readonly value="${escapeHtml(sp.componentes || '')}"></div>
      <div class="spell-meta-item">${ICONS.duration}<input type="text" readonly value="${escapeHtml(sp.duracao || '')}"></div>
    </div>
    ${sp.material ? `
      <div class="material-row">
        <span class="lbl">Material:</span>
        <input type="text" readonly value="${escapeHtml(sp.material)}">
      </div>
    ` : ''}
    <details class="spell-description">
      <summary>Descrição</summary>
      <div class="desc-body">${escapeHtml(sp.descricao || '')}</div>
    </details>
    <div class="card-actions">
      <button class="btn prepare-btn ${prepared ? 'active' : ''}" data-prepare-official="${escapeHtml(sp.id)}">${prepared ? 'Preparada' : 'Preparar'}</button>
    </div>
  `;
  wrap.appendChild(card);
  card.querySelector('[data-prepare-official]').addEventListener('click', e => {
    const id = e.currentTarget.dataset.prepareOfficial;
    setOfficialPrepared(id, !isOfficialPrepared(id));
    renderSpellLevels();
    save();
  });
}

function renderCustomSpellCard(wrap, sp, i, lvl) {
    const card = document.createElement('div');
    card.className = 'spell-card custom-spell' + (sp.preparada ? ' prepared' : '');
    card.innerHTML = `
      <div class="spell-card-top">
        <input type="text" class="name-input" placeholder="Nome da Magia" data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="nome" value="${escapeHtml(sp.nome)}">
        <input type="text" class="school-input" placeholder="escola, nível" data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="escola" value="${escapeHtml(sp.escola)}">
        <span class="spell-origin">Personalizada</span>
      </div>
      <div class="spell-meta">
        <div class="spell-meta-item">${ICONS.time}<input type="text" placeholder="Tempo de Conj." data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="tempo" value="${escapeHtml(sp.tempo)}"></div>
        <div class="spell-meta-item">${ICONS.range}<input type="text" placeholder="Alcance" data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="alcance" value="${escapeHtml(sp.alcance)}"></div>
        <div class="spell-meta-item">${ICONS.comp}<input type="text" placeholder="V, S, M" data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="componentes" value="${escapeHtml(sp.componentes)}"></div>
        <div class="spell-meta-item">${ICONS.duration}<input type="text" placeholder="Duração" data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="duracao" value="${escapeHtml(sp.duracao)}"></div>
      </div>
      <div class="material-row">
        <span class="lbl">Material:</span>
        <input type="text" placeholder="componentes materiais (opcional)" data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="material" value="${escapeHtml(sp.material)}">
      </div>
      <textarea placeholder="Descrição da magia..." data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="descricao">${escapeHtml(sp.descricao)}</textarea>
      <div class="card-actions">
        <label class="prepared-toggle">
          <input type="checkbox" data-sp-i="${i}" data-sp-l="${lvl}" data-sp-k="preparada" ${sp.preparada ? 'checked' : ''}>
          Preparada
        </label>
        <button class="icon-btn del" data-del-sp-i="${i}" data-del-sp-l="${lvl}" title="Remover magia">✕</button>
      </div>
    `;
    wrap.appendChild(card);
}

function wireRenderedCustomSpellCards(wrap) {
  // Wire inputs
  wrap.querySelectorAll('[data-sp-i]').forEach(inp => {
    const evt = inp.type === 'checkbox' ? 'change' : 'input';
    inp.addEventListener(evt, e => {
      const i = parseInt(e.target.dataset.spI);
      const l = parseInt(e.target.dataset.spL);
      const k = e.target.dataset.spK;
      spells[l][i][k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      if (k === 'preparada') {
        renderSpellCards(l);
        renderSpellSummary();
      }
      save();
    });
  });
  wrap.querySelectorAll('[data-del-sp-i]').forEach(btn => {
    btn.addEventListener('click', e => {
      const i = parseInt(e.currentTarget.dataset.delSpI);
      const l = parseInt(e.currentTarget.dataset.delSpL);
      spells[l].splice(i, 1);
      renderSpellCards(l);
      renderSpellSummary();
      save();
    });
  });
}

function renderSpellSummary() {
  const summary = document.getElementById('spell-summary');
  if (!summary) return;
  const cls = getSelectedSpellClass();
  const classLevel = getClassLevel();
  const official = isOfficialSpellClass(cls);
  const allowed = allowedSpellLevelsForClass(cls, classLevel);
  const visibleOfficial = official ? OFFICIAL_SPELLS.filter(sp => allowed.has(sp.nivel) && sp.classes.includes(cls)) : [];
  const preparedOfficial = visibleOfficial.filter(sp => isOfficialPrepared(sp.id)).length;
  const preparedCustom = SPELL_LEVELS.reduce((acc, lv) => acc + (spells[lv.lvl] || []).filter(sp => sp.preparada).length, 0);
  const hideUnprepared = shouldHideUnprepared();
  const maxLevel = allowed.size ? Math.max(...Array.from(allowed)) : 0;
  const classLabel = getCharacterClassLabel();
  const maxText = official
    ? (maxLevel ? `até ${maxLevel === 0 ? 'truques' : maxLevel + 'º círculo'}` : 'sem magias por classe')
    : 'lista manual';
  summary.innerHTML = `
    <span class="spell-chip"><strong>${escapeHtml(classLabel)}</strong></span>
    <span class="spell-chip">Nível <strong>${classLevel}</strong></span>
    <span class="spell-chip">${escapeHtml(maxText)}</span>
    <span class="spell-chip">Oficiais <strong>${visibleOfficial.length}</strong></span>
    <span class="spell-chip">Preparadas <strong>${preparedOfficial + preparedCustom}</strong></span>
    ${hideUnprepared ? '<span class="spell-chip muted">Ocultando não preparadas</span>' : ''}
    ${official ? '' : '<span class="spell-chip muted">Personalizada</span>'}
  `;
}

function escapeHtml(s) {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
