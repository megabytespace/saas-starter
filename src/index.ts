import { Hono } from 'hono';
import { secureHeaders } from 'hono/secure-headers';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { Env } from './types';
import { healthRoute } from './routes/health';
import { authRoute } from './routes/auth';
import { billingRoute } from './routes/billing';
import { apiRoute } from './routes/api';

const app = new Hono<{ Bindings: Env }>();

app.use('*', logger());
app.use('*', secureHeaders());
app.use('/api/*', cors({ origin: ['https://DOMAIN'] }));

app.route('/health', healthRoute);
app.route('/auth', authRoute);
app.route('/billing', billingRoute);
app.route('/api', apiRoute);

app.onError((err, c) => {
  console.error(`[${c.req.method}] ${c.req.url}`, err);
  // Sentry breadcrumb
  return c.json({ error: 'Internal server error', code: 'INTERNAL' }, 500);
});

app.notFound((c) => c.json({ error: 'Not found', code: 'NOT_FOUND' }, 404));

export type AppType = typeof app;
export default app;
