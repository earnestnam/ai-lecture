# 스킬: page-generator

## 역할
커리큘럼 메타데이터를 읽고, 공통 HTML 골격에서 새 콘텐츠 페이지 파일을 생성한다.

## 트리거
- "새 페이지 생성해줘"
- "다음 페이지 작업"
- "[페이지명] 골격 만들어줘"

## 입력
- 페이지 ID (예: `claude-plugin`)
- `references/curriculum.json`의 해당 페이지 메타데이터

## 출력
- `/src/pages/{page-id}.html` — 골격만 있고 본문 콘텐츠는 비어있는 파일

## 사용 방법
```bash
bash scripts/create-page.sh {page-id}
```

## 주의사항
- 이미 파일이 존재하면 덮어쓰지 않고 경고
- 커리큘럼에 없는 page-id는 거부
