'use strict';

// Each tab set is independent; without JavaScript, all figure and result panels remain readable.
document.querySelectorAll('[data-tabs]').forEach(group => {
  const bar = group.querySelector('[role="tablist"]');
  const tabs = [...bar.querySelectorAll('[role="tab"]')];
  const activate = (active, moveFocus = false) => {
    tabs.forEach(tab => {
      const selected = tab === active;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    });
    if (moveFocus) active.focus();
  };
  bar.hidden = false;
  activate(tabs[0]);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        activate(tabs[next], true);
      }
    });
  });
});

const dialog = document.getElementById('figure-dialog');
const dialogImage = document.getElementById('dialog-image');
const dialogTitle = document.getElementById('dialog-title');
let figureOpener;
document.querySelectorAll('.figure-zoom').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    figureOpener = button;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogImage.width = image.naturalWidth;
    dialogImage.height = image.naturalHeight;
    dialogTitle.textContent = button.closest('figure').querySelector('figcaption strong').textContent;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.getElementById('close-figure').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  figureOpener?.focus({ preventScroll: true });
});

const copyButton = document.getElementById('copy-citation');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  const code = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(code.textContent);
    status.textContent = 'BibTeX copied to clipboard.';
    copyButton.textContent = 'Copied ✓';
    setTimeout(() => { copyButton.textContent = 'Copy BibTeX ⧉'; }, 2500);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});
