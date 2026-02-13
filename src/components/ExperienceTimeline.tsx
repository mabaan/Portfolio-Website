/**
 * ExperienceTimeline Component
 * 
 * A creative, interactive timeline component for displaying professional experience.
 * 
 * CUSTOMIZATION GUIDE:
 * ====================
 * 
 * 1. ADDING NEW EXPERIENCES:
 *    - Add new items to the `experiences` array below
 *    - Each experience needs: company, position, location, period, description, bullets, skills, and type
 * 
 * 2. EXPERIENCE TYPES:
 *    - work: Professional work experience (orange accent)
 *    - research: Academic/research positions (purple accent)
 *    - volunteer: Volunteer work (green accent)
 *    - leadership: Leadership & extracurricular roles (yellow accent)
 * 
 * 3. COMPANY LOGOS:
 *    - Replace "/placeholder-logo.png" with actual logo paths
 *    - Upload logos to /public/ directory
 *    - Recommended size: 100x100px or higher, square format
 * 
 * 4. ADDING DETAILS:
 *    - bullets: Array of key achievements/responsibilities
 *    - skills: Array of technologies/skills used
 *    - description: Brief one-liner about the role
 * 
 * 5. TIMELINE BEHAVIOR:
 *    - Desktop: Alternating left/right layout
 *    - Mobile: All items aligned left
 *    - Click any card to expand/collapse details
 *    - First item is expanded by default
 */

import React, { useState } from "react";

type Bullet = {
  main: string;
  sub?: string[];
};

type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
  bullets?: (string | Bullet)[];
  logo?: string;
  type: "work" | "research" | "volunteer" | "leadership";
  skills: string[];
};

