#!/bin/bash
# One-line SaaS scaffold: creates CF bindings, sets secrets, deploys
# Usage: ./scripts/scaffold.sh <project-name> <domain>
set -euo pipefail
source "$HOME/.claude/hooks/style.sh" 2>/dev/null || true

PROJECT="${1:?Usage: scaffold.sh <project-name> <domain>}"
DOMAIN="${2:?Usage: scaffold.sh <project-name> <domain>}"
ENV_LOCAL="$HOME/emdash-projects/worktrees/rare-chefs-film-8op/.env.local"

emdash_header "Scaffolding $PROJECT" "Domain: $DOMAIN" 2>/dev/null || echo "=== Scaffolding $PROJECT ==="

# Load secrets
if [ -f "$ENV_LOCAL" ]; then
  set -a; source "$ENV_LOCAL" 2>/dev/null; set +a
fi

# Step 1: Replace placeholders
emdash_section "Replacing placeholders" 2>/dev/null || echo "--- Replacing placeholders ---"
find . -type f \( -name '*.ts' -o -name '*.toml' -o -name '*.html' -o -name '*.css' -o -name '*.json' -o -name '*.md' -o -name '*.txt' \) \
  -not -path './node_modules/*' -not -path './.git/*' \
  -exec sed -i '' "s/PROJECT_NAME/$PROJECT/g; s/DOMAIN/$DOMAIN/g; s/SITE_NAME/$PROJECT/g" {} +

# Step 2: Create CF bindings
emdash_section "Creating Cloudflare bindings" 2>/dev/null || echo "--- Creating CF bindings ---"
D1_OUTPUT=$(npx wrangler d1 create "${PROJECT}-db" 2>&1) || true
D1_ID=$(echo "$D1_OUTPUT" | grep -o 'database_id = "[^"]*"' | cut -d'"' -f2)
if [ -n "$D1_ID" ]; then
  sed -i '' "s/database_id = \"\"/database_id = \"$D1_ID\"/" wrangler.toml
  echo "D1: $D1_ID"
fi

KV_OUTPUT=$(npx wrangler kv namespace create KV 2>&1) || true
KV_ID=$(echo "$KV_OUTPUT" | grep -o 'id = "[^"]*"' | head -1 | cut -d'"' -f2)
if [ -n "$KV_ID" ]; then
  sed -i '' "0,/binding = \"KV\"/{/binding = \"KV\"/{n;s/id = \"\"/id = \"$KV_ID\"/;}}" wrangler.toml
  echo "KV: $KV_ID"
fi

CACHE_OUTPUT=$(npx wrangler kv namespace create CACHE 2>&1) || true
CACHE_ID=$(echo "$CACHE_OUTPUT" | grep -o 'id = "[^"]*"' | head -1 | cut -d'"' -f2)
if [ -n "$CACHE_ID" ]; then
  sed -i '' "0,/binding = \"CACHE\"/{/binding = \"CACHE\"/{n;s/id = \"\"/id = \"$CACHE_ID\"/;}}" wrangler.toml
  echo "CACHE: $CACHE_ID"
fi

npx wrangler r2 bucket create "${PROJECT}-uploads" 2>/dev/null || true

# Step 3: Install deps
emdash_section "Installing dependencies" 2>/dev/null || echo "--- Installing deps ---"
bun install 2>/dev/null || npm install

# Step 4: Generate + apply migrations
emdash_section "Database migrations" 2>/dev/null || echo "--- Migrations ---"
npx drizzle-kit generate 2>/dev/null || true
npx wrangler d1 migrations apply "${PROJECT}-db" --remote 2>/dev/null || true

# Step 5: Set secrets
emdash_section "Setting secrets" 2>/dev/null || echo "--- Secrets ---"
for SECRET in CLERK_SECRET_KEY CLERK_WEBHOOK_SECRET STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET TURNSTILE_SECRET RESEND_API_KEY SENTRY_DSN POSTHOG_KEY; do
  VAL=$(eval echo "\${$SECRET:-}")
  if [ -n "$VAL" ]; then
    echo "$VAL" | npx wrangler secret put "$SECRET" 2>/dev/null || true
    echo "Set: $SECRET"
  fi
done

# Step 6: Deploy
emdash_section "Deploying" 2>/dev/null || echo "--- Deploying ---"
npx wrangler deploy

# Step 7: Purge cache
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ] && [ -n "${CLOUDFLARE_ZONE_ID:-}" ]; then
  curl -sX POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{"purge_everything":true}' > /dev/null
  echo "Cache purged"
fi

emdash_success "Deployed to https://$DOMAIN" 2>/dev/null || echo "=== Deployed to https://$DOMAIN ==="
echo "Next: PROD_URL=https://$DOMAIN npx playwright test"
