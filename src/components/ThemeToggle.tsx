// src/components/ThemeToggle.tsx
import React from 'react';
import useDarkMode from '../utils/useDarkMode';

export default function ThemeToggle(): React.JSX.Element {
  const { theme, setTheme } = useDarkMode();

  // helper to detect system preference for rendering icon when theme === 'system'
  const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle theme"
        title="Toggle theme"
        onClick={() => {
          const next = theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system';
          setTheme(next);
        }}
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {isDark ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 4.5V2m0 20v-2.5M20 12h2M2 12h2m14.142 6.142 1.767 1.767M4.09 4.09l1.767 1.767M18.364 5.636l1.414-1.414M5.636 18.364l1.414-1.414M12 7a5 5 0 100 10 5 5 0 000-10z" />
          </svg>
        )}
      </button>

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="hidden sm:inline-block text-sm text-text-secondary bg-transparent"
        aria-label="Theme selector"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
