// Accelerate from a pinned frame (slope 0) to native page motion (slope 1).
export function viewerRelease(distance, contentTravel, releaseSpan) {
  const progress = Math.max(0, Math.min(1, (distance - contentTravel) / releaseSpan));
  return releaseSpan * progress * progress / 2;
}
