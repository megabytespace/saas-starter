import { test, expect } from '@playwright/test';

const PROD_URL = process.env.PROD_URL ?? 'http://localhost:8787';

test('health endpoint returns ok', async ({ request }) => {
  const res = await request.get(`${PROD_URL}/health`);
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.status).toBe('ok');
  expect(body.version).toBeDefined();
  expect(body.timestamp).toBeDefined();
});
