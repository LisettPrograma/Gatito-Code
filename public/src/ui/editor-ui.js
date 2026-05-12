let edPanel, edTitle, edStatus, edTabs, edPalette, edLayersBar, edTerrains;
let edCfg = null;
let activeTilesetIdx = 0;
let selectedGid = 0;
let activeTerrainName = null;
let activeObjTabIdx = 0;
let activeObjType = 'pickup';

export function initEditor() {
  edPanel = document.getElementById('editor-panel');
  edTitle = document.getElementById('ed-title');
  edStatus = document.getElementById('ed-status');
  edTabs = document.getElementById('ed-tabs');
  edPalette = document.getElementById('ed-palette');
  edLayersBar = document.getElementById('ed-layers');
  edTerrains = document.getElementById('ed-terrains');

  document.getElementById('ed-save').onclick = () => edCfg?.onSave();
  document.getElementById('ed-play').onclick = () => edCfg?.onPlay();
  document.getElementById('ed-menu').onclick = () => edCfg?.onMenu();
  document.getElementById('ed-clear').onclick = () => edCfg?.onClear();
  document.getElementById('ed-undo').onclick = () => edCfg?.onUndo();
  document.getElementById('ed-redo').onclick = () => edCfg?.onRedo();
  document.getElementById('ed-revert').onclick = () => edCfg?.onRevert();

  window.__setEditor = (cfg) => { if (!cfg) hideEditor(); else showEditor(cfg); };
  window.__setEditor_updateLayer = (name) => updateLayerHighlight(name);
  window.__setEditor_updateSelected = (gid) => { selectedGid = gid; activeTerrainName = null; highlightSelected(); highlightTerrain(); };
  window.__setEditor_updateTerrain = (name) => { activeTerrainName = name; highlightTerrain(); };
  window.__setEditor_updateMode = (mode) => {
    document.getElementById('ed-spawn').classList.toggle('active', mode === 'spawn');
  };
}

function hideEditor() {
  edPanel.style.display = 'none';
  edTabs.innerHTML = '';
  edPalette.innerHTML = '';
  edTerrains.innerHTML = '';
  document.getElementById('ed-obj-tabs').innerHTML = '';
  document.getElementById('ed-obj-palette').innerHTML = '';
  edCfg = null;
}

function showEditor(cfg) {
  edCfg = cfg;
  edPanel.style.display = 'flex';
  edTitle.textContent = `Editor — ${cfg.levelKey}`;
  edStatus.textContent = `layer: ${cfg.getLayer()}`;

  edTerrains.innerHTML = '';
  activeTerrainName = null;
  const manualBtn = document.createElement('button');
  manualBtn.textContent = 'Manual';
  manualBtn.dataset.terrain = '';
  manualBtn.addEventListener('click', () => { cfg.onTerrain(null); activeTerrainName = null; highlightTerrain(); });
  edTerrains.appendChild(manualBtn);
  cfg.terrains.forEach(t => {
    const b = document.createElement('button');
    b.textContent = t.label;
    b.dataset.terrain = t.name;
    b.addEventListener('click', () => { cfg.onTerrain(t); activeTerrainName = t.name; highlightTerrain(); });
    edTerrains.appendChild(b);
  });
  highlightTerrain();

  edTabs.innerHTML = '';
  cfg.tilesets.forEach((t, i) => {
    const b = document.createElement('button');
    b.textContent = t.name;
    b.dataset.idx = i;
    b.addEventListener('click', () => { activeTilesetIdx = i; renderPalette(); });
    edTabs.appendChild(b);
  });
  activeTilesetIdx = 0;
  renderPalette();

  edLayersBar.querySelectorAll('button').forEach(b => {
    b.onclick = () => cfg.onLayer(b.dataset.layer);
  });
  updateLayerHighlight(cfg.getLayer());

  activeObjType = 'pickup';
  activeObjTabIdx = 0;
  document.getElementById('ed-obj-type').querySelectorAll('button').forEach(b => {
    b.classList.toggle('active', b.dataset.objtype === activeObjType);
    b.onclick = () => { activeObjType = b.dataset.objtype; highlightObjType(); };
  });
  const objTabsEl = document.getElementById('ed-obj-tabs');
  objTabsEl.innerHTML = '';
  cfg.objects.forEach((o, i) => {
    const b = document.createElement('button');
    b.textContent = o.label;
    b.addEventListener('click', () => { activeObjTabIdx = i; renderObjPalette(); });
    objTabsEl.appendChild(b);
  });
  renderObjPalette();

  document.getElementById('ed-spawn').onclick = () => cfg.onSpawnMode();
}

