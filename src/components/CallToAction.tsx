import React from "react";

export default function CallToAction() {
  return (
    <section className="mt-16 px-4 sm:px-6 md:px-8 mb-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-surface to-bg border-2 border-accent rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Lets Build Something Amazing Together
            </h2>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-6 leading-relaxed">
              Whether its a challenging ML project, a full-stack application, or an innovative idea you want to bring to life, I am always open to collaboration and new opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/contact" 
                className="btn px-6 py-3 text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Get in Touch
              </a>
              
              <a 
                href="/projects" 
                className="px-6 py-3 text-base font-semibold border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                View All Projects
              </a>
            </div>

            {/* Stats/Quick Info */}
            <div className="mt-8 pt-6 border-t border-muted flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">15+</div>
                <div className="text-sm text-text-muted uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">5+</div>
                <div className="text-sm text-text-muted uppercase tracking-wide">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
