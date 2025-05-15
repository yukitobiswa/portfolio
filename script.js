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
    }, 10000); // 10秒無操作で復帰
}

// 監視設定
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
