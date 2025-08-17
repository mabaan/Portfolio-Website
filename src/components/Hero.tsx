import React from "react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/mabaan",
    img: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#2100c4" d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36 C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"></path><path fill="#ddbaff" d="M37,23.5c0-2.897-0.875-4.966-2.355-6.424C35.591,15.394,34.339,12,34.339,12 c-2.5,0.5-4.367,1.5-5.609,2.376C27.262,14.115,25.671,14,24,14c-1.71,0-3.339,0.118-4.834,0.393 c-1.242-0.879-3.115-1.889-5.632-2.393c0,0-1.284,3.492-0.255,5.146C11.843,18.6,11,20.651,11,23.5 c0,6.122,3.879,8.578,9.209,9.274C19.466,33.647,19,34.764,19,36l0,0.305c-0.163,0.045-0.332,0.084-0.514,0.108 c-1.107,0.143-2.271,0-2.833-0.333c-0.562-0.333-1.229-1.083-1.729-1.813c-0.422-0.616-1.263-2.032-3.416-1.979 c-0.376-0.01-0.548,0.343-0.5,0.563c0.043,0.194,0.213,0.5,0.896,0.75c0.685,0.251,1.063,0.854,1.438,1.458 c0.418,0.674,0.417,2.468,2.562,3.416c1.53,0.677,2.988,0.594,4.097,0.327l0.001,3.199c0,0.639-0.585,1.125-1.191,1.013 C19.755,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.584,43.127,29,42.641,29,42.002L29,36 c0-1.236-0.466-2.353-1.209-3.226C33.121,32.078,37,29.622,37,23.5z"></path><path fill="#ddbaff" d="M15,18l3.838-1.279c1.01-0.337,1.231-1.684,0.365-2.302l-0.037-0.026 c-2.399,0.44-4.445,1.291-5.888,2.753C13.596,17.658,14.129,18,15,18z"></path><path fill="#ddbaff" d="M28.693,14.402c-0.878,0.623-0.655,1.987,0.366,2.327L32.872,18c0.913,0,1.461-0.37,1.773-0.924 c-1.46-1.438-3.513-2.274-5.915-2.701C28.717,14.384,28.705,14.393,28.693,14.402z"></path><path fill="#ddbaff" d="M24,31c-1.525,0-2.874,0.697-3.791,1.774C21.409,32.931,22.681,33,24,33s2.591-0.069,3.791-0.226 C26.874,31.697,25.525,31,24,31z"></path>
</svg>,
    alt: "GitHub Profile",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-abaan-0245ba289/",
    img: "https://user-images.githubusercontent.com/74038190/235294012-0a55e343-37ad-4b0f-924f-c8431d9d2483.gif",
    alt: "LinkedIn Profile",
  },
  {
    label: "Discord",
    href: "https://discord.gg/8PrbRyhYqF",
    img: "https://user-images.githubusercontent.com/74038190/235294015-47144047-25ab-417c-af1b-6746820a20ff.gif",
    alt: "Join me on Discord",
  },
];

const resumeHref = "/assets/Mohammed%20Abaan%20Resume.pdf";
const quote = "Always learning, always building. Every project is a chance to grow.";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-12">
      <div className="flex flex-col justify-center h-full" style={{ minHeight: "430px" }}>
        <h1 className="mt-6 md:mt-0 text-4xl md:text-5xl font-extrabold leading-tight mb-2">
          <span className="text-text-primary">Hi, I am </span>
          <span className="text-accent">Mohammed<br />Abaan.</span>
        </h1>
        <p className="mt-2 text-lg text-text-secondary max-w-xl">
          4th year Computer Science Student at the American University of Sharjah, passionate about Machine Learning, Deep Learning, and Data Science<br />
          Focused on AI and building intelligent solutions with Python, TensorFlow, PyTorch, and modern web tools.<br />
          I also build fast, accessible web apps and data platforms when needed.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 w-full">
          <a href={resumeHref} className="btn px-6 py-3 rounded-lg font-bold text-base bg-accent text-white shadow hover:bg-accent-dark transition">
            Download Resume
          </a>
        </div>
        <div id="socials" className="flex gap-8 mt-6 justify-center w-full">
          {socials.map(s => (
            <a className="social-icon" href={s.href} target="_blank" rel="noopener noreferrer" key={s.label}>
              {typeof s.img === "string" ? (
                <img src={s.img} alt={s.alt} className="w-20 h-20 md:w-24 md:h-24 rounded hover:scale-110 transition" />
              ) : (
                <span className="w-20 h-20 md:w-24 md:h-24 rounded hover:scale-110 transition flex items-center justify-center" aria-label={s.alt}>
                  {s.img}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <img src="/GitHub Wallpaper.jpg" alt="Mohammed Abaan" className="rounded-2xl w-[34rem] h-[22rem] object-cover shadow-lg mb-6" />
        <div className="relative w-full flex justify-center">
          <blockquote
            className="rounded-2xl shadow-lg p-4 text-center max-w-xl mx-auto text-lg italic transition-colors
              text-text-secondary dark:text-text-secondary-dark
              bg-surface dark:bg-surface
              border-l-4 border-accent"
          >
            “ {quote} ”
          </blockquote>
        </div>
      </div>
    </section>
  );
}