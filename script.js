// script.js

/* ============== SQL Injection (шаги) ============== */
const inputScreen = document.getElementById('input-screen');
const normalResult = document.getElementById('normal-result');
const injectionScreen = document.getElementById('injection-screen');
const attackResult = document.getElementById('attack-result');

const loginBtn      = document.getElementById('loginBtn');
const showAttackBtn = document.getElementById('showAttackBtn');
const attackBtn     = document.getElementById('attackBtn');

/* ============== XSS (2 шага) ============== */
// Шаг 1 (небезопасный)
const commentField    = document.getElementById('commentField');
const submitComment   = document.getElementById('submitComment');
const commentContent  = document.getElementById('commentContent');

// Шаг 2 (безопасный)
const commentFieldSafe   = document.getElementById('commentFieldSafe');
const submitCommentSafe  = document.getElementById('submitCommentSafe');
const commentContentSafe = document.getElementById('commentContentSafe');

/* ============== Собираем экраны в объект ============== */
const screens = {
  // SQL
  'input-screen': inputScreen,
  'normal-result': normalResult,
  'injection-screen': injectionScreen,
  'attack-result': attackResult,
  // XSS
  'xss-step1': document.getElementById('xss-step1'),
  'xss-step2': document.getElementById('xss-step2')
};

/* ============== Кнопки навигации (шаги) ============== */
const stepButtons = document.querySelectorAll('.step-btn');

/* ============== Функция переключения экранов ============== */
function showScreen(screenId) {
  // Скрыть все
  for (const key in screens) {
    if (screens[key]) {
      screens[key].classList.add('hidden');
      screens[key].classList.remove('visible');
    }
  }
  // Показать нужный
  if (screens[screenId]) {
    screens[screenId].classList.remove('hidden');
    screens[screenId].classList.add('visible');
  }
  // Активная кнопка
  stepButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.step === screenId) {
      btn.classList.add('active');
    }
  });
  // Прокрутка к верху
  window.scrollTo(0,0);
}

/* ============== Обработчики для SQL Injection ============== */
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    showScreen('normal-result');
  });
}
if (showAttackBtn) {
  showAttackBtn.addEventListener('click', () => {
    showScreen('injection-screen');
  });
}
if (attackBtn) {
  attackBtn.addEventListener('click', () => {
    showScreen('attack-result');
  });
}

/* ============== XSS: Небезопасный ввод (Шаг 1) ============== */
if (submitComment && commentField && commentContent) {
  submitComment.addEventListener('click', () => {
    // Вставляем как есть
    commentContent.innerHTML = commentField.value;
    // Уведомление о срабатывании небезопасного кода
    if (commentField.value.toLowerCase().includes("<script>")) {
      alert("Небезопасный ввод сработал! Ваш скрипт был исполнен.");
    }
  });
}

/* ============== XSS: Безопасный ввод (Шаг 2) ============== */
if (submitCommentSafe && commentFieldSafe && commentContentSafe) {
  submitCommentSafe.addEventListener('click', () => {
    const userText = commentFieldSafe.value;
    // Простейшая экранизация
    const safeOutput = userText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    commentContentSafe.innerHTML = safeOutput;
  });
}

/* ============== Навигация (1..4, 1..2) ============== */
stepButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.step;
    showScreen(target);
  });
});
