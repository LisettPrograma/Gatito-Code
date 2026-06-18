let levelDialog, levelDialogTxt, levelDialogBtn;
let _onClose = null;

export function initDialog() {
  levelDialog = document.getElementById('level-dialog');
  levelDialogTxt = document.getElementById('level-dialog-text');
  levelDialogBtn = document.getElementById('level-dialog-btn');

  levelDialogBtn.addEventListener('click', closeDialog);
  levelDialog.addEventListener('click', e => { if (e.target === levelDialog) closeDialog(); });

  window.__showDialog = ({ message, onClose }) => {
    levelDialogTxt.textContent = message;
    levelDialog.classList.add('visible');
    _onClose = onClose || null;
  };

  const creditsOverlay = document.getElementById('credits-overlay');
  const creditsBackBtn = document.getElementById('credits-back-btn');

  creditsBackBtn.addEventListener('click', () => creditsOverlay.classList.remove('visible'));

  window.__showCredits = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const r = canvas.getBoundingClientRect();
      creditsOverlay.style.left = r.left + 'px';
      creditsOverlay.style.top = r.top + 'px';
      creditsOverlay.style.width = r.width + 'px';
      creditsOverlay.style.height = r.height + 'px';
    }
    creditsOverlay.classList.add('visible');
  };
}

function closeDialog() {
  levelDialog.classList.remove('visible');
  if (_onClose) { const cb = _onClose; _onClose = null; cb(); }
}