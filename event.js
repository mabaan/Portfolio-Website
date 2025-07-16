// NAV LINKS - Event Listener I
const navLinks = document.querySelectorAll('#navbar li a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    // close menu on mobile after selection
    navbar.classList.remove('show');
  });
});

// FORM SUBMISSION - Event Listener II
const form = document.getElementById("form");
function listening() {
  const displayDate = new Date().toLocaleString(); 
  alert("Submitted on " + displayDate);
}
form.addEventListener('submit', listening);

// DARK MODE TOGGLE - Event Listener III
const themeButton = document.getElementById('themeButton');
themeButton.addEventListener("click", changeTheme);
function changeTheme() {
  document.body.classList.toggle('darkmode');
}

// HAMBURGER MENU TOGGLE
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
hamburger.addEventListener('click', () => {
  navbar.classList.toggle('show');
});

// TYPEWRITER EFFECT
const text = 'Welcome to my Page!';
const speed = 100; // milliseconds per character
const elem = document.getElementById('welcome');
let i = 0;
function typeWriter() {
  if (i < text.length) {
    elem.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(() => {
      elem.innerHTML = '';
      i = 0;
      typeWriter();
    }, 2000);
  }
}
document.addEventListener('DOMContentLoaded', typeWriter);
