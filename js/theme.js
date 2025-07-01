// theme.js: Handles dark/light theme toggling and persistence

// Immediately Invoked Function Expression (IIFE) to avoid polluting global scope
(function() {
  // Key for saving theme preference in localStorage
  const THEME_KEY = 'animal-funfacts-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  // Apply the selected theme by toggling the .dark-theme class on body
  function applyTheme(theme) {
    if (theme === DARK) {
      document.body.classList.add('dark-theme');
      setButton(DARK);
    } else {
      document.body.classList.remove('dark-theme');
      setButton(LIGHT);
    }
  }

  // Update the theme toggle button's icon and label
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

  // Retrieve the saved theme from localStorage
  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  // Save the selected theme to localStorage
  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  // Toggle between dark and light themes
  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? LIGHT : DARK;
    applyTheme(newTheme);
    saveTheme(newTheme);
  }

  // Initialize theme on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // Apply saved theme or default to light
    const saved = getSavedTheme();
    applyTheme(saved === DARK ? DARK : LIGHT);
    // Add click event to toggle theme
    btn.addEventListener('click', toggleTheme);
  });
})(); 