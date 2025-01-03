// script.js

// Собираем ссылки на экраны
const inputScreen = document.getElementById('input-screen');
const normalResult = document.getElementById('normal-result');
const injectionScreen = document.getElementById('injection-screen');
const attackResult = document.getElementById('attack-result');

// Кнопки внутри сценария
const loginBtn = document.getElementById('loginBtn');
const showAttackBtn = document.getElementById('showAttackBtn');
const attackBtn = document.getElementById('attackBtn');

// Кнопки навигации по шагам
const stepButtons = document.querySelectorAll('.step-btn');

// Чтобы переключать экраны удобнее, соберём их в объект
const screens = {
  'input-screen': inputScreen,
  'normal-result': normalResult,
  'injection-screen': injectionScreen,
  'attack-result': attackResult
};

// Функция переключения экрана
function showScreen(screenId) {
  // Скрываем все экраны
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

  // Скроллим наверх
  window.scrollTo(0,0);
}

// script.js

// ----- XSS: Небезопасный ввод -----
const commentField = document.getElementById('commentField');
const submitComment = document.getElementById('submitComment');
const commentContent = document.getElementById('commentContent');

if (commentField && submitComment && commentContent) {
  // Небезопасно выводим "как есть"
  submitComment.addEventListener('click', () => {
    commentContent.innerHTML = commentField.value;  // Специально не экранируем
  });
}


// ----- XSS: Безопасный ввод -----
const commentFieldSafe = document.getElementById('commentFieldSafe');
const submitCommentSafe = document.getElementById('submitCommentSafe');
const commentContentSafe = document.getElementById('commentContentSafe');

if (commentFieldSafe && submitCommentSafe && commentContentSafe) {
  // Безопасно экранируем спецсимволы
  submitCommentSafe.addEventListener('click', () => {
    const userInput = commentFieldSafe.value;
    // Простейшая экранизация
    const safeOutput = userInput
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    // Выводим как текст
    commentContentSafe.innerHTML = safeOutput;
  });
}


// ----- Если есть SQL Injection или другие уязвимости, 
//       тут же можно добавить логику по переключению шагов и т.д. -----


// Вешаем обработчики на кнопки внутри шагов
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

// Вешаем обработчики на кнопки меню (1,2,3,4)
stepButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetStep = btn.dataset.step;
    showScreen(targetStep);
  });
});