#!/bin/bash
# check-structure.sh — HTML 필수 구조 검사
# 사용법: bash .claude/skills/site-validator/scripts/check-structure.sh [파일경로]
#         파일경로 생략 시 src/ 전체 검사

TARGET=${1:-"src"}
ERRORS=0
FILES=0

echo "=== HTML 구조 검사 시작 ==="
echo ""

check_file() {
  local file=$1
  local file_errors=0
  FILES=$((FILES + 1))

  # lang="ko" 확인
  if ! grep -q 'lang="ko"' "$file"; then
    echo "  ❌ lang=\"ko\" 없음"
    file_errors=$((file_errors + 1))
  fi

  # charset 확인
  if ! grep -qi 'charset.*utf-8' "$file"; then
    echo "  ❌ charset=UTF-8 없음"
    file_errors=$((file_errors + 1))
  fi

  # title 확인
  if ! grep -q '<title>' "$file"; then
    echo "  ❌ <title> 없음"
    file_errors=$((file_errors + 1))
  fi

  # site-header 확인
  if ! grep -q 'site-header' "$file"; then
    echo "  ❌ .site-header 없음"
    file_errors=$((file_errors + 1))
  fi

  # site-footer 확인
  if ! grep -q 'site-footer' "$file"; then
    echo "  ❌ .site-footer 없음"
    file_errors=$((file_errors + 1))
  fi

  # pages/ 하위 파일은 page-nav 필수
  if [[ "$file" == */pages/*.html ]]; then
    if ! grep -q 'page-nav' "$file"; then
      echo "  ❌ .page-nav (이전/다음 네비게이션) 없음"
      file_errors=$((file_errors + 1))
    fi
  fi

  # 이미지 alt 텍스트 확인
  if grep -q '<img' "$file"; then
    if grep -E '<img[^>]+>' "$file" | grep -qv 'alt='; then
      echo "  ❌ alt 없는 <img> 태그 존재"
      file_errors=$((file_errors + 1))
    fi
  fi

  if [ "$file_errors" -eq 0 ]; then
    echo "  ✅ 통과"
  else
    ERRORS=$((ERRORS + file_errors))
  fi
}

if [ -f "$TARGET" ]; then
  echo "파일: $TARGET"
  check_file "$TARGET"
else
  find "$TARGET" -name "*.html" | sort | while read -r html_file; do
    echo "파일: $html_file"
    check_file "$html_file"
  done
fi

echo ""
echo "=== 검사 완료 ==="
if [ "$ERRORS" -eq 0 ]; then
  echo "✅ 모든 구조 검사를 통과했습니다."
else
  echo "❌ ${ERRORS}개의 구조 오류가 발견되었습니다."
fi
