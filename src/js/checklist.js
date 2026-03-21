/**
 * checklist.js — 체크리스트 localStorage 연동
 * 모든 콘텐츠 페이지의 체크리스트에서 공통 사용
 */

document.addEventListener('DOMContentLoaded', () => {
  initChecklists();
});

function initChecklists() {
  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    const key = checkbox.dataset.key;
    if (!key) return;

    const storageKey = `ai-lecture-checklist-${key}`;

    // 저장된 상태 복원
    const saved = localStorage.getItem(storageKey);
    if (saved === 'true') {
      checkbox.checked = true;
      updateLabel(checkbox);
    }

    // 변경 시 저장
    checkbox.addEventListener('change', () => {
      localStorage.setItem(storageKey, checkbox.checked);
      updateLabel(checkbox);
    });
  });
}

function updateLabel(checkbox) {
  const label = checkbox.closest('label');
  if (!label) return;

  if (checkbox.checked) {
    label.classList.add('checked');
  } else {
    label.classList.remove('checked');
  }
}
