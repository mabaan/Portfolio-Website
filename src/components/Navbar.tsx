import React, { useEffect, useState } from 'react';
// Import ThemeToggle directly!
import ThemeToggle from './ThemeToggle';

export default function Navbar(): React.ReactElement {
  const [path, setPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
  }, []);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: 'var(--bg)',
        minHeight: '70px',
      }}
    >
      <div
        className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between rounded-2xl"
        style={{
          background: 'var(--surface)',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
          marginTop: '8px',
          marginBottom: '8px',
        }}
      >
        {/* Logo and Brand */}
        <a href="/" className="flex items-center gap-3 no-underline hover:no-underline">
          <img
            src="/portfolio logo.png"
            alt="Logo"
            className="h-10 w-10 object-contain"
            style={{ minWidth: 40 }}
          />
          <span className="font-extrabold text-xl tracking-wide" style={{ color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--color-accent)' }}>Mohammed </span>
            <span style={{ color: 'var(--text-primary)' }}>Abaan</span>
          </span>
        </a>

        {/* Navigation Links */}
        <ul className="flex gap-10 items-center ml-8 flex-1 justify-center">
          {links.map((link) => {
            const isActive =
              path &&
              (path === link.href || (link.href !== "/" && path.startsWith(link.href)));
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-semibold text-lg transition no-underline ${
                    isActive
                      ? 'text-[var(--color-accent)] font-extrabold'
                      : 'text-[var(--text-primary)] hover:text-[var(--color-accent)]'
                  }`}
                  style={{ padding: '2px 10px', borderRadius: '6px' }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        
        {/* Right-most Theme Toggle and GitHub */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/mabaan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded hover:bg-muted/40"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.12 3.29 9.46 7.86 10.99.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.97-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.33.95.1-.74.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.88-.39 11.05 11.05 0 012.88.39c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.45-2.7 5.42-5.27 5.71.41.35.77 1.05.77 2.12 0 1.53-.01 2.77-.01 3.15 0 .3.2.66.79.55A10.53 10.53 0 0023.5 12.02C23.5 5.73 18.27.5 12 .5z"/>
            </svg>
          </a>
          {/* Directly render ThemeToggle here */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}