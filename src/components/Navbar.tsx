import React, { useEffect, useState } from 'react';

export default function Navbar(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
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
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="w-full z-50">
      <div className="bg-surface/90 backdrop-blur border-b border-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: logo */}
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3 no-underline">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold">MA</div>
                <div className="hidden md:block">
                  <div className="font-semibold text-text-primary">Mohammed Abaan</div>
                  <div className="text-sm text-text-secondary">Frontend, Data, Performance</div>
                </div>
              </a>
            </div>

            {/* Center links (desktop) */}
            <div className="hidden md:flex md:gap-6 md:items-center">
              {links.map((l) => {
                const active = path === l.href || (l.href !== '/' && path.startsWith(l.href));
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`text-sm px-3 py-2 rounded-md no-underline ${
                      active ? 'text-accent font-semibold' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              <a
                href="/assets/Mohammed%20Abaan%20Resume.pdf"
                className="hidden sm:inline-block border border-muted px-3 py-1 rounded text-sm hover:bg-muted/40"
              >
                Resume
              </a>

              <a
                href="https://github.com/mabaan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded hover:bg-muted/40"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.12 3.29 9.46 7.86 10.99.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.97-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.33.95.1-.74.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.88-.39 11.05 11.05 0 012.88.39c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.45-2.7 5.42-5.27 5.71.41.35.77 1.05.77 2.12 0 1.53-.01 2.77-.01 3.15 0 .3.2.66.79.55A10.53 10.53 0 0023.5 12.02C23.5 5.73 18.27.5 12 .5z" />
                </svg>
              </a>

              {/* Theme toggle is loaded client-side in MainLayout; keep space for it */}
              <div id="theme-toggle-slot" className="ml-1" />
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded hover:bg-muted/40"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform`}
        aria-hidden={!isOpen}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setIsOpen(false)} />
        <aside className="absolute right-0 top-0 h-full w-80 bg-surface shadow-xl p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <a href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold">MA</div>
              <div className="text-sm font-semibold">Mohammed Abaan</div>
            </a>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 rounded hover:bg-muted/40">✕</button>
          </div>

          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="py-2 px-3 rounded text-text-primary no-underline" onClick={() => setIsOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-6 border-t border-muted pt-4 flex flex-col gap-3">
            <a href="/assets/Mohammed%20Abaan%20Resume.pdf" className="btn text-center">Resume</a>
            <a href="https://github.com/mabaan" className="text-text-secondary text-center" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
        </aside>
      </div>
    </nav>
  );
}
