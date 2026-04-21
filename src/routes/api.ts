import { Hono } from 'hono';
import type { Env } from '../types';

export const apiRoute = new Hono<{ Bindings: Env }>();

/** Domain-specific API routes — replace with actual features */
apiRoute.get('/', (c) => c.json({ message: 'API ready' }));
