// ========== Habilidades (free-form canvas) ==========
const HAB_DEFAULT_W = 290, HAB_DEFAULT_H = 200, HAB_GAP = 14;

function autoPlace(idx, canvasWidth) {
  const cols = Math.max(1, Math.floor((canvasWidth - HAB_GAP) / (HAB_DEFAULT_W + HAB_GAP)));
  return {
    x: HAB_GAP + (idx % cols) * (HAB_DEFAULT_W + HAB_GAP),
    y: HAB_GAP + Math.floor(idx / cols) * (HAB_DEFAULT_H + HAB_GAP)
  };
}

function resizeCanvas() {
  const canvas = document.getElementById('habilidades-canvas');
  if (!canvas) return;
  let maxBottom = 220;
  habilidades.forEach(h => {
    const y = (typeof h.y === 'number') ? h.y : 0;
    const ht = (typeof h.h === 'number') ? h.h : HAB_DEFAULT_H;
    if (y + ht + HAB_GAP > maxBottom) maxBottom = y + ht + HAB_GAP;
  });
  // Always keep enough scrollable space for cards, but don't shrink the user's manual height
  canvas.style.minHeight = maxBottom + 'px';
}

// Apply saved canvas height (set by user dragging the resize handle)
function applyCanvasHeight() {
  const canvas = document.getElementById('habilidades-canvas');
  if (!canvas) return;
  if (typeof habCanvasHeight === 'number' && habCanvasHeight > 0) {
    canvas.style.height = habCanvasHeight + 'px';
  }
}

// Watch for user resize via the native resize handle and persist
let _canvasResizeObserver = null;
function watchCanvasResize() {
  const canvas = document.getElementById('habilidades-canvas');
  if (!canvas || _canvasResizeObserver) return;
  if (typeof ResizeObserver === 'undefined') return;
  let lastH = canvas.offsetHeight;
  _canvasResizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const nh = Math.round(entry.contentRect.height);
      if (Math.abs(nh - lastH) > 2) {
        lastH = nh;
        habCanvasHeight = nh;
        save();
      }
    }
  });
  _canvasResizeObserver.observe(canvas);
}

function renderHabilidades() {
  const canvas = document.getElementById('habilidades-canvas');
  if (!canvas) return;
  canvas.innerHTML = '';
  const cw = canvas.clientWidth || 800;
  habilidades.forEach((h, i) => {
    let x = (typeof h.x === 'number') ? h.x : null;
    let y = (typeof h.y === 'number') ? h.y : null;
    if (x === null || y === null) {
      const p = autoPlace(i, cw);
      x = p.x; y = p.y;
    }
    const w = (typeof h.w === 'number') ? h.w : HAB_DEFAULT_W;
    const ht = (typeof h.h === 'number') ? h.h : HAB_DEFAULT_H;
    const card = document.createElement('div');
    card.className = 'habilidade-card';
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.style.width = w + 'px';
    card.style.height = ht + 'px';
    card.dataset.habIdx = i;
    card.innerHTML = `
      <div class="top-row">
        <span class="drag-handle" title="Arrastar">⋮⋮</span>
        <input type="text" class="title-input" placeholder="Título da habilidade" data-hab-i="${i}" data-hab-k="titulo" value="${escapeHtml(h.titulo||'')}">
        <button class="icon-btn del" data-del-hab="${i}" title="Remover habilidade">✕</button>
      </div>
      <textarea placeholder="Descrição..." data-hab-i="${i}" data-hab-k="descricao">${escapeHtml(h.descricao||'')}</textarea>
      <div class="resize-handle" title="Redimensionar"></div>
    `;
    canvas.appendChild(card);
  });

  // Wire text inputs
  canvas.querySelectorAll('[data-hab-i]').forEach(inp => {
    inp.addEventListener('input', e => {
      const i = parseInt(e.target.dataset.habI);
      const k = e.target.dataset.habK;
      habilidades[i][k] = e.target.value;
      save();
    });
  });
  // Delete
  canvas.querySelectorAll('[data-del-hab]').forEach(btn => {
    btn.addEventListener('click', e => {
      habilidades.splice(parseInt(e.currentTarget.dataset.delHab), 1);
      renderHabilidades();
      save();
    });
  });
  // Drag from the whole top-row (skips inputs/buttons via startDrag check)
  canvas.querySelectorAll('.habilidade-card').forEach(card => {
    const topRow = card.querySelector('.top-row');
    topRow.addEventListener('pointerdown', startDrag);
    const resize = card.querySelector('.resize-handle');
    resize.addEventListener('pointerdown', startResize);
  });

  resizeCanvas();
}

