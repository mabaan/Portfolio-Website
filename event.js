// Select all nav links
const navLinks = document.querySelectorAll('ul li a');

// Navigate to each section
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();  // Prevent the default jump-to-anchor behavior

    // Get the target section ID from data-target
    const targetId = this.getAttribute('data-target');
    // Find that section by ID
    const targetSection = document.getElementById(targetId);

    // If the section exists, smoothly scroll into view
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form Submission
document.getElementById("subButton").addEventListener("click",function() {
  const displayDate = new Date().toLocaleString(); 
  alert("Submitted on " + displayDate);});