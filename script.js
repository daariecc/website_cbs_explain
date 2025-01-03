// script.js

// ----- ЛОГИКА ДЛЯ SQL INJECTION -----
// Получаем элементы (если их нет на странице, код можно не выполнять)
const inputScreen = document.getElementById('input-screen');
const normalResult = document.getElementById('normal-result');
const injectionScreen = document.getElementById('injection-screen');
const attackResult = document.getElementById('attack-result');

const loginBtn = document.getElementById('loginBtn');
const showAttackBtn = document.getElementById('showAttackBtn');
const attackBtn = document.getElementById('attackBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    if (inputScreen) inputScreen.classList.add('hidden');
    if (normalResult) normalResult.classList.remove('hidden');
    window.scrollTo(0,0);
  });
}

if (showAttackBtn) {
  showAttackBtn.addEventListener('click', () => {
    if (normalResult) normalResult.classList.add('hidden');
    if (injectionScreen) injectionScreen.classList.remove('hidden');
    window.scrollTo(0,0);
  });
}

if (attackBtn) {
  attackBtn.addEventListener('click', () => {
    if (injectionScreen) injectionScreen.classList.add('hidden');
    if (attackResult) attackResult.classList.remove('hidden');
    window.scrollTo(0,0);
  });
}

// ----- ЛОГИКА ДЛЯ XSS -----
const commentField = document.getElementById('commentField');
const submitComment = document.getElementById('submitComment');
const commentContent = document.getElementById('commentContent');

if (submitComment) {
  submitComment.addEventListener('click', () => {
    // Предупреждение: небезопасно вставлять HTML напрямую!
    // Для демонстрации XSS намеренно делаем innerHTML вместо textContent.
    if (commentContent && commentField) {
      commentContent.innerHTML = commentField.value;
    }
  });
}
