/**
 * main.js — 공통 JS (사이드바 네비, 모바일 메뉴 등)
 */

// 커리큘럼 네비게이션 데이터
const NAV_DATA = [
  {
    section: '진단',
    icon: '🎯',
    pages: [
      { id: 'ai-why', title: '왜 AI를 써야 하는가?' },
      { id: 'ai-level-quiz', title: 'AI 활용 수준 진단' },
    ]
  },
  {
    section: 'AI 기본기',
    icon: '📚',
    pages: [
      { id: 'ai-landscape', title: 'AI 도구 지도' },
      { id: 'prompt-basics', title: '프롬프트 잘 쓰는 법' },
      { id: 'custom-ai-tools', title: '나만의 AI 어시스턴트 만들기' },
      { id: 'ai-work-habits', title: 'AI와 일하는 습관' },
    ]
  },
  {
    section: 'Claude 영역',
    icon: '🤖',
    pages: [
      { id: 'claude-intro', title: 'Claude 시작하기' },
      { id: 'claude-plugin', title: '플러그인 활용' },
      { id: 'claude-cowork', title: '클로드 코워크' },
      { id: 'claude-code', title: '클로드 코드' },
    ]
  },
  {
    section: 'Gemini 영역',
    icon: '✨',
    pages: [
      { id: 'gemini-intro', title: 'Gemini 활용법' },
      { id: 'notebooklm', title: 'NotebookLM' },
      { id: 'apps-script', title: 'Apps Script 자동화' },
    ]
  },
  {
    section: '부록',
    icon: '📖',
    pages: [
      { id: 'glossary', title: 'AI 용어 사전' },
    ]
  }
];

// 페이지 로드 전에 테마 적용 (깜빡임 방지)
(function () {
  const saved = localStorage.getItem('ai-lecture-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSidebarNav();
  initMobileNav();
  initActiveNavLink();
  initCopyButtons();
});

/**
 * 사이드바 네비게이션 주입 (콘텐츠 페이지 전용, 데스크탑)
 */
function initSidebarNav() {
  const mainEl = document.querySelector('main.content-page');
  if (!mainEl) return; // 랜딩 페이지는 사이드바 없음

  // 현재 파일명 추출
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const currentId = currentFile.replace('.html', '');

  // 사이드바 HTML 생성
  const sidebar = document.createElement('nav');
  sidebar.className = 'sidebar-nav';
  sidebar.setAttribute('aria-label', '강의 목차');

  let html = `<a href="../index.html" class="sidebar-home">← 전체 목차로</a>`;

  NAV_DATA.forEach(section => {
    html += `<div class="sidebar-section">
      <div class="sidebar-section-title">${section.icon} ${section.section}</div>`;
    section.pages.forEach(page => {
      const isActive = page.id === currentId;
      html += `<a href="${page.id}.html" class="sidebar-link${isActive ? ' active' : ''}">${page.title}</a>`;
    });
    html += `</div>`;
  });

  sidebar.innerHTML = html;

  // 레이아웃 래퍼 생성
  const wrapper = document.createElement('div');
  wrapper.className = 'page-with-sidebar';

  // mainEl을 wrapper로 감싸고 sidebar 추가
  mainEl.parentNode.insertBefore(wrapper, mainEl);
  wrapper.appendChild(sidebar);
  wrapper.appendChild(mainEl);
}

/**
 * 모바일 헤더 햄버거 메뉴 — 전체 목차 오버레이
 */
function initMobileNav() {
  const header = document.querySelector('.site-header .container');
  if (!header) return;

  const isDetailPage = !!document.querySelector('main.content-page');
  const currentId = window.location.pathname.split('/').pop().replace('.html', '');

  // 햄버거 버튼
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', '메뉴 열기');
  hamburger.innerHTML = '☰';
  hamburger.style.cssText = `
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-text);
    padding: 0.25rem;
  `;
  header.appendChild(hamburger);

  // 모바일 전체 목차 오버레이
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';

  let overlayHtml = '';

  if (!isDetailPage) {
    // 메인 페이지: 섹션 앵커 링크
    overlayHtml += `<a href="#section-0" class="mobile-nav-section-link">🎯 진단</a>`;
    overlayHtml += `<a href="#section-1" class="mobile-nav-section-link">📚 AI 기본기</a>`;
    overlayHtml += `<a href="#section-2" class="mobile-nav-section-link">🤖 Claude</a>`;
    overlayHtml += `<a href="#section-3" class="mobile-nav-section-link">✨ Gemini</a>`;
    overlayHtml += `<a href="#section-4" class="mobile-nav-section-link">📖 부록</a>`;
  } else {
    // 상세 페이지: 전체 목차 트리
    overlayHtml += `<a href="../index.html" class="mobile-nav-home">← 전체 목차로</a>`;
    NAV_DATA.forEach(section => {
      overlayHtml += `<div class="mobile-nav-section-title">${section.icon} ${section.section}</div>`;
      section.pages.forEach(page => {
        const isActive = page.id === currentId;
        overlayHtml += `<a href="${page.id}.html" class="mobile-nav-link${isActive ? ' active' : ''}">${page.title}</a>`;
      });
    });
  }

  overlay.innerHTML = overlayHtml;
  document.body.appendChild(overlay);

  // 링크 클릭 시 오버레이 닫기
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('is-open');
      hamburger.innerHTML = '☰';
      hamburger.setAttribute('aria-label', '메뉴 열기');
    });
  });

  const mq = window.matchMedia('(max-width: 767px)');
  const handleResize = (m) => {
    hamburger.style.display = m.matches ? 'block' : 'none';
    if (!m.matches) overlay.classList.remove('is-open');
  };
  mq.addEventListener('change', handleResize);
  handleResize(mq);

  hamburger.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-open');
    overlay.classList.toggle('is-open');
    hamburger.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
    hamburger.innerHTML = isOpen ? '☰' : '✕';
  });
}

/**
 * 테마 토글 (라이트/다크 모드)
 */
function initThemeToggle() {
  const header = document.querySelector('.site-header .container');
  if (!header) return;

  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', '테마 변경');

  const updateBtn = (theme) => {
    const isDark = theme === 'dark';
    btn.innerHTML = `<span class="theme-toggle__icon">${isDark ? '☀️' : '🌙'}</span><span class="theme-toggle__label">${isDark ? '라이트 모드' : '다크 모드'}</span>`;
  };

  const getEffectiveTheme = () => {
    const saved = localStorage.getItem('ai-lecture-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  updateBtn(getEffectiveTheme());

  btn.addEventListener('click', () => {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ai-lecture-theme', next);
    updateBtn(next);
  });

  // 햄버거 버튼 앞에 삽입
  const hamburger = header.querySelector('.nav-hamburger');
  if (hamburger) {
    header.insertBefore(btn, hamburger);
  } else {
    header.appendChild(btn);
  }
}

/**
 * 코드 블록 복사 버튼
 */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block-wrapper').querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
        btn.textContent = '✅ 복사됨!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '📋 복사';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

/**
 * 현재 페이지 헤더 nav 링크 active 처리
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.href && currentPath.endsWith(link.getAttribute('href'))) {
      link.style.color = 'var(--color-primary)';
      link.style.fontWeight = '700';
    }
  });
}
