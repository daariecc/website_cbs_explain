// script.js

// Собираем экраны (если есть на странице)
const screens = {
  'input-screen': document.getElementById('input-screen'),
  'normal-result': document.getElementById('normal-result'),
  'injection-screen': document.getElementById('injection-screen'),
  'attack-result': document.getElementById('attack-result')
};

// Кнопки внутри сценария
const loginBtn = document.getElementById('loginBtn');
const showAttackBtn = document.getElementById('showAttackBtn');
const attackBtn = document.getElementById('attackBtn');

// Кнопки шагов (меню сверху)
const stepButtons = document.querySelectorAll('.step-btn');

// Функция переключения экранов
function showScreen(screenId) {
  // Скрываем всё, показываем нужное
  for (const id in screens) {
    if (screens[id]) {
      screens[id].classList.add('hidden');
    }
  }
  if (screens[screenId]) {
    screens[screenId].classList.remove('hidden');
  }

  // Обновляем активное состояние кнопок
  stepButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.step === screenId) {
      btn.classList.add('active');
    }
  });

  window.scrollTo(0,0);
}

// Обработчики для внутренних кнопок
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

// Обработчики для меню шагов (1, 2, 3, 4)
if (stepButtons) {
  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = btn.dataset.step;
      showScreen(targetStep);
    });
  });
}