const experiences: Experience[] = [
  {
    id: "1",
    company: "GC International",
    position: "Junior Software Developer",
    location: "Dubai, UAE",
    period: "June 2025 - August 2025",
    description: "Led delivery of public website and hiring system, cutting application processing time by 40%.",
    bullets: [
      { main: "Developed and deployed company's official public website and internal hiring system" },
      { main: "Built with Astro, React, and Three.js for interactive 3D animations and modern UI" },
      { main: "Integrated Airtable CMS for dynamic content management" },
      { main: "Deployed on AWS Amplify with Lambda functions for serverless backend operations" },
      { main: "Reduced application processing time by 40% through optimized workflows" }
    ],
    logo: "/gc.png",
    type: "work",
    skills: ["Astro", "React", "Three.js", "Airtable CMS", "AWS Amplify", "Lambda", "Serverless"]
  },
  {
    id: "2",
    company: "Aura Technologies",
    position: "Data Science Intern",
    location: "Dubai, UAE",
    period: "June 2024 - August 2024",
    description: "Built AI matching system reducing manual validation by ~80%, improving revenue by ~25%.",
    bullets: [
      { main: "Developed AI-powered matching system using FAISS (Facebook AI Similarity Search) and fuzzy logic" },
      { main: "Reduced manual validation workload by approximately 80% through intelligent automation" },
      { main: "Improved company revenue by ~25% via enhanced matching accuracy and efficiency" },
      { main: "Analyzed customer behavior patterns using Python, SQL, and Excel for data-driven insights" },
      { main: "Supported QA testing and created comprehensive usability reports for product improvement" }
    ],
    logo: "/aura.png",
    type: "work",
    skills: ["Python", "FAISS", "Fuzzy Logic", "SQL", "Excel", "Data Analysis", "AI/ML", "QA Testing"]
  },
  {
    id: "3",
    company: "Etihad Water & Electricity",
    position: "Information Technology Intern",
    location: "UAE",
    period: "May 2025 - June 2025",
    description: "Built dynamic SharePoint sites and supported enterprise IT infrastructure operations.",
    bullets: [
      { main: "Developed dynamic SharePoint sites for internal collaboration and document management" },
      { main: "Created custom .NET pages with jQuery for enhanced user interaction and functionality" },
      { main: "Supported IT operations across vSphere VMs, Active Directory, and Power BI dashboards" },
      { main: "Maintained and troubleshot on-premises cloud infrastructure" },
      { main: "Worked with enterprise virtualization and business intelligence tools" }
    ],
    logo: "/etihad.png",
    type: "work",
    skills: ["SharePoint", ".NET", "jQuery", "vSphere VMs", "Active Directory", "Power BI", "Cloud Infrastructure"]
  },
  {
    id: "4",
    company: "American University of Sharjah",
    position: "Teaching Assistant",
    location: "Sharjah, UAE",
    period: "June 2024 - Present",
    description: "Supporting 8+ Computer Science & Engineering courses across multiple semesters through labs, tutorials, and student mentorship.",
    bullets: [
      {
        main: "Conducted weekly labs and tutorials; created and graded assignments with detailed feedback"
      },
      {
        main: "Provided student support through office hours, helping debug code and strengthen understanding of core concepts"
      },
      {
        main: "CMP 305: Data Structures and Algorithms",
        sub: ["Summer 2024 | Dr. Geralissimos Barlas"]
      },
      {
        main: "CMP 333: Artificial Intelligence",
        sub: ["Fall 2024, Spring 2025, Fall 2025 | Dr. Omar Arif, Dr. Michel Pasquier"]
      },
      {
        main: "COE 251: Introduction to Computer Systems",
        sub: ["Spring 2025, Summer 2025, Fall 2025, Spring 2026 | Dr. Mohammad Daoud, Dr. Fazal Hameed"]
      },
      {
        main: "COE 341: Computer Architecture and Organization",
        sub: ["Summer 2025, Spring 2026 | Dr. Fazal Hameed"]
      },
      {
        main: "COE 420 & CMP 450: Software Engineering & OOP",
        sub: ["Spring 2026 | Dr. Bilal Al-Ahmed"]
      },
      {
        main: "COE 221 Lab & CMP 305 Lab: Digital Systems and Data Structures Labs",
        sub: ["Summer 2024 | Eng. Yara Kaddoura"]
      }
    ],
    logo: "/aus.png",
    type: "research",
    skills: ["Teaching", "AI", "Data Structures", "Computer Architecture", "Software Engineering", "Python", "Java", "C"]
  },
  {
    id: "5",
    company: "American University of Sharjah",
    position: "Research Assistant",
    location: "Sharjah, UAE",
    period: "June 2025 - Present",
    description: "Conducting research across Computer Science and Finance departments, building ML models and developing Python tools for financial applications.",
    bullets: [
      {
        main: "Dr. Mohammad Daoud (CSE) | Signal Processing, BCI/EEG",
        sub: [
          "Supported EEG/BCI research involving signal processing and deep learning-based modeling/benchmarking",
          "Created World's first Arabic Sentence-level EEG Imagined Speech Dataset",
          "Created a unique multi-stage pipeline for EEG classification reaching 95% accuracy"
        ]
      },
      {
        main: "Dr. Kimberely Gleason (Finance) | Financial Analytics, AML, Anti-Fraud",
        sub: [
          "Built Python data pipelines to scrape, clean, and structure large-scale financial and entity data from external sources for AML and fraud analytics",
          "Developed tools to integrate APIs and automate company profiling, risk flagging, and suspicious-pattern detection workflows"
        ]
      },
      {
        main: "Dr. Alex Aklson (CSE) | Industrial Computer Vision, Anomaly Detection",
        sub: [
          "Designed industrial anomaly detection approaches using vision foundation models (SAM, GroundingDINO etc) to support end-to-end inspection pipelines"
        ]
      }
    ],
    logo: "/aus.png",
    type: "research",
    skills: ["PyTorch", "TensorFlow", "Transformers", "CNNs", "LSTMs", "Python", "APIs", "NLP", "Financial Analysis"]
  }
];

