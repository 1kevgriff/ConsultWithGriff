#!/usr/bin/env bash
#
# Create Typefully social media drafts for a blog post.
#
# Usage:
#   ./scripts/create-typefully-drafts.sh <slug> <copy-dir>
#
# Requirements:
#   - TYPEFULLY_API_KEY environment variable set
#   - OG image at public/og/<slug>.png
#   - curl installed
#   - Copy directory with platform text files:
#       <copy-dir>/x.txt        (X/Twitter copy)
#       <copy-dir>/linkedin.txt (LinkedIn copy)
#       <copy-dir>/mastodon.txt (Mastodon copy)
#       <copy-dir>/bluesky.txt  (Bluesky copy)
#
# The script creates a single Typefully draft with platform-specific
# copy for each connected platform (X, LinkedIn, Mastodon, Bluesky)
# and the OG image attached. The draft is saved — not published — so
# you can review and schedule in Typefully.
#
# Each platform file should contain the post text WITHOUT the article
# URL — the script appends it automatically.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
API_BASE="https://api.typefully.com/v2"

# ── Args & validation ────────────────────────────────────────────────
SLUG="${1:-}"
COPY_DIR="${2:-}"
if [[ -z "$SLUG" || -z "$COPY_DIR" ]]; then
  echo "Usage: $0 <slug> <copy-dir>"
  echo "Example: $0 sql-pagination-count-over-trick /tmp/social-copy"
  echo ""
  echo "The copy directory should contain platform text files:"
  echo "  x.txt, linkedin.txt, mastodon.txt, bluesky.txt"
  exit 1
fi

if [[ ! -d "$COPY_DIR" ]]; then
  echo "❌ Copy directory not found: $COPY_DIR"
  exit 1
fi

if [[ -z "${TYPEFULLY_API_KEY:-}" ]]; then
  echo "❌ TYPEFULLY_API_KEY environment variable is not set."
  echo "Get your key from Typefully → Settings → API."
  exit 1
fi

OG_IMAGE="$PROJECT_ROOT/public/og/${SLUG}.png"
if [[ ! -f "$OG_IMAGE" ]]; then
  echo "❌ OG image not found: public/og/${SLUG}.png"
  echo "Generate it first: npm run generate:og"
  exit 1
fi

POST_URL="https://consultwithgriff.com/${SLUG}"
AUTH_HEADER="Authorization: Bearer ${TYPEFULLY_API_KEY}"

# ── Platform character limits ────────────────────────────────────────
# X:        280 chars (standard) / 25,000 (Premium). URLs = 23 via t.co.
# LinkedIn: 3,000 chars. URLs count at full length.
# Mastodon: 500 chars (default; varies by instance). URLs = 23.
# Bluesky:  300 chars. URLs count at full length.
LIMIT_X=280
LIMIT_LINKEDIN=3000
LIMIT_MASTODON=500
LIMIT_BLUESKY=300
TCO_LENGTH=23  # X and Mastodon shorten URLs to this length

# ── Helpers ──────────────────────────────────────────────────────────
api() {
  local method="$1" endpoint="$2"
  shift 2
  curl -s -X "$method" "${API_BASE}${endpoint}" \
    -H "$AUTH_HEADER" \
    -H "Content-Type: application/json" \
    "$@"
}

# Count effective characters for a platform.
# Usage: check_length <platform> <limit> <text> [url_counts_as]
#   url_counts_as: set to 23 for platforms that shorten URLs (X, Mastodon)
#                  omit for platforms that count full URL length (LinkedIn, Bluesky)
check_length() {
  local platform="$1" limit="$2" text="$3" url_len="${4:-}"
  python3 -c "
import sys, re
text = '''$text'''
limit = $limit
url_len = '$url_len'

if url_len:
    # Replace each URL with a placeholder of url_len characters
    url_pattern = r'https?://\S+'
    effective = re.sub(url_pattern, 'x' * int(url_len), text)
else:
    effective = text

count = len(effective)
if count > limit:
    print(f'⚠️  {\"$platform\"} post is {count} chars (limit: {limit}). Over by {count - limit}.', file=sys.stderr)
    sys.exit(1)
else:
    print(f'  {\"$platform\"}: {count}/{limit} chars')
" 2>&1
}

# ── Step 1: Get social set ID ────────────────────────────────────────
echo "Fetching social set..."
SOCIAL_SET_ID=$(api GET "/social-sets" | python3 -c "import sys,json; print(json.load(sys.stdin)['results'][0]['id'])" 2>/dev/null) || {
  echo "❌ Failed to get social set. Check your TYPEFULLY_API_KEY."
  exit 1
}
echo "  Social set: $SOCIAL_SET_ID"

# ── Step 2: Check connected platforms ────────────────────────────────
echo "Checking connected platforms..."
PLATFORMS_JSON=$(api GET "/social-sets/${SOCIAL_SET_ID}/")
CONNECTED=""
for p in x linkedin mastodon threads bluesky; do
  val=$(echo "$PLATFORMS_JSON" | python3 -c "import sys,json; d=json.load(sys.stdin); p=d.get('platforms',{}).get('$p'); print('yes' if p else 'no')" 2>/dev/null)
  if [[ "$val" == "yes" ]]; then
    CONNECTED="$CONNECTED $p"
  fi
done
echo "  Connected:${CONNECTED}"

# ── Step 3: Upload OG image ──────────────────────────────────────────
echo "Uploading OG image..."
UPLOAD_RESPONSE=$(api POST "/social-sets/${SOCIAL_SET_ID}/media/upload" \
  -d "{\"file_name\": \"${SLUG}.png\", \"media_type\": \"image/png\"}")

