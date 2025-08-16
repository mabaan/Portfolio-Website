import React from "react";

const featuredProjects = [
  {
    title: "Company Website (GC International)",
    desc: "A public-facing, SEO-optimized website for GC International, built with Astro, React, Airtable CMS, and Three.js for dynamic 3D home animations. Fully managed content via Airtable, deployed to Vercel.",
    href: "https://github.com/mabaan/Company-Website",
    img: "https://github.com/user-attachments/assets/5e8f247f-55bf-448b-a281-60ca7e394a6f", // From README.md
    tech: ["Astro", "React", "Three.js", "Airtable", "Vercel"]
  },
  {
    title: "SmartMealz",
    desc: "A dynamic, BMI-driven meal planning platform. Java Spring Boot backend and Thymeleaf frontend, with smart tracking, chef-crafted recipes, and real-time health metrics. Features integration with SmartMealz Fit wearable.",
    href: "https://github.com/mabaan/Smart-Mealz",
    img: "https://github.com/user-attachments/assets/819a48e9-05a4-431b-b9af-a2a0b9c68144", // From README.md
    tech: ["Java", "Spring Boot", "Thymeleaf", "Bootstrap", "MySQL"]
  },
  {
    title: "Anime Recommendation Model",
    desc: "A full-stack anime recommendation website built with Python Flask, featuring hybrid collaborative/content-based filtering. REST APIs serve anime posters and recommendations, with a React (optional) frontend and dynamic genre/user personalization.",
    href: "https://github.com/mabaan/Anime-Recommendation-Model",
    img: "/anime rec.png", 
    tech: ["Python", "Flask", "Pandas", "NumPy", "scikit-learn", "React", "APIs"]
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="mt-16">
      <h2 className="text-2xl font-semibold text-text-primary mb-6">Featured Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {featuredProjects.map(p => (
          <article key={p.title} className="bg-surface border border-muted rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <img src={p.img} alt={p.title} className="rounded-xl w-full h-40 object-cover mb-4" />
            <h3 className="text-lg font-semibold text-text-primary">
              <a className="hover:underline" href={p.href} target="_blank" rel="noopener noreferrer">{p.title}</a>
            </h3>
            <p className="text-text-secondary mt-2">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map(tech => (
                <span key={tech} className="bg-muted text-xs px-2 py-1 rounded">{tech}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a href={p.href} className="text-sm text-accent hover:underline" target="_blank" rel="noopener noreferrer">View Repo</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}