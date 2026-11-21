(() => {
  const appearance = matchMedia('(prefers-color-scheme: dark)');
  const icon = document.createElement('link');
  icon.rel = 'icon';
  icon.type = 'image/png';
  icon.sizes = '32x32';
  icon.setAttribute('data-favicon', '');

  function updateIcon() {
    icon.href = appearance.matches
      ? '/favicon-dark-32x32.png?v=3'
      : '/favicon-32x32.png?v=3';
  }

  // Select the initial artwork before registering an icon with the browser.
  updateIcon();
  document.head.append(icon);
  appearance.addEventListener('change', updateIcon);
  addEventListener('pageshow', updateIcon);
})();
