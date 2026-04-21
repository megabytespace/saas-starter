export interface Env {
  readonly DB: D1Database;
  readonly KV: KVNamespace;
  readonly AI: Ai;
  readonly CLERK_SECRET_KEY: string;
  readonly CLERK_WEBHOOK_SECRET: string;
  readonly STRIPE_SECRET_KEY: string;
  readonly STRIPE_WEBHOOK_SECRET: string;
  readonly TURNSTILE_SECRET: string;
  readonly RESEND_API_KEY: string;
  readonly INNGEST_EVENT_KEY: string;
  readonly INNGEST_SIGNING_KEY: string;
  readonly SENTRY_DSN: string;
  readonly POSTHOG_KEY: string;
  readonly GA_MEASUREMENT_ID: string;
  readonly SITE_NAME: string;
  readonly SITE_DESCRIPTION: string;
  readonly ENVIRONMENT: string;
}
