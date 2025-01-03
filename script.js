// script.js

// Получаем ссылки на нужные элементы
const screens = {
  'input-screen': document.getElementById('input-screen'),
  'normal-result': document.getElementById('normal-result'),
  'injection-screen': document.getElementById('injection-screen'),
  'attack-result': document.getElementById('attack-result')
};

const loginBtn = document.getElementById('loginBtn');
const showAttackBtn = document.getElementById('showAttackBtn');
const attackBtn = document.getElementById('attackBtn');
const stepButtons = document.querySelectorAll('.step-btn');

// Функция переключения экранов и выделения активной кнопки
function showScreen(screenId) {
  // Скрываем/показываем нужные блоки
  for (const id in screens) {
    if (id === screenId) {
      screens[id].classList.remove('hidden');
    } else {
      screens[id].classList.add('hidden');
    }
  }

  // Обновляем активное состояние кнопок
  stepButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.step === screenId) {
      btn.classList.add('active');
    }
  });

  // Прокрутка к верху страницы
  window.scrollTo(0,0);
}

// Обработчики кнопок в карточках
loginBtn.addEventListener('click', () => {
  showScreen('normal-result');
});

showAttackBtn.addEventListener('click', () => {
  showScreen('injection-screen');
});

attackBtn.addEventListener('click', () => {
  showScreen('attack-result');
});

// Обработчики кнопок-шагов (навигация слева)
stepButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetStep = btn.dataset.step;
    showScreen(targetStep);
  });
});