const typeConfig = {
  work: {
    label: "Professional Experience",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>,
    color: "var(--color-accent)",
    bgColor: "rgba(249, 115, 22, 0.1)"
  },
  research: {
    label: "Research & Academic",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>,
    color: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.1)"
  },
  volunteer: {
    label: "Volunteer Work",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>,
    color: "#10B981",
    bgColor: "rgba(16, 185, 129, 0.1)"
  },
  leadership: {
    label: "Leadership & Extracurricular",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.1)"
  }
};

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full px-4 sm:px-0">
      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div
          className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, var(--color-accent), var(--muted))"
          }}
        />

        {/* Experience Items */}
        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const config = typeConfig[exp.type];
            const isLeft = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`relative flex items-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-8`}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-6 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 flex items-center justify-center z-10 shadow-lg"
                  style={{
                    borderColor: config.color,
                    backgroundColor: "var(--surface)"
                  }}
                >
                  <span style={{ color: config.color }} className="scale-75 sm:scale-100">{config.icon}</span>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-4rem)] ml-20 sm:ml-24 md:ml-0 pr-4 sm:pr-0 ${
                    isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                  }`}
                >
                  <div
                    className="bg-surface border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                    style={{
                      borderColor: isExpanded ? config.color : "var(--muted)"
                    }}
                    onClick={() => toggleExpanded(exp.id)}
                  >
                    {/* Header Section */}
                    <div
                      className="p-4 sm:p-6"
                      style={{
                        backgroundColor: isExpanded ? config.bgColor : "transparent"
                      }}
                    >
                      <div className={`flex items-start gap-3 sm:gap-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        {/* Company Logo */}
                        <div className="flex-shrink-0">
                          <div
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 flex items-center justify-center overflow-hidden shadow-sm"
                            style={{
                              borderColor: config.color,
                              backgroundColor: "var(--bg)"
                            }}
                          >
                            <img
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              className="w-full h-full object-contain p-1.5 sm:p-2"
                            />
                          </div>
                        </div>

                        {/* Title and Info */}
                        <div className={`flex-1 min-w-0 ${isLeft ? "md:text-right" : ""}`}>
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1 group-hover:text-[color:var(--color-accent)] transition-colors">
                                {exp.position}
                              </h3>
                              <p className="text-base sm:text-lg font-semibold mb-1" style={{ color: config.color }}>
                                {exp.company}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-text-secondary">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {exp.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              {exp.period}
                            </span>
                          </div>

                          <p className="mt-3 text-text-secondary leading-relaxed text-sm sm:text-base">
                            {exp.description}
                          </p>

                          {/* Expand Indicator */}
                          <div className={`mt-3 flex items-center gap-2 text-xs sm:text-sm font-semibold ${isLeft ? "md:justify-end" : ""}`} style={{ color: config.color }}>
                            <span>{isExpanded ? "Show less" : "Show more"}</span>
                            <svg
                              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t-2" style={{ borderColor: config.color }}>
                        <div className="p-4 sm:p-6 space-y-4">
                          {/* Key Responsibilities/Achievements */}
                          {exp.bullets && exp.bullets.length > 0 && (
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-text-primary mb-3 text-left">
                                Key Achievements & Responsibilities
                              </h4>
                              <ul className="space-y-3 text-left list-none pl-0">
                                {exp.bullets.map((bullet, idx) => {
                                  if (typeof bullet === 'string') {
                                    return (
                                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                                        <span
                                          className="mt-[0.35em] w-2 h-2 rounded-full flex-shrink-0"
                                          style={{ backgroundColor: config.color }}
                                        />
                                        <span className="text-text-secondary leading-relaxed flex-1 text-sm sm:text-base">
                                          {bullet}
                                        </span>
                                      </li>
                                    );
                                  }
                                  
                                  return (
                                    <li key={idx} className="flex flex-col gap-2">
                                      <div className="flex items-start gap-2 sm:gap-3">
                                        <span
                                          className="mt-[0.35em] w-2 h-2 rounded-full flex-shrink-0"
                                          style={{ backgroundColor: config.color }}
                                        />
                                        <span className="text-text-secondary leading-relaxed flex-1 font-medium text-sm sm:text-base">
                                          {bullet.main}
                                        </span>
                                      </div>
                                      {bullet.sub && bullet.sub.length > 0 && (
                                        <ul className="ml-4 sm:ml-5 space-y-1.5 list-disc pl-4 marker:text-text-secondary">
                                          {bullet.sub.map((subItem, subIdx) => (
                                            <li key={subIdx} className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                                              {subItem}
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}

                          {/* Skills Used */}
                          {exp.skills && exp.skills.length > 0 && (
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-text-primary mb-3 text-left">
                                Skills & Technologies
                              </h4>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-start">
                                {exp.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium border-2 transition-all hover:scale-105"
                                    style={{
                                      borderColor: config.color,
                                      color: config.color,
                                      backgroundColor: config.bgColor
                                    }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Type Badge */}
                  <div className={`mt-3 flex ${isLeft ? "md:justify-end" : ""}`}>
                    <span
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 rounded-full text-xs font-semibold border-2"
                      style={{
                        borderColor: config.color,
                        color: config.color,
                        backgroundColor: config.bgColor
                      }}
                    >
                      <span className="scale-75 sm:scale-100" style={{ display: 'inline-flex', alignItems: 'center' }}>{config.icon}</span>
                      <span className="hidden xs:inline sm:inline">{config.label}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download Resume CTA */}
      <div className="mt-16 text-center">
        <div className="bg-surface border-2 border-[color:var(--color-accent)] rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-text-primary mb-3">
            Want to know more?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Download my complete resume for a detailed overview of my experience, skills, and accomplishments.
          </p>
          <a
            href="/assets/Mohammed%20Abaan%20Resume.pdf"
            className="btn px-6 py-3 text-base font-bold"
            download
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Full Resume
          </a>
        </div>
      </div>
    </div>
  );
}

