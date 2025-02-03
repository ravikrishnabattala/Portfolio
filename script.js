function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// typing animation

const titleElement = document.getElementById('developer-title');
const titles = ["Full Stack Developer", "QA Automation Test Engineer"]; // Add other titles you want to cycle through
let currentIndex = 0;

function cycleTitles() {
  const currentTitle = titles[currentIndex];
  currentIndex = (currentIndex + 1) % titles.length;

  typeText(currentTitle, 0);
}

function typeText(text, index) {
  if (index <= text.length) {
    titleElement.textContent = text.substring(0, index);
    setTimeout(() => typeText(text, index + 1), 100); // Typing speed (adjust as needed)
  } else {
    setTimeout(cycleTitles, 2000); // Recurse to the next title every 4 seconds
  }
}

cycleTitles(); // Start the cycling