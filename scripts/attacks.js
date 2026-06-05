// ========== Attacks ==========
function renderAttacks() {
  const tbody = document.getElementById('attacks-body');
  tbody.innerHTML = '';
  attacks.forEach((a, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" data-atk-i="${i}" data-atk-k="nome" value="${escapeHtml(a.nome||'')}"></td>
      <td><input type="text" data-atk-i="${i}" data-atk-k="bonus" value="${escapeHtml(a.bonus||'')}"></td>
      <td><input type="text" data-atk-i="${i}" data-atk-k="dano" value="${escapeHtml(a.dano||'')}"></td>
      <td class="act"><button class="icon-btn del" data-del-atk="${i}" title="Remover">✕</button></td>
    `;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', e => {
      const i = parseInt(e.target.dataset.atkI);
      const k = e.target.dataset.atkK;
      attacks[i][k] = e.target.value;
      save();
    });
  });
  tbody.querySelectorAll('[data-del-atk]').forEach(btn => {
    btn.addEventListener('click', e => {
      attacks.splice(parseInt(e.target.dataset.delAtk), 1);
      renderAttacks();
      save();
    });
  });
}
document.getElementById('add-attack').addEventListener('click', () => {
  attacks.push({ nome: '', bonus: '', dano: '' });
  renderAttacks();
  save();
});
