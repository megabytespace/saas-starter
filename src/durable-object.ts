import { DurableObject } from 'cloudflare:workers';
import type { Env } from './types';

/**
 * Durable Object for stateful features — rate limiting, real-time collaboration,
 * WebSocket rooms, user sessions, or any operation needing strong consistency.
 *
 * Add to wrangler.toml:
 * [[durable_objects.bindings]] name = "SESSION" class_name = "SessionDO"
 * [[migrations]] tag = "v1" new_classes = ["SessionDO"]
 */
export class SessionDO extends DurableObject<Env> {
  private state: Record<string, unknown> = {};

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  /** Handle HTTP requests to this DO instance */
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/state' && request.method === 'GET') {
      return Response.json(this.state);
    }

    if (url.pathname === '/state' && request.method === 'PUT') {
      const body = await request.json<Record<string, unknown>>();
      this.state = { ...this.state, ...body };
      await this.ctx.storage.put('state', this.state);
      return Response.json({ ok: true });
    }

    return new Response('Not found', { status: 404 });
  }

  /** WebSocket handler for real-time features */
  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    // Broadcast to all connected clients, handle commands, etc.
    const data = typeof message === 'string' ? message : new TextDecoder().decode(message);
    ws.send(JSON.stringify({ echo: data, timestamp: Date.now() }));
  }
}
