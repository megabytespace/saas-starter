import { Hono } from 'hono';
import type { Env } from '../types';

export const authRoute = new Hono<{ Bindings: Env }>();

/** Clerk webhook receiver — verifies signature, syncs user to D1 */
authRoute.post('/webhook', async (c) => {
  // TODO: implement Clerk webhook verification
  // Verify svix signature, upsert user in D1, track PostHog identify
  return c.json({ received: true });
});
