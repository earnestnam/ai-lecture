#!/bin/bash
# check-links.sh — 전체 링크 유효성 검사
# 사용법: bash .claude/skills/site-validator/scripts/check-links.sh

SRC_DIR="src"
ERRORS=0
CHECKED=0

echo "=== 링크 유효성 검사 시작 ==="
echo ""

find "$SRC_DIR" -name "*.html" | while read -r html_file; do
  dir=$(dirname "$html_file")

  # href와 src 속성에서 로컬 링크 추출
  grep -oE '(href|src)="[^"#][^"]*"' "$html_file" | \
    grep -v 'http' | \
    sed 's/(href|src)="//;s/"//' | \
    grep -oE '"[^"]*"' | tr -d '"' | \
    while read -r link; do
      # 앵커(#) 제거
      link_path="${link%%#*}"
      [ -z "$link_path" ] && continue

      # 절대 경로 또는 상대 경로 처리
      if [[ "$link_path" == /* ]]; then
        full_path="${SRC_DIR}${link_path}"
      else
        full_path="${dir}/${link_path}"
      fi

      if [ ! -f "$full_path" ] && [ ! -d "$full_path" ]; then
        echo "❌ 깨진 링크: ${html_file} → ${link_path}"
        ERRORS=$((ERRORS + 1))
      fi
      CHECKED=$((CHECKED + 1))
    done
done

echo ""
echo "=== 검사 완료 ==="
if [ "$ERRORS" -eq 0 ]; then
  echo "✅ 모든 링크가 유효합니다."
else
  echo "❌ ${ERRORS}개의 깨진 링크가 발견되었습니다."
fi
