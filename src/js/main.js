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

document.addEventListener('DOMContentLoaded', () => {
  initSidebarNav();
  initMobileNav();
  initActiveNavLink();
});

/**
 * 사이드바 네비게이션 주입 (콘텐츠 페이지 전용)
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

  // 모바일 토글 버튼
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'sidebar-toggle';
  toggleBtn.setAttribute('aria-label', '목차 열기');
  toggleBtn.innerHTML = '☰ 목차';

  // 레이아웃 래퍼 생성
  const wrapper = document.createElement('div');
  wrapper.className = 'page-with-sidebar';

  // mainEl을 wrapper로 감싸고 sidebar 추가
  mainEl.parentNode.insertBefore(wrapper, mainEl);
  wrapper.appendChild(sidebar);
  wrapper.appendChild(mainEl);

  // 모바일: 사이드바 토글
  mainEl.insertAdjacentElement('beforebegin', toggleBtn);
  toggleBtn.addEventListener('click', () => {
    const isOpen = sidebar.style.display === 'block';
    sidebar.style.display = isOpen ? '' : 'block';
    sidebar.style.position = isOpen ? '' : 'fixed';
    sidebar.style.zIndex = isOpen ? '' : '200';
    sidebar.style.top = isOpen ? '' : '60px';
    sidebar.style.left = isOpen ? '' : '0';
    sidebar.style.width = isOpen ? '' : '80vw';
    sidebar.style.maxWidth = isOpen ? '' : '300px';
    sidebar.style.height = isOpen ? '' : 'calc(100vh - 60px)';
    toggleBtn.innerHTML = isOpen ? '☰ 목차' : '✕ 닫기';
  });
}

/**
 * 모바일 헤더 햄버거 메뉴
 */
function initMobileNav() {
  const header = document.querySelector('.site-header .container');
  if (!header) return;
  const nav = header.querySelector('.main-nav');
  if (!nav) return;

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

  const mq = window.matchMedia('(max-width: 767px)');
  const handleResize = (m) => {
    hamburger.style.display = m.matches ? 'block' : 'none';
    if (!m.matches) nav.style.display = '';
  };
  mq.addEventListener('change', handleResize);
  handleResize(mq);

  hamburger.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex';
    Object.assign(nav.style, {
      display: isOpen ? 'none' : 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '60px', left: '0', right: '0',
      backgroundColor: 'var(--color-surface)',
      padding: '1rem',
      borderBottom: '1px solid var(--color-border)',
      zIndex: '100'
    });
    if (isOpen) nav.style.display = 'none';
    hamburger.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
    hamburger.innerHTML = isOpen ? '☰' : '✕';
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
