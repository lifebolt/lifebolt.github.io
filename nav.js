// Bolt menu: the bolt button opens a full-screen menu; its two halves split apart while it's open.
(() => {
  const btn = document.querySelector('.bolt-btn');
  const menu = document.getElementById('menu');
  if (!btn || !menu) return;
  const links = () => [...menu.querySelectorAll('a')];
  function setOpen(open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('menu-open', open);
    menu.hidden = !open;
    if (open) links()[0]?.focus(); else btn.focus();
  }
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', e => {
    if (btn.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
    if (e.key === 'Tab') { // keep focus inside the open menu (button + links)
      const items = [btn, ...links()]; const i = items.indexOf(document.activeElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === items.length - 1 ? 0 : i + 1);
      e.preventDefault(); items[next].focus();
    }
  });
})();
