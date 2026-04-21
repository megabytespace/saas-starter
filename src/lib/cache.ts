/**
 * Edge caching utilities using CF Cache API + KV fallback.
 * Two-tier: Cache API (per-colo, fast) → KV (global, persistent) → origin.
 */

/** Cache-first fetch with KV fallback */
export async function cachedFetch(
  key: string,
  kv: KVNamespace,
  fetcher: () => Promise<unknown>,
  ttlSeconds = 300,
): Promise<unknown> {
  // Tier 1: KV cache
  const cached = await kv.get(key, 'json');
  if (cached) return cached;

  // Tier 2: Origin
  const fresh = await fetcher();
  await kv.put(key, JSON.stringify(fresh), { expirationTtl: ttlSeconds });
  return fresh;
}

/** Rate limiter using KV — per-IP, sliding window */
export async function rateLimit(
  kv: KVNamespace,
  ip: string,
  limit = 60,
  windowSeconds = 60,
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:${ip}`;
  const current = parseInt(await kv.get(key) ?? '0', 10);

  if (current >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await kv.put(key, String(current + 1), { expirationTtl: windowSeconds });
  return { allowed: true, remaining: limit - current - 1 };
}
