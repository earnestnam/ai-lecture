# AI 활용 강의 웹사이트 — 에이전트 지침

## 1. 프로젝트 개요

**목적**: 회사 내 비개발자들이 AI 도구를 업무에 자연스럽게 활용할 수 있도록 돕는 강의용 웹사이트.
**대상 독자**: 개발 경험이 없는 일반 직장인 (마케터, 기획자, 운영팀 등)
**배포**: GitHub Pages (정적 사이트, 빌드 도구 없음)
**참고 모델**: [AI Roasting — Claude 완전 정복](https://airoasting.github.io/claude_guide/)

---

## 2. 디자인 원칙

### 시각 스타일
- **색상 팔레트**: CSS 변수(`--color-primary`, `--color-secondary` 등)로 중앙 관리
- **타이포그래피**: 시스템 폰트 스택, 본문 16px 이상, 줄간격 1.6
- **카드 스타일**: 아이콘 + 제목 + 설명 + 소요시간/난이도 배지
- **다크/라이트 모드**: `prefers-color-scheme` 미디어 쿼리 대응

### 반응형 브레이크포인트
- 데스크탑: 1024px 이상 — 카드 3열, 사이드바 네비게이션
- 태블릿: 768px ~ 1023px — 카드 2열
- 모바일: 767px 이하 — 카드 1열, 상단 드롭다운 네비게이션

### 레이아웃 패턴
- 히어로 섹션: 사이트 제목 + 한 줄 설명 + CTA 버튼
- 섹션 구분: 배경색 교차로 시각적 분리
- 콘텐츠 페이지: 좌측 사이드바(데스크탑) / 상단 드롭다운(모바일)
- 팁/경고 박스: 배경색이 다른 강조 블록
- 이전/다음 네비게이션: 페이지 하단

---

## 3. 커리큘럼 구조

### 섹션 0 — 진단
| 파일 | 제목 | 소요시간 | 난이도 |
|------|------|----------|--------|
| `pages/ai-why.html` | 왜 AI를 써야 하는가? | 10분 | 입문 |
| `pages/ai-level-quiz.html` | 나의 AI 활용 수준 진단 | 15분 | 입문 |

### 섹션 1 — AI 기본기
| 파일 | 제목 | 소요시간 | 난이도 |
|------|------|----------|--------|
| `pages/ai-landscape.html` | AI 도구 지도 | 20분 | 입문 |
| `pages/prompt-basics.html` | 프롬프트 잘 쓰는 법 | 25분 | 초급 |
| `pages/ai-work-habits.html` | AI와 일하는 습관 만들기 | 20분 | 초급 |

### 섹션 2 — Claude 영역
| 파일 | 제목 | 소요시간 | 난이도 |
|------|------|----------|--------|
| `pages/claude-intro.html` | Claude 시작하기 | 20분 | 초급 |
| `pages/claude-plugin.html` | 플러그인 활용 | 25분 | 초급 |
| `pages/claude-cowork.html` | 클로드 코워크 | 25분 | 중급 |
| `pages/claude-code.html` | 클로드 코드 | 30분 | 중급 |

### 섹션 3 — Gemini 영역
| 파일 | 제목 | 소요시간 | 난이도 |
|------|------|----------|--------|
| `pages/gemini-intro.html` | Gemini 활용법 | 20분 | 초급 |
| `pages/notebooklm.html` | NotebookLM 활용법 | 25분 | 초급 |
| `pages/apps-script.html` | Apps Script 자동화 | 35분 | 중급 |

### 부록
| 파일 | 제목 | 소요시간 | 난이도 |
|------|------|----------|--------|
| `pages/glossary.html` | AI 용어 사전 | 참고용 | — |

---

## 4. 콘텐츠 작성 규칙

### 톤 & 스타일
- **친근하고 실용적**: "~합니다" 체, 딱딱한 기술 문서 톤 지양
- **비유 적극 활용**: AI를 "똑똑한 인턴", 프롬프트를 "업무 지시서" 등으로 설명
- **기술 용어 최소화**: 불가피한 경우 괄호로 쉬운 설명 추가
- **구체적 예시**: 추상적 설명 대신 실제 업무 시나리오 3개 이상 포함

### 페이지 필수 구성 요소
1. **도입부** (1~2문단): 왜 이 내용이 중요한지
2. **핵심 내용**: 단계별 설명 + 스크린샷 자리표시자 `[📸 스크린샷: ...]`
3. **팁 박스**: `<div class="tip-box">` 안에 실용적 팁
4. **실습 과제 또는 체크리스트**: 인터랙티브 요소
5. **이전/다음 네비게이션**: 커리큘럼 흐름 유지

### 금지 표현
- "~를 수행하십시오" → "~해보세요"
- "API", "엔드포인트", "파라미터" (설명 없이 단독 사용)
- 영문 약어 나열 (GPT, LLM 등은 처음 등장 시 풀어서 설명)

---

## 5. 코딩 규칙

### HTML
- DOCTYPE, lang="ko", charset=UTF-8 필수
- 시맨틱 태그 사용: `<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`
- 이미지 alt 텍스트 필수
- CSS는 `<link rel="stylesheet" href="../css/style.css">` (pages/ 기준 상대 경로)
- JS는 `<script src="../js/main.js" defer>` (pages/ 기준 상대 경로)

### CSS
- CSS 변수는 `:root`에서 정의
- BEM-lite 클래스명: `.card`, `.card__title`, `.card--featured`
- 인라인 스타일 금지

### JS
- ES6+ 문법 (const/let, 화살표 함수, 템플릿 리터럴)
- var 사용 금지
- localStorage 키 prefix: `ai-lecture-`

### 파일 명명
- HTML: kebab-case (예: `claude-intro.html`)
- CSS/JS: kebab-case
- 이미지: `[페이지]-[설명].png` (예: `claude-intro-project-setup.png`)

---

## 6. 작업 순서

```
Phase 1: 뼈대
  1. 폴더 구조 ✓
  2. CSS 변수·공통 스타일 (style.css)
  3. 공통 JS (main.js)
  4. 랜딩 페이지 (index.html)

Phase 2: 핵심 콘텐츠
  5. ai-why.html + ai-level-quiz.html
  6. ai-landscape.html + prompt-basics.html + ai-work-habits.html
  7. claude-intro.html ~ claude-code.html
  8. gemini-intro.html ~ apps-script.html

Phase 3: 마무리
  9. glossary.html
  10. 통합 테스트 + 링크 검증
  11. GitHub Pages 배포
```

---

## 7. 검증 체크리스트

각 페이지 완성 시 확인:
- [ ] HTML 유효성 (DOCTYPE, lang, charset)
- [ ] 이전/다음 링크가 존재하는 파일을 가리킴
- [ ] 이미지 alt 텍스트 존재
- [ ] 팁 박스 1개 이상
- [ ] 실습 과제 또는 체크리스트 포함
- [ ] 모바일에서 가독성 확인 (브레이크포인트)

---

## 8. 스킬 참조

| 스킬 | 언제 사용 |
|------|----------|
| `page-generator` | 새 콘텐츠 페이지 골격 생성 시 |
| `content-writer` | 빈 페이지에 본문 콘텐츠 작성 시 |
| `quiz-builder` | ai-level-quiz.html 또는 체크리스트 구현 시 |
| `site-validator` | 페이지 완성 후 검증, "검증해줘" 요청 시 |
