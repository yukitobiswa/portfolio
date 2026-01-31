const splash = document.getElementById('splash');
const main = document.getElementById('main-content');
const navbar = document.getElementById('navbar');
let inactivityTimer = null;

// Show main content, hide splash
function showMain() {
  splash.classList.add('hidden');
  main.classList.add('active');
  resetInactivityTimer();
}

// Show splash, hide main
function showSplash() {
  splash.classList.remove('hidden');
  main.classList.remove('active');
  navbar.classList.remove('visible');
  window.scrollTo(0, 0);
}

// Reset inactivity timer
function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(showSplash, 960000); // 16min
}

// Splash click to dismiss
splash.addEventListener('click', showMain);

// Scroll-based splash toggle + navbar visibility
document.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    showSplash();
  } else {
    showMain();
    // Show navbar after scrolling past hero
    if (window.scrollY > window.innerHeight * 0.6) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  }
});

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

document.addEventListener('scroll', updateActiveNav);
