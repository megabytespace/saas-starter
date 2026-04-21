import { Hono } from 'hono';
import type { Env } from '../types';

export const pagesRoute = new Hono<{ Bindings: Env }>();

/** Serve static HTML pages with dynamic content injection */
pagesRoute.get('/dashboard', async (c) => {
  // TODO: Replace with Angular app or server-rendered dashboard
  return c.html(`<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dashboard — ${c.env.SITE_NAME}</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <nav class="nav">
    <a href="/" class="nav-logo">${c.env.SITE_NAME}</a>
    <div class="nav-links">
      <a href="/">Home</a>
      <a href="/billing/portal" class="btn btn-sm">Billing</a>
    </div>
  </nav>
  <main style="max-width:var(--max-w);margin:0 auto;padding:4rem 2rem;">
    <h1>Dashboard</h1>
    <p style="color:var(--gray);">Welcome back. Your workspace is ready.</p>
    <div class="feature-grid" style="margin-top:2rem;">
      <div class="feature-card"><h3>Usage</h3><p>Track your usage and limits.</p></div>
      <div class="feature-card"><h3>Settings</h3><p>Configure your preferences.</p></div>
      <div class="feature-card"><h3>API Keys</h3><p>Manage your API access.</p></div>
    </div>
  </main>
</body>
</html>`);
});

pagesRoute.get('/privacy', (c) => c.html(`<!DOCTYPE html><html lang="en" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Privacy — ${c.env.SITE_NAME}</title><link rel="stylesheet" href="/styles.css"></head><body><nav class="nav"><a href="/" class="nav-logo">${c.env.SITE_NAME}</a></nav><main style="max-width:800px;margin:0 auto;padding:4rem 2rem;"><h1>Privacy Policy</h1><p style="color:var(--gray);">Last updated: ${new Date().toISOString().split('T')[0]}</p><h2>Data Collection</h2><p>We collect only what's necessary to provide our service: email, usage data, and payment info via Stripe.</p><h2>Analytics</h2><p>We use cookie-free analytics (PostHog, self-hosted). No third-party trackers.</p><h2>Contact</h2><p>hey@megabyte.space</p></main></body></html>`));

pagesRoute.get('/terms', (c) => c.html(`<!DOCTYPE html><html lang="en" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Terms — ${c.env.SITE_NAME}</title><link rel="stylesheet" href="/styles.css"></head><body><nav class="nav"><a href="/" class="nav-logo">${c.env.SITE_NAME}</a></nav><main style="max-width:800px;margin:0 auto;padding:4rem 2rem;"><h1>Terms of Service</h1><p style="color:var(--gray);">Last updated: ${new Date().toISOString().split('T')[0]}</p><h2>Service</h2><p>${c.env.SITE_NAME} provides ${c.env.SITE_DESCRIPTION}.</p><h2>Payment</h2><p>Paid plans are billed monthly via Stripe. Cancel anytime.</p><h2>Contact</h2><p>hey@megabyte.space</p></main></body></html>`));
