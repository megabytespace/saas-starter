export interface Env {
  /** Data */
  readonly DB: D1Database;
  readonly KV: KVNamespace;
  readonly CACHE: KVNamespace;
  readonly R2: R2Bucket;
  readonly AI: Ai;
  // readonly VECTORIZE: VectorizeIndex;
  // readonly JOBS: Queue;
  // readonly SESSION: DurableObjectNamespace;

  /** Auth */
  readonly CLERK_SECRET_KEY: string;
  readonly CLERK_WEBHOOK_SECRET: string;

  /** Billing */
  readonly STRIPE_SECRET_KEY: string;
  readonly STRIPE_WEBHOOK_SECRET: string;

  /** Security */
  readonly TURNSTILE_SECRET: string;

  /** Email */
  readonly RESEND_API_KEY: string;

  /** Workflows */
  readonly INNGEST_EVENT_KEY: string;
  readonly INNGEST_SIGNING_KEY: string;

  /** Observability */
  readonly SENTRY_DSN: string;
  readonly POSTHOG_KEY: string;
  readonly GA_MEASUREMENT_ID: string;

  /** Config */
  readonly SITE_NAME: string;
  readonly SITE_DESCRIPTION: string;
  readonly ENVIRONMENT: string;
}
