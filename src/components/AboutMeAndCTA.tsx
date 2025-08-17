import React from "react";
import Intel4004Model from "./Intel4004Model";

export default function AboutMeAndCTA() {
  return (
    <>
      {/* About Me / Personal Touch */}
      <section className="mt-8 flex flex-col items-center">
        <div className="bg-surface rounded-2xl p-6 shadow w-full max-w-3xl flex flex-col md:flex-row items-center gap-8" style={{ paddingTop: "1.2rem", paddingBottom: "1.2rem" }}>
          {/* Left: About Me Text */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start">
            <h3 className="text-2xl font-bold mb-3 text-text-primary">A Little About Me</h3>
            <p className="text-text-secondary max-w-2xl mx-auto text-base leading-relaxed text-center md:text-left">
              Outside of code, I enjoy gaming and football, and I am always exploring new tech. I like learning about machine learning, data science, cloud deployments, and UI design.<br className="hidden sm:block" />
              <span className="block mt-4 font-medium text-text-primary text-center md:text-left">
                I also am a Hardware Enthusiast, and I love tinkering with old tech like CPUs.
              </span>
            </p>
          </div>
          {/* Right: GLB Model */}
          <div className="flex-1 flex justify-center items-center min-w-0" style={{maxWidth: "320px"}}>
            <Intel4004Model />
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mt-10 flex flex-col items-center">
        <div className="bg-surface rounded-2xl p-6 text-center shadow w-full max-w-2xl" style={{paddingTop: "1.2rem", paddingBottom: "1.2rem"}}>
          <h3 className="text-2xl font-bold text-text-primary">Let us work together</h3>
          <p className="text-text-secondary mt-2 text-base">
            If you would like to collaborate or have a role to discuss, let us connect!
          </p>
          <div className="mt-5">
            <a href="/contact" className="btn inline-block text-base font-semibold px-7 py-3">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}