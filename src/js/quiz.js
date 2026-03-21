/**
 * quiz.js — AI 활용 수준 진단 퀴즈 로직
 * 대상 페이지: pages/ai-level-quiz.html
 */

const STORAGE_KEY = 'ai-lecture-quiz-result';

// 퀴즈 질문 데이터 (ai-level-quiz.html에서 초기화 시 사용)
// 실제 질문은 ai-level-quiz.html에서 QUIZ_DATA로 정의됩니다.

class Quiz {
  constructor(questions, containerSelector) {
    this.questions = questions;
    this.currentIndex = 0;
    this.answers = [];
    this.container = document.querySelector(containerSelector);

    if (!this.container) return;

    this.progressFill = document.getElementById('quizProgressFill');
    this.progressText = document.getElementById('quizProgressText');
    this.questionText = document.getElementById('questionText');
    this.questionOptions = document.getElementById('questionOptions');
    this.quizQuestion = document.getElementById('quizQuestion');
    this.quizResult = document.getElementById('quizResult');

    this.init();
  }

  init() {
    // 저장된 결과 확인
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const result = JSON.parse(saved);
      this.showResult(result.level, result.score);
      return;
    }

    this.renderQuestion();

    // 다시 진단하기 버튼
    const retakeBtn = document.getElementById('retakeQuiz');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => this.reset());
    }
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    const total = this.questions.length;
    const progress = ((this.currentIndex) / total) * 100;

    if (this.progressFill) this.progressFill.style.width = `${progress}%`;
    if (this.progressText) this.progressText.textContent = `${this.currentIndex + 1} / ${total}`;
    if (this.questionText) this.questionText.textContent = q.question;

    if (this.questionOptions) {
      this.questionOptions.innerHTML = '';
      q.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option.text;
        btn.dataset.score = option.score;
        btn.addEventListener('click', () => this.selectOption(option.score));
        this.questionOptions.appendChild(btn);
      });
    }
  }

  selectOption(score) {
    this.answers.push(score);
    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      const total = this.answers.reduce((sum, s) => sum + s, 0);
      const level = this.calculateLevel(total);
      this.saveResult(level, total);
      this.showResult(level, total);
    } else {
      this.renderQuestion();
    }
  }

  calculateLevel(totalScore) {
    const max = this.questions.length * 3; // 최대 점수 (각 질문 최고 3점 기준)
    const ratio = totalScore / max;

    if (ratio >= 0.8) return 5;
    if (ratio >= 0.6) return 4;
    if (ratio >= 0.4) return 3;
    if (ratio >= 0.2) return 2;
    return 1;
  }

  saveResult(level, score) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ level, score, date: new Date().toISOString() }));
  }

  showResult(level, score) {
    if (this.quizQuestion) this.quizQuestion.classList.add('hidden');
    if (this.quizResult) this.quizResult.classList.remove('hidden');

    const levelEl = document.getElementById('resultLevel');
    const titleEl = document.getElementById('resultTitle');
    const descEl = document.getElementById('resultDescription');
    const recoEl = document.getElementById('recommendedPages');

    const LEVELS = {
      1: {
        title: '탐색 단계',
        description: 'AI 도구가 낯설게 느껴지시나요? 괜찮습니다! 기초부터 차근차근 시작해봐요. "왜 AI를 써야 하는가"부터 읽고, AI 도구 지도를 통해 전체 그림을 파악하는 것을 추천드립니다.',
        pages: ['ai-why', 'ai-landscape', 'prompt-basics']
      },
      2: {
        title: '입문 단계',
        description: 'AI 도구를 가끔 사용해본 경험이 있으시군요. 프롬프트를 더 잘 쓰는 법과 Claude 기본 활용법을 익히면 업무 효율이 크게 높아질 거예요.',
        pages: ['prompt-basics', 'ai-work-habits', 'claude-intro']
      },
      3: {
        title: '활용 단계',
        description: 'AI를 꽤 다양하게 활용하고 있으시네요! 이제 플러그인과 연동 기능을 통해 더 깊이 파고들어봐요.',
        pages: ['claude-plugin', 'claude-cowork', 'gemini-intro']
      },
      4: {
        title: '숙련 단계',
        description: '훌륭합니다! AI를 업무에 잘 활용하고 있으시네요. Claude Code와 Apps Script로 자동화 레벨까지 올려봐요.',
        pages: ['claude-code', 'notebooklm', 'apps-script']
      },
      5: {
        title: '전문가 단계',
        description: 'AI 활용의 최전선에 계시네요! NotebookLM과 Apps Script를 통해 더욱 고도화된 워크플로우를 구축해보세요.',
        pages: ['notebooklm', 'apps-script', 'claude-code']
      }
    };

    const result = LEVELS[level];

    if (levelEl) levelEl.textContent = `Lv.${level}`;
    if (titleEl) titleEl.textContent = result.title;
    if (descEl) descEl.textContent = result.description;

    if (recoEl && result.pages) {
      recoEl.innerHTML = result.pages.map(pageId => {
        return `<li><a href="${pageId}.html">${pageId}</a></li>`;
      }).join('');
    }

    // 진행 바 100%
    if (this.progressFill) this.progressFill.style.width = '100%';
    if (this.progressText) this.progressText.textContent = `완료`;
  }

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    this.currentIndex = 0;
    this.answers = [];
    if (this.quizResult) this.quizResult.classList.add('hidden');
    if (this.quizQuestion) this.quizQuestion.classList.remove('hidden');
    this.renderQuestion();
  }
}

// 전역으로 노출
window.Quiz = Quiz;
