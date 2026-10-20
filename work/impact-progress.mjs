// Independent groups stay visible after their own reveal finishes.
export function impactGroups(progress) {
  const p = Math.max(0, Math.min(1, progress));
  const reveal = (start, end, total) => Math.max(0, Math.min(total, Math.floor((p - start) / (end - start) * total + 1e-8)));
  return [
    { shown: true, count: reveal(0, .16, 8) },
    { shown: p > .23, count: reveal(.23, .43, 58) },
    { shown: p > .5, count: reveal(.5, .92, 845) }
  ];
}
