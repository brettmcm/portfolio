// Page chrome is independent of the homepage's carousel and experience dialog.
const links = [...document.querySelectorAll('[data-proposal-contents] a')];
const sections = links.map(link => document.querySelector(link.hash));
const thumb = document.querySelector('.proposal-scrollbar-thumb');
let frame;
function update() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    let current = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= innerHeight * .34) current = section; });
    links.forEach(link => link.hash === `#${current.id}` ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
    const root = document.documentElement, track = root.clientHeight - 8, range = root.scrollHeight - root.clientHeight;
    const height = Math.max(24, track * root.clientHeight / root.scrollHeight);
    thumb.style.height = `${height}px`;
    thumb.style.transform = `translateY(${range > 0 ? (track - height) * root.scrollTop / range : 0}px)`;
    thumb.style.opacity = range > 0 ? '1' : '0';
    // Match the Full Experience panel: soften the bottom 30% of the viewport,
    // then lift the veil as the final content comes into view.
    const fadeHeight = root.clientHeight * .3;
    const remaining = Math.max(0, range - root.scrollTop);
    document.body.style.setProperty('--page-edge-height', `${fadeHeight}px`);
    document.body.style.setProperty('--page-edge-opacity', String(remaining <= 1 ? 0 : Math.min(1, remaining / Math.max(1, fadeHeight))));
  });
}
addEventListener('scroll', update, { passive: true });
addEventListener('resize', update);
new ResizeObserver(update).observe(document.body);
update();
let pointer = null, pointerFrame;
function updateOutline() {
  pointerFrame = null;
  links.forEach(link => {
    const bounds = link.getBoundingClientRect();
    const distance = pointer ? Math.hypot((pointer.x - bounds.left) / 150, (pointer.y - bounds.top - bounds.height / 2) / 36) : Infinity;
    link.style.setProperty('--mark-scale', String(1 + 3 * Math.exp(-distance * distance / 2)));
  });
}
addEventListener('pointermove', event => { pointer = { x: event.clientX, y: event.clientY }; if (!pointerFrame) pointerFrame = requestAnimationFrame(updateOutline); }, { passive: true });
document.documentElement.addEventListener('pointerleave', () => { pointer = null; if (!pointerFrame) pointerFrame = requestAnimationFrame(updateOutline); });
// Cycle grouped reference imagery in a single, stable container.
document.querySelectorAll('[data-image-cycle]').forEach(cycle => {
  const slides = [...cycle.querySelectorAll('figure')];
  if (slides.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let active = 0;
  setInterval(() => {
    slides[active].classList.remove('is-active');
    slides[active].setAttribute('aria-hidden', 'true');
    active = (active + 1) % slides.length;
    slides[active].classList.add('is-active');
    slides[active].setAttribute('aria-hidden', 'false');
  }, Number(cycle.dataset.cycleInterval) || 1000);
});
// Freeze the GIF on its current frame; no replacement artwork or motion is required.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.motion-toggle').forEach(button => {
  const img = button.previousElementSibling;
  const animatedSource = img.getAttribute('src');
  let paused = false;
  function setPaused(next) {
    if (paused === next) return;
    if (next) {
      if (!img.complete || !img.naturalWidth) return;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      img.src = canvas.toDataURL();
    } else img.src = animatedSource;
    paused = next;
    button.textContent = paused ? 'Play animation' : 'Pause animation';
    button.setAttribute('aria-pressed', String(paused));
  }
  button.addEventListener('click', () => setPaused(!paused));
  img.addEventListener('load', () => { if (reducedMotion.matches && !paused) setPaused(true); });
  reducedMotion.addEventListener('change', () => setPaused(reducedMotion.matches));
  if (reducedMotion.matches) setPaused(true);
});
