# 스킬: quiz-builder

## 역할
진단 퀴즈 UI·로직과 페이지별 체크리스트 JS를 구현한다.

## 트리거
- `ai-level-quiz.html` 작업 시작
- "퀴즈 만들어줘"
- "체크리스트 구현해줘"

## 입력
- 퀴즈 질문 목록 (LLM이 설계)
- 체크리스트 항목 (해당 페이지에서 정의)

## 출력
- `src/js/quiz.js` — 퀴즈 로직 (점수 계산, 결과 표시, 추천 경로)
- `src/js/checklist.js` — 체크리스트 localStorage 연동
- 해당 HTML 마크업 (quiz 또는 checklist 섹션)

## 퀴즈 스펙 (ai-level-quiz)
- 10문항, 각 문항에 4지선다
- 점수 계산: 총점 → 1~5단계 판정
- 결과 화면: 단계 설명 + 추천 학습 경로 (curriculum.json 기반)
- 결과는 localStorage에 저장 (`ai-lecture-quiz-result`)

## 체크리스트 스펙
- 각 항목: `<input type="checkbox" data-key="{page-id}-{n}">`
- 체크 상태: localStorage에 저장 (`ai-lecture-checklist-{page-id}`)
- 페이지 로드 시 저장된 상태 복원

## 자기 검증 체크
- [ ] JS 콘솔 에러 없음
- [ ] 퀴즈: 모든 선택지 클릭 시 다음 문항으로 이동
- [ ] 퀴즈: 마지막 문항 후 결과 화면 표시
- [ ] 체크리스트: 새로고침 후 상태 유지
