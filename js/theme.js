// theme.js: Handles dark/light theme toggling and persistence
(function() {
  const THEME_KEY = 'animal-funfacts-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function applyTheme(theme) {
    if (theme === DARK) {
      document.body.classList.add('dark-theme');
      setButton(DARK);
    } else {
      document.body.classList.remove('dark-theme');
      setButton(LIGHT);
    }
  }

  function setButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    if (theme === DARK) {
      btn.innerHTML = '☀️ Light';
      btn.setAttribute('aria-label', 'Switch to light theme');
    } else {
      btn.innerHTML = '🌙 Dark';
      btn.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? LIGHT : DARK;
    applyTheme(newTheme);
    saveTheme(newTheme);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // Apply saved theme or default to light
    const saved = getSavedTheme();
    applyTheme(saved === DARK ? DARK : LIGHT);
    btn.addEventListener('click', toggleTheme);
  });
})(); 