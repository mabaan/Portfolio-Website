import React from "react";

type Certification = {
  title: string;
  imageSrc: string;
  href?: string;
  width?: number;
  height?: number;
};

interface CertificationsProps {
  heading?: string;
  items?: Certification[];
}

const defaultItems: Certification[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    imageSrc: "/badges/aws-ccp.png",
    href: "https://www.credly.com/badges/0ed66e53-0862-47b9-8903-4d0bb80fcb69/linked_in_profile",
    width: 220,
  },
];

export default function Certifications({
  heading = "Certifications",
  items,
}: CertificationsProps) {
  const displayItems = items && items.length > 0 ? items : defaultItems;
  const gridClassName =
    displayItems.length === 1
      ? "grid grid-cols-1 gap-5 justify-items-center"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center";

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mb-1 text-center tracking-tight">
        {heading}
      </h2>
      <div className={gridClassName}>
        {displayItems.map((cert) => {
          const width = cert.width ?? 220;
          const height = cert.height; // optional explicit height

          const image = (
            <img
              src={cert.imageSrc}
              alt={cert.title}
              loading="lazy"
              style={{
                width: `${width}px`,
                height: height ? `${height}px` : "auto",
                objectFit: "contain",
                background: "transparent",
              }}
            />
          );

          return (
            <div
              key={cert.title}
              className="
                w-full max-w-xs
                group bg-surface border border-muted rounded-2xl shadow-sm
                hover:shadow-md hover:border-[color:var(--color-accent)]
                transition-all duration-200
                p-4 flex flex-col items-center gap-3
              "
            >
              <p className="text-text-primary font-semibold text-base text-center leading-tight">
                {cert.title}
              </p>

              <div
                className="
                  rounded-xl overflow-hidden
                  bg-transparent
                  border border-muted
                  shadow-sm
                "
              >
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background,transparent)]"
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
