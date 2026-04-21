import { Hono } from 'hono';
import type { Env } from '../types';

export const billingRoute = new Hono<{ Bindings: Env }>();

/** Create Stripe checkout session */
billingRoute.post('/checkout', async (c) => {
  // TODO: implement Stripe checkout
  return c.json({ error: 'Not implemented', code: 'NOT_IMPLEMENTED' }, 501);
});

/** Create Stripe customer portal session */
billingRoute.post('/portal', async (c) => {
  // TODO: implement Stripe portal
  return c.json({ error: 'Not implemented', code: 'NOT_IMPLEMENTED' }, 501);
});

/** Stripe webhook — verify sig, deduplicate, process events */
billingRoute.post('/webhook', async (c) => {
  // TODO: implement Stripe webhook
  return c.json({ received: true });
});
