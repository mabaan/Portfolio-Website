import React from 'react';
import useDarkMode from '../utils/useDarkMode';

export default function ThemeToggle(): React.JSX.Element {
  const { theme, setTheme } = useDarkMode();

  // helper to detect system preference (for default)
  const systemPrefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine icon and next theme
  let isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  // Toggle between light/dark only
  function handleToggle() {
    setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <button
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
      className="p-2 rounded-lg border border-[var(--muted)] bg-[var(--surface)] hover:bg-[var(--muted)] transition flex items-center justify-center"
      style={{ minWidth: 40, minHeight: 40 }}
    >
      {isDark ? (
        // Moon icon for dark
        <svg className="w-5 h-5 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        // Sun icon for light (like img 4)
        <svg className="w-5 h-5 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5" strokeWidth="2"/>
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="2"/>
        </svg>
      )}
    </button>
  );
}