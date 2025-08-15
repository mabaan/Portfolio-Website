// src/utils/useDarkMode.ts
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

export default function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('theme') as Theme) || 'system';
    } catch {
      return 'system';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    const apply = (t: Theme) => {
      if (t === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', t);
      }
    };

    apply(theme);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (theme === 'system') apply('system'); };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, [theme]);

  const set = (t: Theme) => {
    try {
      localStorage.setItem('theme', t);
    } catch {}
    setTheme(t);
  };

  return { theme, setTheme: set };
}
