---
paths:
  - "src/routes/**"
  - "src/lib/**"
---
# API Rules
Inline handlers (type inference). @hono/zod-validator ALL bodies. Error: {error,code?,details?}. Rate limit public: KV per-IP. Turnstile all forms. Drizzle for DB. Webhooks: verify sig→deduplicate→process.
