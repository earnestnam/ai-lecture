#!/bin/bash
# create-page.sh — 커리큘럼 기반 새 HTML 페이지 골격 생성
# 사용법: bash create-page.sh {page-id}

PAGE_ID=$1
TEMPLATE_FILE="src/pages/_template.html"
OUTPUT_FILE="src/pages/${PAGE_ID}.html"
CURRICULUM_FILE=".claude/skills/page-generator/references/curriculum.json"

if [ -z "$PAGE_ID" ]; then
  echo "오류: 페이지 ID를 입력하세요."
  echo "사용법: bash create-page.sh {page-id}"
  exit 1
fi

if [ -f "$OUTPUT_FILE" ]; then
  echo "경고: ${OUTPUT_FILE} 이미 존재합니다. 덮어쓰지 않습니다."
  exit 1
fi

# curriculum.json에서 메타데이터 추출 (python3 사용)
if ! command -v python3 &> /dev/null; then
  echo "오류: python3가 필요합니다."
  exit 1
fi

METADATA=$(python3 -c "
import json, sys
with open('${CURRICULUM_FILE}') as f:
    data = json.load(f)
for section in data['sections']:
    for page in section['pages']:
        if page['id'] == '${PAGE_ID}':
            print(page['title'])
            print(page['description'])
            print(page['duration'])
            print(page['difficulty'])
            print(page.get('prev', '') or '')
            print(page.get('next', '') or '')
            sys.exit(0)
print('NOT_FOUND')
" 2>/dev/null)

if [ "$METADATA" = "NOT_FOUND" ] || [ -z "$METADATA" ]; then
  echo "오류: '${PAGE_ID}'는 curriculum.json에 없는 페이지 ID입니다."
  exit 1
fi

TITLE=$(echo "$METADATA" | sed -n '1p')
DESCRIPTION=$(echo "$METADATA" | sed -n '2p')
DURATION=$(echo "$METADATA" | sed -n '3p')
DIFFICULTY=$(echo "$METADATA" | sed -n '4p')
PREV_ID=$(echo "$METADATA" | sed -n '5p')
NEXT_ID=$(echo "$METADATA" | sed -n '6p')

PREV_LINK=""
NEXT_LINK=""
[ -n "$PREV_ID" ] && PREV_LINK="<a href=\"${PREV_ID}.html\" class=\"nav-prev\">← 이전</a>"
[ -n "$NEXT_ID" ] && NEXT_LINK="<a href=\"${NEXT_ID}.html\" class=\"nav-next\">다음 →</a>"

cat > "$OUTPUT_FILE" << EOF
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${DESCRIPTION}">
  <title>${TITLE} — AI 활용 강의</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="../index.html" class="site-logo">AI 활용 강의</a>
      <nav class="main-nav">
        <a href="../index.html">홈</a>
      </nav>
    </div>
  </header>

  <main class="content-page">
    <div class="container">
      <div class="page-header">
        <h1>${TITLE}</h1>
        <div class="page-meta">
          <span class="badge badge--duration">⏱ ${DURATION}</span>
          <span class="badge badge--difficulty">${DIFFICULTY}</span>
        </div>
        <p class="page-description">${DESCRIPTION}</p>
      </div>

      <article class="content-body">
        <!-- TODO: 본문 콘텐츠를 여기에 작성하세요 -->
      </article>
    </div>
  </main>

  <nav class="page-nav">
    <div class="container">
      ${PREV_LINK}
      ${NEXT_LINK}
    </div>
  </nav>

  <footer class="site-footer">
    <div class="container">
      <p>AI 활용 강의 &copy; 2025</p>
    </div>
  </footer>

  <script src="../js/main.js" defer></script>
</body>
</html>
EOF

echo "생성 완료: ${OUTPUT_FILE}"
