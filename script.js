// script.js

/* ---------------------------------------
   1. SQL Injection (шаги 1..4)
---------------------------------------- */

// Собираем ссылки на экраны для SQL Injection
const inputScreen       = document.getElementById('input-screen');
const normalResult      = document.getElementById('normal-result');
const injectionScreen   = document.getElementById('injection-screen');
const attackResult      = document.getElementById('attack-result');

// Кнопки внутри сценария SQL Injection
const loginBtn         = document.getElementById('loginBtn');
const showAttackBtn    = document.getElementById('showAttackBtn');
const attackBtn        = document.getElementById('attackBtn');

/* ---------------------------------------
   2. XSS: Небезопасный ввод
---------------------------------------- */
const commentField     = document.getElementById('commentField');
const submitComment    = document.getElementById('submitComment');
const commentContent   = document.getElementById('commentContent');

/* ---------------------------------------
   3. XSS: Безопасный ввод
---------------------------------------- */
const commentFieldSafe    = document.getElementById('commentFieldSafe');
const submitCommentSafe   = document.getElementById('submitCommentSafe');
const commentContentSafe  = document.getElementById('commentContentSafe');

/* ---------------------------------------
   4. Общая логика переключения шагов
---------------------------------------- */

// Кнопки навигации по шагам (1,2,3,4, возможно 1,2 для XSS)
const stepButtons = document.querySelectorAll('.step-btn');

// Объединяем экраны SQLI в объект (если они есть)
const screens = {
  'input-screen': inputScreen,
  'normal-result': normalResult,
  'injection-screen': injectionScreen,
  'attack-result': attackResult
  // Если в будущем будут экраны для XSS с шагами, можно сюда добавить:
  // 'xss-step1': xssStep1,
  // 'xss-step2': xssStep2,
  // и т.д.
};

/* ---------------------------------------
   Функция showScreen(screenId)
   - скрывает все блоки из 'screens'
   - показывает только нужный
   - назначает "active" на соответствующую кнопку
---------------------------------------- */
function showScreen(screenId) {
  // Скрываем все
  for (const key in screens) {
    if (screens[key]) {
      screens[key].classList.add('hidden');
      screens[key].classList.remove('visible');
    }
  }
  // Показываем нужный
  if (screens[screenId]) {
    screens[screenId].classList.remove('hidden');
    screens[screenId].classList.add('visible');
  }

  // Обновляем "active" у кнопок
  stepButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.step === screenId) {
      btn.classList.add('active');
    }
  });

  // Скроллим наверх, чтобы пользователь видел начало блока
  window.scrollTo(0,0);
}

/* ---------------------------------------
   5. SQL Injection: Вешаем обработчики
---------------------------------------- */
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

/* ---------------------------------------
   6. XSS: Небезопасный ввод
---------------------------------------- */
if (commentField && submitComment && commentContent) {
  submitComment.addEventListener('click', () => {
    // Небезопасно: вставляем как есть
    commentContent.innerHTML = commentField.value;
  });
}

/* ---------------------------------------
   7. XSS: Безопасный ввод
---------------------------------------- */
if (commentFieldSafe && submitCommentSafe && commentContentSafe) {
  submitCommentSafe.addEventListener('click', () => {
    const userInput = commentFieldSafe.value;
    // Экранируем спецсимволы
    const safeOutput = userInput
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    // Выводим экранированный текст
    commentContentSafe.innerHTML = safeOutput;
  });
}

/* ---------------------------------------
   8. Обработчики на кнопках меню шагов
---------------------------------------- */
stepButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetStep = btn.dataset.step;
    showScreen(targetStep);
  });
});
