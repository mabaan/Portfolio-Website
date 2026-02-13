import React from "react";

const allProjects = [
  // === FEATURED PROJECTS (Top 3 - Production/High Impact) ===
  {
    title: "Official Company Website for SME",
    desc: "SEO-optimized public website for GC International, built with Astro, React, Airtable CMS, and Three.js for interactive 3D animations. Content managed via Airtable and deployed to Vercel.",
    href: "https://github.com/mabaan/Company-Website",
    img: "/company website.webp",
    tech: ["Astro", "React", "Three.js", "Airtable", "AWS", "CMS", "Vercel"],
    featured: true
  },
  {
    title: "Carway: Vehicle Auction Platform",
    desc: "Full-stack vehicle auction aggregator processing 50K+ daily lots from Copart, IAAI, Emirates Auction and more. Features VIN search, bid history tracking, advanced filtering, and secure payment gateway integration.",
    href: "https://carway.pro",
    img: "/carway.webp", // TODO: Add Carway screenshot
    tech: ["PHP", "MySQL", "Payment Gateway", "SEO", "REST APIs"],
    featured: false
  },
  {
    title: "KHAYAL: EEG Imagined Speech Classification",
    desc: "Brain-computer interface system for classifying imagined Arabic speech from EEG data. Two-stage pipeline using transformer neural networks for word classification and JAIS-13B LLM for sentence reconstruction.",
    href: "https://github.com/mabaan/Imagined-Speech-EEG-Classification",
    img: "/khayal.jpg", // TODO: Add EEG project screenshot
    tech: ["Python", "PyTorch", "Transformers", "EEG", "LLM", "BCI"],
    featured: true
  },

  // === PRODUCTION & FULL-STACK PROJECTS ===
  {
    title: "FishNet - Phishing Detection Extension",
    desc: "Multi-stage phishing detection browser extension with real-time URL analysis and ML classification. Features USI algorithm with FAISS similarity search and Logistic Regression classifier achieving 99.66% accuracy.",
    href: "https://github.com/mabaan/FishNet",
    img: "/fishnet.png",
    tech: ["Python", "Flask", "scikit-learn", "FAISS", "JavaScript", "Chrome Extension"],
    featured: false
  },
  {
    title: "Anime Recommendation Model",
    desc: "A full-stack anime recommender system representing a multi-stage hybrid recommendation engine that adapts to each user by combining non-personalized popularity, content-based filtering, and collaborative filtering.",
    href: "https://github.com/mabaan/Anime-Recommendation-Model",
    img: "/anime rec.png",
    tech: ["Python", "Flask", "scikit-learn", "React", "APIs"],
    featured: false
  },
  {
    title: "SmartMealz - BMI Meal Planner",
    desc: "Dynamic BMI-driven meal planning platform with personalized recommendations. Features caloric needs calculation, meal categorization (high-protein, balanced, plant-based), and responsive UI.",
    href: "https://github.com/mabaan/Smart-Mealz",
    img: "/smart mealz.jpg",
    tech: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "Bootstrap"],
    featured: false
  },

  // === ML & DEEP LEARNING PROJECTS ===
  {
    title: "Malware Classification using CNNs",
    desc: "Deep learning-based malware detection system using Convolutional Neural Networks. Implements ResNet18 and custom 3-layer CNN architectures with data augmentation for classifying malware samples from binary images.",
    href: "https://github.com/mabaan/Malware-Classification-using-CNNs",
    img: "/malware.webp",
    tech: ["Python", "PyTorch", "CNN", "ResNet", "Deep Learning"],
    featured: false
  },
  {
    title: "PV Fault Detection System",
    desc: "ML-based fault detection for grid-connected photovoltaic systems. Analyzes electrical and environmental parameters using Decision Trees, k-NN, SVM, and Neural Networks achieving 99.84% accuracy.",
    href: "https://github.com/mabaan/Fault-Detection-in-grid-tie-Photovoltaic-Plant-Operation",
    img: "/pv.jpg", // TODO: Add PV Fault Detection screenshot
    tech: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    featured: false
  },
  {
    title: "Heart Disease Prediction",
    desc: "Machine learning model for predicting heart diseases in high-risk patients. Uses patient health metrics and clinical data to identify individuals at elevated cardiovascular risk.",
    href: "https://github.com/mabaan/Predicting-Heart-Diseases-in-High-Risk-Patients",
    img: "/heart.jpg", // TODO: Add Heart Disease project screenshot
    tech: ["Python", "scikit-learn", "Pandas", "Data Analysis"],
    featured: false
  },

  // === SECURITY & SYSTEMS PROJECTS ===
  {
    title: "ReversePrompt - AI Customer Support Agent",
    desc: "Multi-agent AI system that detects customer issues across internal channels and social media, routes incidents to teams, and generates reverse prompts guiding employees on next steps. Read-only pipeline with RAG and guardrails.",
    href: "https://github.com/mabaan/RPM",
    img: "/rp.jpg", 
    tech: ["Python", "FastAPI", "RAG", "FAISS", "Qwen LLM", "Multi-Agent", "Docker"],
    featured: true
  },
  {
    title: "CloudDesk - Cloud-Native IT Ticketing",
    desc: "CloudDesk is a serverless IT helpdesk built on AWS with role-based employee and agent workflows. It supports secure sign-in, fast ticket routing, and end-to-end lifecycle tracking with real-time status visibility.",
    href: "https://github.com/mabaan/CloudDesk",
    img: "/clouddesk.png",
    tech: ["AWS Lambda", "DynamoDB", "Cognito", "API Gateway", "React", "TypeScript", "SAM"],
    featured: false
  },
  {
    title: "Social Engineering Attack Demo",
    desc: "Educational demonstrations of social engineering attacks including GUI confusion phishing and privacy dark patterns. Features fullscreen fake login pages and predatory privacy settings UI studies.",
    href: "https://github.com/mabaan/Social-Engineering-Attack",
    img: "/soeng.jpg", 
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Security Research"],
    featured: false
  }
];

