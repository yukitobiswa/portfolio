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

// Learn More toggle
function toggleDetails(btn) {
  const workCard = btn.closest('.work-description-full');
  if (!workCard) {
    return;
  }

  const details = workCard.querySelector('.work-details');
  if (!details) {
    return;
  }

  const isHidden = details.hasAttribute('hidden');
  if (isHidden) {
    details.removeAttribute('hidden');
    btn.classList.add('active');
    btn.querySelector('span').textContent = 'Close';
  } else {
    details.setAttribute('hidden', '');
    btn.classList.remove('active');
    btn.querySelector('span').textContent = 'Learn More';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.pdf-container');

  containers.forEach((container) => {
    const imagePrefix = container.dataset.imagePrefix;
    const pageCount = Number(container.dataset.pageCount || '0');
    const imageExt = container.dataset.imageExt || 'jpg';
    const pagePad = Number(container.dataset.pagePad || '0');

    if (!imagePrefix || !pageCount) {
      return;
    }

    const slides = Array.from({ length: pageCount }, (_, index) => {
      const pageNumber = String(index + 1).padStart(pagePad, '0');
      return `${imagePrefix}${pageNumber}.${imageExt}`;
    });

    const viewer = document.createElement('div');
    viewer.className = 'slide-viewer';

    const stage = document.createElement('div');
    stage.className = 'slide-stage';

    const prevButton = document.createElement('button');
    prevButton.className = 'slide-nav-button slide-nav-prev';
    prevButton.type = 'button';
    prevButton.setAttribute('aria-label', 'Previous page');
    prevButton.textContent = '❮';

    const nextButton = document.createElement('button');
    nextButton.className = 'slide-nav-button slide-nav-next';
    nextButton.type = 'button';
    nextButton.setAttribute('aria-label', 'Next page');
    nextButton.textContent = '❯';

    const image = document.createElement('img');
    image.className = 'slide-image';
    image.alt = 'Research slide';
    image.loading = 'lazy';

    const pageInfo = document.createElement('div');
    pageInfo.className = 'slide-page-info';
    pageInfo.textContent = `1 / ${slides.length}`;

    stage.appendChild(prevButton);
    stage.appendChild(image);
    stage.appendChild(nextButton);
    viewer.appendChild(stage);
    viewer.appendChild(pageInfo);
    container.appendChild(viewer);

    const state = {
      currentPage: 1,
      totalPages: slides.length,
    };

    const updateControls = () => {
      pageInfo.textContent = `${state.currentPage} / ${state.totalPages}`;
    };

    const showPage = (pageNumber) => {
      if (state.totalPages < 1) {
        return;
      }

      let normalizedPage = pageNumber;
      if (pageNumber < 1) {
        normalizedPage = state.totalPages;
      } else if (pageNumber > state.totalPages) {
        normalizedPage = 1;
      }

      state.currentPage = normalizedPage;
      image.src = slides[normalizedPage - 1];
      updateControls();
    };

    prevButton.addEventListener('click', () => {
      showPage(state.currentPage - 1);
    });

    nextButton.addEventListener('click', () => {
      showPage(state.currentPage + 1);
    });

    image.addEventListener('error', () => {
      stage.innerHTML = '<div class="slide-error">スライド画像の読み込みに失敗しました。</div>';
    }, { once: true });

    showPage(1);
  });
});
