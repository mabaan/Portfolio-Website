import React from "react";

const featuredProjects = [
  {
    title: "Official Company Website",
    desc: "SEO-optimized public website for GC International, built with Astro, React, Airtable CMS, and Three.js for interactive 3D animations. Content managed via Airtable and deployed to Vercel.",
    href: "https://github.com/mabaan/Company-Website",
    img: "/company website.webp",
    tech: ["Astro", "React", "Three.js", "Airtable", "AWS", "CMS", "Vercel"]
  },
  {
    title: "Malware Classification using CNNs",
    desc: "Built a malware detection system using deep learning on byte-sized image inputs from a public dataset. Explored and augmented data, implemented both a modified ResNet-18 and a custom CNN in PyTorch, and achieved high accuracy.",
    href: "https://github.com/mabaan/Malware-Classification-using-CNNs",
    img: "/malware.webp",
    tech: ["Python", "PyTorch", "CNN", "EDA", "Data Augmentation"]
  },
  {
    title: "Anime Recommendation Model",
    desc: "A full-stack anime recommender system representing a multi-stage hybrid recommendation engine that adapts to each user by combining non-personalized popularity, content-based filtering, and collaborative filtering.",
    href: "https://github.com/mabaan/Anime-Recommendation-Model",
    img: "/anime rec.png",
    tech: ["Python", "Flask", "scikit-learn", "React", "APIs"]
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="mt-16 px-2 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-10 text-center tracking-tight">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 xl:gap-10">
        {featuredProjects.map(p => (
          <article
            key={p.title}
            className="
              group
              bg-surface
              border border-muted
              rounded-2xl shadow-md hover:shadow-lg transition
              flex flex-col overflow-hidden
              hover:scale-[1.03]
              min-h-[720px] h-[720px] max-h-[720px]
            "
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div className="relative w-full overflow-hidden" style={{ height: "270px" }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                    group-hover:brightness-95
                    rounded-t-2xl
                    bg-muted
                  "
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "270px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-t-2xl"></div>
              </div>
              <div className="flex-1 flex flex-col p-6 pb-0">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-center">
                  <a
                    className="hover:underline text-[color:var(--color-accent)] transition"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.title}
                  </a>
                </h3>
                <p className="text-text-secondary text-sm md:text-base mb-4">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {p.tech.map(tech => (
                    <span
                      key={tech}
                      className="
                        px-3 py-1 rounded-full shadow
                        border border-[color:var(--color-accent)]
                        font-semibold
                        text-xs md:text-sm
                        bg-[color:var(--color-accent)]
                        bg-opacity-10
                        text-[color:var(--color-accent)]
                        whitespace-nowrap
                        transition
                        hover:bg-opacity-20
                        cursor-default
                        tracking-wide
                      "
                      style={{
                        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.06)",
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-accent)",
                        borderColor: "var(--color-accent)",
                        opacity: 0.85,
                        backgroundBlendMode: "multiply",
                        background: "rgba(var(--color-accent), 0.10)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-end pb-6">
              <a
                href={p.href}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "6px",
                  minWidth: "120px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" className="inline-block">
                  <path d="M18 13V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Visit Repo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}