import type { Env } from './types';

/**
 * CF Queue consumer — processes async jobs
 * Add to wrangler.toml:
 * [[queues.producers]] queue = "PROJECT_NAME-jobs" binding = "JOBS"
 * [[queues.consumers]] queue = "PROJECT_NAME-jobs"
 */
export default {
  async queue(batch: MessageBatch<unknown>, env: Env): Promise<void> {
    for (const msg of batch.messages) {
      try {
        await processMessage(msg.body as Record<string, unknown>, env);
        msg.ack();
      } catch (err) {
        console.error('[queue] Failed:', err);
        msg.retry();
      }
    }
  },
};

/** Route messages by type */
async function processMessage(body: Record<string, unknown>, env: Env): Promise<void> {
  const type = body.type as string;
  switch (type) {
    case 'send_email':
      // Resend transactional email
      break;
    case 'sync_stripe':
      // Sync subscription data
      break;
    case 'generate_report':
      // Async report generation
      break;
    default:
      console.log(`[queue] Unknown message type: ${type}`);
  }
}
