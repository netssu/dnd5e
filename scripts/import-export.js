// ========== Export / Import ==========
document.getElementById('btn-export').addEventListener('click', () => {
  const state = collectState();
  const nome = (state.fields.nome_personagem || 'personagem').replace(/[^\w-]+/g, '_');
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ficha_${nome}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Ficha exportada');
});

document.getElementById('btn-import').addEventListener('click', () => {
  document.getElementById('file-import').click();
});
document.getElementById('file-import').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result);
      applyState(data);
      save();
      toast('Ficha importada');
    } catch (err) {
      toast('Erro ao importar JSON');
    }
  };
  r.readAsText(file);
  e.target.value = '';
});

document.getElementById('btn-clear').addEventListener('click', () => {
  if (!confirm('Apagar todos os dados da ficha? Esta ação não pode ser desfeita.')) return;
  localStorage.removeItem(STORAGE_KEY);
  attacks = [];
  habilidades = [];
  habCanvasHeight = 320;
  classFeatureUsage = {};
  spells = {};
  SPELL_LEVELS.forEach(l => spells[l.lvl] = []);
  ensureSpellState();
  document.querySelectorAll('input[name], textarea[name], select[name]').forEach(el => {
    if (el.type === 'checkbox') el.checked = false;
    else el.value = '';
  });
  const characterClass = document.getElementById('character-class');
  if (characterClass) characterClass.value = 'custom';
  const characterClassLevel = document.getElementById('character-class-level');
  if (characterClassLevel) characterClassLevel.value = '1';
  const customClassName = document.getElementById('character-custom-class');
  if (customClassName) customClassName.value = '';
  syncSpellClassMirror();
  renderAttacks();
  renderHabilidades();
  if (typeof renderClassFeatures === 'function') renderClassFeatures();
  renderSpellLevels();
  document.querySelectorAll('.attr-box input.val').forEach(inp => inp.dispatchEvent(new Event('input')));
  toast('Ficha limpa');
});