MEDIA_ID=$(echo "$UPLOAD_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['media_id'])" 2>/dev/null)
UPLOAD_URL=$(echo "$UPLOAD_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['upload_url'])" 2>/dev/null)

if [[ -z "$MEDIA_ID" || -z "$UPLOAD_URL" ]]; then
  echo "❌ Failed to get upload URL from Typefully."
  exit 1
fi
echo "  Media ID: $MEDIA_ID"

# PUT file to S3 (presigned URL was signed with empty Content-Type)
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$UPLOAD_URL" \
  -H "Content-Type:" \
  -T "$OG_IMAGE")

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "❌ S3 upload failed (HTTP $HTTP_CODE)."
  exit 1
fi
echo "  Image uploaded."

# Poll until ready (usually instant)
for i in {1..10}; do
  STATUS=$(api GET "/social-sets/${SOCIAL_SET_ID}/media/${MEDIA_ID}" | \
    python3 -c "import sys,json; print(json.load(sys.stdin).get('status',''))" 2>/dev/null)
  [[ "$STATUS" == "ready" ]] && break
  sleep 2
done

if [[ "$STATUS" != "ready" ]]; then
  echo "⚠️  Media not ready after polling. Proceeding anyway."
fi

# ── Step 4: Build platform copy from text files ──────────────────────
#
# Reads copy from <copy-dir>/<platform>.txt for each connected platform.
# The article URL is appended automatically. Platforms without a text
# file are skipped.

echo ""

# X (Twitter) — 280 chars standard. URLs = 23 via t.co. Media doesn't count.
X_TEXT=""
if [[ "$CONNECTED" == *"x"* && -f "$COPY_DIR/x.txt" ]]; then
  X_TEXT="$(cat "$COPY_DIR/x.txt")"$'\n\n'"$POST_URL"
fi

# LinkedIn — 3,000 chars. Full URL length counts.
LI_TEXT=""
if [[ "$CONNECTED" == *"linkedin"* && -f "$COPY_DIR/linkedin.txt" ]]; then
  LI_TEXT="$(cat "$COPY_DIR/linkedin.txt")"$'\n\n'"$POST_URL"
fi

# Mastodon — 500 chars (default). URLs = 23.
MASTO_TEXT=""
if [[ "$CONNECTED" == *"mastodon"* && -f "$COPY_DIR/mastodon.txt" ]]; then
  MASTO_TEXT="$(cat "$COPY_DIR/mastodon.txt")"$'\n\n'"$POST_URL"
fi

# Bluesky — 300 chars. Full URL length counts. Tightest limit.
BSKY_TEXT=""
if [[ "$CONNECTED" == *"bluesky"* && -f "$COPY_DIR/bluesky.txt" ]]; then
  BSKY_TEXT="$(cat "$COPY_DIR/bluesky.txt")"$'\n\n'"$POST_URL"
fi

# ── Validate character limits ─────────────────────────────────────
echo "Validating character limits..."
FAILED=0

if [[ -n "$X_TEXT" ]]; then
  check_length "X" "$LIMIT_X" "$X_TEXT" "$TCO_LENGTH" || FAILED=1
fi
if [[ -n "$LI_TEXT" ]]; then
  check_length "LinkedIn" "$LIMIT_LINKEDIN" "$LI_TEXT" || FAILED=1
fi
if [[ -n "$MASTO_TEXT" ]]; then
  check_length "Mastodon" "$LIMIT_MASTODON" "$MASTO_TEXT" "$TCO_LENGTH" || FAILED=1
fi
if [[ -n "$BSKY_TEXT" ]]; then
  check_length "Bluesky" "$LIMIT_BLUESKY" "$BSKY_TEXT" || FAILED=1
fi

if [[ "$FAILED" -ne 0 ]]; then
  echo ""
  echo "❌ One or more posts exceed platform character limits."
  echo "   Shorten the text or split into a thread (multiple posts array entries)."
  exit 1
fi

# ── Create single draft with all platforms ────────────────────────
echo ""
echo "Creating draft..."

# Build one JSON payload with all connected platforms enabled
DRAFT_BODY=$(python3 -c "
import json

platforms = {}
media = ['${MEDIA_ID}']

x_text = '''${X_TEXT}'''
li_text = '''${LI_TEXT}'''
masto_text = '''${MASTO_TEXT}'''
bsky_text = '''${BSKY_TEXT}'''

if x_text.strip():
    platforms['x'] = {'enabled': True, 'posts': [{'text': x_text, 'media_ids': media}]}
else:
    platforms['x'] = {'enabled': False}

if li_text.strip():
    platforms['linkedin'] = {'enabled': True, 'posts': [{'text': li_text, 'media_ids': media}]}
else:
    platforms['linkedin'] = {'enabled': False}

if masto_text.strip():
    platforms['mastodon'] = {'enabled': True, 'posts': [{'text': masto_text, 'media_ids': media}]}
else:
    platforms['mastodon'] = {'enabled': False}

if bsky_text.strip():
    platforms['bluesky'] = {'enabled': True, 'posts': [{'text': bsky_text, 'media_ids': media}]}
else:
    platforms['bluesky'] = {'enabled': False}

print(json.dumps({'platforms': platforms}))
" 2>/dev/null)

RESPONSE=$(api POST "/social-sets/${SOCIAL_SET_ID}/drafts" -d "$DRAFT_BODY")
DRAFT_URL=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('private_url',''))" 2>/dev/null)

if [[ -z "$DRAFT_URL" ]]; then
  echo "❌ Failed to create draft."
  echo "$RESPONSE"
  exit 1
fi

echo "  ✅ Draft created: ${DRAFT_URL}"
echo ""
echo "Done. Review and schedule at https://typefully.com"