// Global drag/resize state — document-level events for reliability
let _drag = null;

function startDrag(e) {
  // Skip if clicking on interactive children (input, button, textarea)
  if (e.target.closest('input, textarea, button, .resize-handle')) return;
  // Only left mouse button
  if (e.button !== undefined && e.button !== 0) return;
  e.preventDefault();
  const card = e.currentTarget.closest('.habilidade-card');
  if (!card) return;
  const canvas = document.getElementById('habilidades-canvas');
  _drag = {
    type: 'move',
    card,
    canvas,
    idx: parseInt(card.dataset.habIdx),
    startX: e.clientX,
    startY: e.clientY,
    startLeft: card.offsetLeft,
    startTop: card.offsetTop,
    startScrollTop: canvas.scrollTop,
    startScrollLeft: canvas.scrollLeft
  };
  card.classList.add('dragging');
}

function startResize(e) {
  if (e.button !== undefined && e.button !== 0) return;
  e.preventDefault();
  e.stopPropagation();
  const card = e.currentTarget.closest('.habilidade-card');
  if (!card) return;
  const canvas = document.getElementById('habilidades-canvas');
  _drag = {
    type: 'resize',
    card,
    canvas,
    idx: parseInt(card.dataset.habIdx),
    startX: e.clientX,
    startY: e.clientY,
    startW: card.offsetWidth,
    startH: card.offsetHeight,
    startScrollTop: canvas.scrollTop,
    startScrollLeft: canvas.scrollLeft
  };
}

function onPointerMove(e) {
  if (!_drag) return;
  e.preventDefault();
  const { type, card, canvas } = _drag;
  // Compensate for any canvas scrolling that happened mid-drag
  const scrollDX = canvas.scrollLeft - _drag.startScrollLeft;
  const scrollDY = canvas.scrollTop - _drag.startScrollTop;
  if (type === 'move') {
    let nx = _drag.startLeft + (e.clientX - _drag.startX) + scrollDX;
    let ny = _drag.startTop + (e.clientY - _drag.startY) + scrollDY;
    if (nx < 0) nx = 0;
    if (ny < 0) ny = 0;
    card.style.left = nx + 'px';
    card.style.top = ny + 'px';
  } else if (type === 'resize') {
    let nw = _drag.startW + (e.clientX - _drag.startX) + scrollDX;
    let nh = _drag.startH + (e.clientY - _drag.startY) + scrollDY;
    if (nw < 200) nw = 200;
    if (nh < 140) nh = 140;
    card.style.width = nw + 'px';
    card.style.height = nh + 'px';
  }
}

function onPointerUp(e) {
  if (!_drag) return;
  const { type, card, idx } = _drag;
  card.classList.remove('dragging');
  if (type === 'move') {
    habilidades[idx].x = card.offsetLeft;
    habilidades[idx].y = card.offsetTop;
  } else if (type === 'resize') {
    habilidades[idx].w = card.offsetWidth;
    habilidades[idx].h = card.offsetHeight;
  }
  _drag = null;
  resizeCanvas();
  save();
}

// Attach document-level listeners ONCE (not per card)
document.addEventListener('pointermove', onPointerMove);
document.addEventListener('pointerup', onPointerUp);
document.addEventListener('pointercancel', onPointerUp);

document.getElementById('add-habilidade').addEventListener('click', () => {
  // Place new card at auto position for the new index
  const canvas = document.getElementById('habilidades-canvas');
  const cw = canvas ? canvas.clientWidth : 800;
  const pos = autoPlace(habilidades.length, cw);
  habilidades.push({ titulo: '', descricao: '', x: pos.x, y: pos.y, w: HAB_DEFAULT_W, h: HAB_DEFAULT_H });
  renderHabilidades();
  save();
  // focus the new title input
  const inputs = document.querySelectorAll('#habilidades-canvas .title-input');
  if (inputs.length) inputs[inputs.length - 1].focus();
});

// Re-render on window resize so auto-placed cards reflow
window.addEventListener('resize', () => {
  // Only reflow if some cards are unplaced; placed cards keep their position
  // We still call render to update canvas height
  renderHabilidades();
});
