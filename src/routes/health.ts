import { Hono } from 'hono';
import type { Env } from '../types';

export const healthRoute = new Hono<{ Bindings: Env }>();

healthRoute.get('/', (c) =>
  c.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  }),
);
