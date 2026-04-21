# SPEC — [PROJECT_NAME]

## Acceptance Criteria

### Homepage
- [ ] Loads at PROD_URL with <2.5s LCP
- [ ] H1 with product name, hero with CTA
- [ ] Responsive at 6 breakpoints (375,390,768,1024,1280,1920)
- [ ] axe-core 0 violations
- [ ] Meta title 50-60 chars, description 120-156 chars
- [ ] JSON-LD (Organization, WebSite, WebPage)
- [ ] OG image 1200x630

### Auth
- [ ] Sign up via Clerk (Google + magic email)
- [ ] Sign in redirects to dashboard
- [ ] Clerk webhook syncs user to D1

### Billing
- [ ] Stripe checkout creates subscription
- [ ] Customer portal accessible
- [ ] Webhook updates subscription status in D1
- [ ] Free + Pro ($50/mo) tiers

### API
- [ ] GET /health returns {status,version,timestamp}
- [ ] All POST routes validate with zod
- [ ] Error envelope: {error,code,details}
- [ ] Rate limiting on public endpoints

### Instrumentation
- [ ] Sentry error tracking on all routes
- [ ] PostHog page_view, cta_click, signup, feature_used events
- [ ] GA4 via GTM
- [ ] Health alerts: errors>1%, P95>500ms

### Quality
- [ ] Playwright E2E pass at 6 breakpoints
- [ ] AI vision ≥8/10 all breakpoints
- [ ] Lighthouse A11y≥95 Perf≥75
- [ ] Zero console errors
- [ ] Yoast GREEN
