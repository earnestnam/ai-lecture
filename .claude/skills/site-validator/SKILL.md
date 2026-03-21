# 스킬: site-validator

## 역할
사이트 전체 또는 개별 페이지의 품질을 검증한다.

## 트리거
- 페이지 완성 시 자동
- "검증해줘", "테스트 돌려줘", "링크 확인해줘"

## 입력
- 검사 대상 파일 경로 (없으면 전체 src/ 검사)

## 출력
- 검증 결과 리포트 (stdout) — 통과/실패 항목 목록

## 스크립트

### check-links.sh
- src/ 내 모든 HTML 파일에서 `href="..."`, `src="..."` 추출
- 로컬 파일 링크가 실제 존재하는지 확인
- 깨진 링크 목록 출력

### check-structure.sh
- 각 HTML 파일에서 필수 요소 확인:
  - `<html lang="ko">` 존재
  - `<meta charset="UTF-8">` 존재
  - `<title>` 존재
  - `.site-header` 존재
  - `.page-nav` 존재 (index.html 제외)
  - `.site-footer` 존재
  - 이미지 `alt` 속성 존재

## 사용법
```bash
bash .claude/skills/site-validator/scripts/check-links.sh
bash .claude/skills/site-validator/scripts/check-structure.sh [파일경로]
```
