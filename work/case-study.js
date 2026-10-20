import { viewerRelease } from './viewer-release.mjs';
import { impactGroups } from './impact-progress.mjs?v=3';
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
// Freeze the animated image on its current frame; no replacement artwork or motion is required.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-animated-image]').forEach(img => {
  const animatedSource = img.getAttribute('src');
  const animatedSrcset = img.getAttribute('srcset');
  let paused = false;
  function setPaused(next) {
    if (paused === next) return;
    if (next) {
      if (!img.complete || !img.naturalWidth) return;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      img.removeAttribute('srcset');
      img.src = canvas.toDataURL();
    } else {
      if (animatedSrcset) img.setAttribute('srcset', animatedSrcset);
      img.src = animatedSource;
    }
    paused = next;
  }
  img.addEventListener('load', () => { if (reducedMotion.matches && !paused) setPaused(true); });
  reducedMotion.addEventListener('change', () => setPaused(reducedMotion.matches));
  if (reducedMotion.matches) setPaused(true);
});

// Native scrolling advances the editorial sequence in deck order.
document.querySelectorAll('[data-spread-journey]').forEach(journey => {
  const stage = journey.querySelector('.spread-images');
  const templates = [...stage.querySelectorAll('template')];
  const count = templates.length + 1;
  const figures = new Map([[0, stage.querySelector('figure')]]);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0, travel = 0, releaseSpan = 0, pending = 0;
  function load(index) {
    if (index < 0 || index >= count) return null;
    if (figures.has(index)) return figures.get(index);
    const figure = templates[index - 1].content.firstElementChild.cloneNode(true);
    const img = figure.querySelector('img');
    img.loading = 'eager';
    img.addEventListener('load', schedule, { once: true });
    figure.setAttribute('aria-hidden', 'true');
    figures.set(index, figure);
    stage.append(figure);
    return figure;
  }
  function updateSpreads() {
    pending = 0;
    if (motion.matches) return;
    const top = journey.getBoundingClientRect().top;
    if (top > innerHeight || top < -travel - releaseSpan - innerHeight) return;
    journey.style.setProperty('--viewer-offset', `${viewerRelease(-top, travel, releaseSpan)}px`);
    const progress = Math.max(0, Math.min(1, -top / travel));
    journey.style.setProperty('--spread-progress', String(progress));
    const index = Math.min(count - 1, Math.floor(progress * count));
    const next = load(index);
    load(index + 1); load(index + 2);
    const img = next.querySelector('img');
    if (img.complete && img.naturalWidth) {
      figures.get(active).classList.remove('is-active');
      figures.get(active).setAttribute('aria-hidden', 'true');
      next.classList.add('is-active');
      next.setAttribute('aria-hidden', 'false');
      active = index;
      journey.dataset.activeSpread = String(index);
    }
  }
  function schedule() { if (!pending) pending = requestAnimationFrame(updateSpreads); }
  function measure() {
    travel = count * Math.max(180, innerHeight * .28);
    releaseSpan = Math.min(600, Math.max(240, innerHeight * .6));
    journey.style.setProperty('--spread-travel', `${travel + releaseSpan}px`);
    journey.style.setProperty('--viewer-release', `${motion.matches ? 0 : releaseSpan / 2}px`);
    if (motion.matches) journey.style.setProperty('--viewer-offset', '0px');
    journey.classList.toggle('is-enhanced', !motion.matches);
    journey.classList.toggle('is-static', motion.matches);
    if (motion.matches) {
      for (let i = 0; i < count; i++) load(i).removeAttribute('aria-hidden');
      // Preserve the narrative order when images were loaded by scrolling backward.
      for (let i = 0; i < count; i++) stage.append(figures.get(i));
    }
    if (!motion.matches) figures.forEach((figure, index) => figure.setAttribute('aria-hidden', String(index !== active)));
    schedule();
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure);
  motion.addEventListener('change', measure);
  measure();
});

// Reveal independent milestone groups below each other, retaining completed groups.
document.querySelectorAll('[data-impact-journey]').forEach(journey => {
  const groups = [...journey.querySelectorAll('[data-impact-group]')].map(element => ({ element, svg: element.querySelector('svg'), number: element.querySelector('[data-impact-count]'), dots: [...element.querySelectorAll('circle')], visible: -1 }));
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let travel = 0, releaseSpan = 0, pending = 0;
  function paint(progress) {
    const states = impactGroups(progress);
    groups.forEach((group, index) => {
      const state = states[index];
      const rows = Math.max(1, Math.ceil(state.count / 43));
      const label = group.element.querySelector('.impact-label');
      const labelHeight = label.getBoundingClientRect().height + parseFloat(getComputedStyle(label).marginBottom);
      const targetHeight = state.shown ? labelHeight + rows * 12 * group.element.clientWidth / 516 : 0;
      group.element.style.height = `${targetHeight}px`;
      group.element.style.opacity = state.shown ? '1' : '0';
      group.element.classList.toggle('is-shown', state.shown);
      group.number.textContent = String(state.count);
      if (group.visible !== state.count) {
        group.dots.forEach((dot, i) => dot.classList.toggle('is-visible', i < state.count));
        group.svg.setAttribute('viewBox', `0 0 516 ${Math.max(1, Math.ceil(state.count / 43)) * 12}`);
        group.visible = state.count;
      }
    });
    journey.dataset.visibleDots = states.map(s => s.count).join(',');
  }
  function updateImpact() {
    pending = 0;
    if (!motion.matches) {
      const distance = -journey.getBoundingClientRect().top;
      paint(distance / travel);
      journey.style.setProperty('--viewer-offset', `${viewerRelease(distance, travel, releaseSpan)}px`);
    }
  }
  function schedule() { if (!pending) pending = requestAnimationFrame(updateImpact); }
  function measure() {
    travel = Math.max(3400, innerHeight * 4.5);
    releaseSpan = Math.min(600, Math.max(240, innerHeight * .6));
    journey.style.setProperty('--impact-travel', `${travel + releaseSpan}px`);
    journey.style.setProperty('--viewer-release', `${motion.matches ? 0 : releaseSpan / 2}px`);
    if (motion.matches) journey.style.setProperty('--viewer-offset', '0px');
    journey.classList.toggle('is-enhanced', !motion.matches);
    journey.classList.toggle('is-static', motion.matches);
    if (motion.matches) paint(1); else schedule();
  }
  journey.classList.add('is-ready');
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure);
  motion.addEventListener('change', measure);
  measure();
});
