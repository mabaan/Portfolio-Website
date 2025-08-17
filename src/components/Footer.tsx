import React from "react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/mabaan",
    icon: "https://techstack-generator.vercel.app/github-icon.svg",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mohammed-abaan-0245ba289",
    icon: "https://user-images.githubusercontent.com/74038190/235294012-0a55e343-37ad-4b0f-924f-c8431d9d2483.gif",
  },
  {
    label: "Discord",
    href: "https://discord.gg/your-discord-id",
    icon: "https://user-images.githubusercontent.com/74038190/235294015-47144047-25ab-417c-af1b-6746820a20ff.gif",
  },
];

const email = "abaan7500@gmail.com";
const resumeHref = "/assets/Mohammed%20Abaan%20Resume.pdf";
const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[color:var(--muted)] border-t border-muted text-text-secondary">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center md:items-center justify-between gap-10 md:gap-4">
        {/* Left: Info block */}
        <div className="flex flex-col md:flex-row items-center md:items-center w-full md:w-auto gap-4 md:gap-6">
          {/* Replace MA with a simple coding icon, SVG, or initials if you want */}
          <div className="hidden md:flex items-center">
            {/* Example SVG icon (laptop) */}
            <svg
              className="w-12 h-12 text-accent mr-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect x="3" y="5" width="18" height="12" rx="2" className="fill-[color:var(--surface)]" />
              <path d="M2 18h20v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1z" className="fill-[color:var(--surface)]" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-lg text-text-primary">Mohammed Abaan</div>
            <div className="text-sm">
              <a href={`mailto:${email}`} className="hover:text-accent transition">{email}</a>
            </div>
            <div className="mt-2 text-sm max-w-xl text-text-secondary">
              I build fast, accessible web experiences and data solutions.<br />
              Based in UAE, open to opportunities and collaborations.
            </div>
          </div>
        </div>
        {/* Right: Socials & Resume */}
        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex gap-4">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={s.label}
              >
                <img
                  src={s.icon}
                  alt={s.label}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-muted shadow-sm
                             transition-transform group-hover:scale-110 group-hover:border-accent"
                  style={{ background: "#fff" }}
                />
              </a>
            ))}
          </div>
          <a
            href={resumeHref}
            className="btn inline-block px-6 py-2 rounded-lg font-bold text-base bg-accent text-white shadow hover:bg-accent-dark transition"
          >
            Download Resume
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-text-secondary py-6">
        © {YEAR} Mohammed Abaan — Built with Astro + Tailwind
      </div>
    </footer>
  );
}