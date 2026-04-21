import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env } from '../types';

export const aiRoute = new Hono<{ Bindings: Env }>();

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  context: z.string().optional(),
});

/** AI chat endpoint using Workers AI — edge inference, no external API */
aiRoute.post('/chat', zValidator('json', chatSchema), async (c) => {
  const { message, context } = c.req.valid('json');

  const systemPrompt = context
    ? `You are a helpful assistant for ${c.env.SITE_NAME}. Context: ${context}`
    : `You are a helpful assistant for ${c.env.SITE_NAME}. ${c.env.SITE_DESCRIPTION}`;

  const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ],
    max_tokens: 1024,
  });

  return c.json({ response: response.response, model: '@cf/meta/llama-3.1-8b-instruct' });
});

/** Embeddings endpoint for semantic search */
aiRoute.post('/embed', zValidator('json', z.object({ text: z.string().min(1) })), async (c) => {
  const { text } = c.req.valid('json');
  const embeddings = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', { text: [text] });
  return c.json({ embeddings: embeddings.data });
});