function highlightTerrain() {
  edTerrains.querySelectorAll('button').forEach(b => {
    b.classList.toggle('active', b.dataset.terrain === (activeTerrainName ?? ''));
  });
}

function renderPalette() {
  if (!edCfg) return;
  edPalette.innerHTML = '';
  edTabs.querySelectorAll('button').forEach((b, i) =>
    b.classList.toggle('active', i === activeTilesetIdx));

  const t = edCfg.tilesets[activeTilesetIdx];
  edPalette.style.setProperty('--cols', t.cols);

  const eraser = document.createElement('div');
  eraser.className = 'ed-tile eraser';
  eraser.textContent = '✕';
  eraser.title = 'Erase (GID 0)';
  eraser.addEventListener('click', () => setSelected(0));
  edPalette.appendChild(eraser);

  for (let r = 0; r < t.rows; r++) {
    for (let c = 0; c < t.cols; c++) {
      const gid = t.firstgid + r * t.cols + c;
      const d = document.createElement('div');
      d.className = 'ed-tile';
      d.dataset.gid = gid;
      d.style.backgroundImage = `url(${t.url})`;
      d.style.backgroundSize = `${t.cols * 32}px ${t.rows * 32}px`;
      d.style.backgroundPosition = `-${c * 32}px -${r * 32}px`;
      d.title = `${t.name} #${r * t.cols + c} (gid ${gid})`;
      d.addEventListener('click', () => setSelected(gid));
      edPalette.appendChild(d);
    }
  }
  highlightSelected();
}

function setSelected(gid) {
  selectedGid = gid;
  activeTerrainName = null;
  highlightSelected();
  highlightTerrain();
  edCfg?.onSelect(gid);
}

function highlightSelected() {
  edPalette.querySelectorAll('.ed-tile').forEach(el => {
    const g = el.dataset.gid ? +el.dataset.gid : 0;
    el.classList.toggle('selected', g === selectedGid);
  });
}

function updateLayerHighlight(name) {
  edLayersBar.querySelectorAll('button').forEach(b =>
    b.classList.toggle('active', b.dataset.layer === name));
  if (edCfg) edStatus.textContent = `layer: ${name}  ·  gid: ${selectedGid}`;
}

function highlightObjType() {
  document.getElementById('ed-obj-type').querySelectorAll('button').forEach(b => {
    b.classList.toggle('active', b.dataset.objtype === activeObjType);
  });
}

function renderObjPalette() {
  if (!edCfg) return;
  const objPalette = document.getElementById('ed-obj-palette');
  const objTabsEl = document.getElementById('ed-obj-tabs');
  objPalette.innerHTML = '';
  objTabsEl.querySelectorAll('button').forEach((b, i) =>
    b.classList.toggle('active', i === activeObjTabIdx));
  const o = edCfg.objects[activeObjTabIdx];
  if (!o) return;
  objPalette.style.setProperty('--cols', o.cols);
  for (let r = 0; r < o.rows; r++) {
    for (let c = 0; c < o.cols; c++) {
      const frame = r * o.cols + c;
      const d = document.createElement('div');
      d.className = 'ed-tile';
      d.style.backgroundImage = `url("${o.url}")`;
      d.style.backgroundSize = `${o.cols * 32}px ${o.rows * 32}px`;
      d.style.backgroundPosition = `-${c * 32}px -${r * 32}px`;
      d.title = `${o.label} frame ${frame}`;
      d.addEventListener('click', () => {
        edCfg.onObjectSelect(o.key, frame, activeObjType);
      });
      objPalette.appendChild(d);
    }
  }
}