// Global priority order for `/projects` (importance + completion + real-world impact).
const projectPriorityOrder = [
  "ReversePrompt - AI Customer Support Agent",
  "KHAYAL: EEG Imagined Speech Classification",
  "Official Company Website for SME",
  "FishNet - Phishing Detection Extension",
  "Anime Recommendation Model",
  "CloudDesk - Cloud-Native IT Ticketing",
  "Social Engineering Attack Demo",
  "Carway: Vehicle Auction Platform",
  "SmartMealz - BMI Meal Planner",

  // Then the rest
  "Malware Classification using CNNs",
  "PV Fault Detection System",
  "Heart Disease Prediction",
];

interface FeaturedProjectsProps {
  showAll?: boolean;
  showViewMoreButton?: boolean;
}

export default function FeaturedProjects({ showAll = false, showViewMoreButton = true }: FeaturedProjectsProps) {
  const projects = [...allProjects]
    .sort((a, b) => {
      const aRank = projectPriorityOrder.indexOf(a.title);
      const bRank = projectPriorityOrder.indexOf(b.title);
      const safeARank = aRank === -1 ? Number.MAX_SAFE_INTEGER : aRank;
      const safeBRank = bRank === -1 ? Number.MAX_SAFE_INTEGER : bRank;
      return safeARank - safeBRank;
    })
    .filter((p) => (showAll ? true : p.featured));
  
  return (
    <section id="projects" className="mt-16 px-2 sm:px-6">
      {!showAll && (
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-10 text-center tracking-tight">
          Featured Projects
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 xl:gap-10">
        {projects.map(p => (
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
      
      {/* View More Button */}
      {showViewMoreButton && !showAll && (
        <div className="flex justify-center mt-8">
          <a
            href="/projects"
            className="btn inline-block text-base font-semibold px-8 py-3 transition-all hover:scale-105"
          >
            View More
          </a>
        </div>
      )}
    </section>
  );
}


