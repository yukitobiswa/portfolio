const splash = document.getElementById('splash');
const main = document.getElementById('main-content');
let inactivityTimer = null;

// 初期画面を非表示にしてメイン表示
function showMain() {
  splash.classList.add('hidden');
  main.classList.add('active');
  resetInactivityTimer();
}

// 初期画面を表示
function showSplash() {
  splash.classList.remove('hidden');
  main.classList.remove('active');
  window.scrollTo(0, 0);
}

// 操作検出でタイマーリセット
function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    showSplash();
  }, 1000000); // 10秒無操作で復帰
}

// スクロールでスプラッシュ切り替え
splash.addEventListener('click', showMain);
document.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    showSplash();
  } else {
    showMain();
  }
});
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// ===========================
// スライドイン/アウトの処理
// ===========================

// 対象要素を取得
const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right');

// IntersectionObserver で可視性監視
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1
});

// 各要素を監視
slideElements.forEach(el => observer.observe(el));
