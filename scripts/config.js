const STORAGE_KEY = 'dnd5e_ficha_v1';

const SPELL_LEVELS = [
  { lvl: 0, name: 'Truques', sub: 'Cantrips — sempre conhecidos' },
  { lvl: 1, name: 'Magias de 1º Círculo' },
  { lvl: 2, name: 'Magias de 2º Círculo' },
  { lvl: 3, name: 'Magias de 3º Círculo' },
  { lvl: 4, name: 'Magias de 4º Círculo' },
  { lvl: 5, name: 'Magias de 5º Círculo' },
  { lvl: 6, name: 'Magias de 6º Círculo' },
  { lvl: 7, name: 'Magias de 7º Círculo' },
  { lvl: 8, name: 'Magias de 8º Círculo' },
  { lvl: 9, name: 'Magias de 9º Círculo' },
];

// ========== Icons (inline SVG) ==========
const ICONS = {
  time: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  range: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>',
  comp: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 6.6L21 9l-5 4.6 1.4 7L12 16.8 6.6 20.6 8 13.6 3 9l6.6-0.4z"/></svg>',
  duration: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3h14M5 21h14M7 3l5 9 5-9M7 21l5-9 5 9"/></svg>',
};

// ========== State (dynamic lists) ==========
let attacks = [];
let habilidades = [];
let habCanvasHeight = 320;
let spells = {}; // { 0: [...], 1: [...], ... }
SPELL_LEVELS.forEach(l => spells[l.lvl] = []);
