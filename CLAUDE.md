# PROJECT_NAME

## Product
One-line: [PRODUCT_THESIS]
Users: [TARGET_USERS]
Model: [BUSINESS_MODEL]

## Architecture
CF Worker+Hono API | Angular 19 frontend | D1 database | Clerk auth | Stripe billing | Inngest workflows | Resend email

## Conventions
See global ~/.claude/rules/ for universal rules. Project-specific rules in .claude/rules/.
All routes: @hono/zod-validator. Error envelope: {error,code?,details?}. Turnstile all forms.

## Deploy
```
npx wrangler deploy && curl -sX POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache" -H "Authorization: Bearer ${CF_API_TOKEN}" -H "Content-Type: application/json" -d '{"purge_everything":true}'
```

## Test
```
PROD_URL=https://DOMAIN npx playwright test
```
