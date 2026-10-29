// MixHub 2026 Resilient Caching Layer (Redis + In-Memory Fallback)
import config from "../config/index.js";

class CacheEngine {
  constructor() {
    this.redis = null;
    this.memoryStore = new Map();
    this.init();
  }

  async init() {
    if (config.redis_url) {
      try {
        const { default: Redis } = await import("ioredis");
        this.redis = new Redis(config.redis_url, {
          maxRetriesPerRequest: 1,
          connectTimeout: 2000,
          lazyConnect: true,
        });

        await this.redis.connect();
        console.log("⚡ Connected to Redis Cache Cluster");
      } catch (err) {
        console.warn("⚠️ Redis not reachable, falling back to In-Memory Cache:", err.message);
        this.redis = null;
      }
    } else {
      console.log("📦 Initialized In-Memory Cache Engine (Zero Dependencies)");
    }
  }

  async get(key) {
    if (this.redis) {
      try {
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
      } catch (err) {
        console.warn("Redis GET error, checking memory:", err.message);
      }
    }

    const entry = this.memoryStore.get(key);
    if (!entry) return null;

    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.memoryStore.delete(key);
      return null;
    }

    return entry.value;
  }

  async set(key, value, ttlSeconds = 60) {
    if (this.redis) {
      try {
        await this.redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
        return;
      } catch (err) {
        console.warn("Redis SET error, falling back to memory:", err.message);
      }
    }

    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    this.memoryStore.set(key, { value, expiresAt });
  }

  async del(key) {
    if (this.redis) {
      try {
        await this.redis.del(key);
      } catch {}
    }
    this.memoryStore.delete(key);
  }

  async flushPattern(pattern) {
    // In-memory flush
    for (const key of this.memoryStore.keys()) {
      if (key.includes(pattern)) {
        this.memoryStore.delete(key);
      }
    }

    if (this.redis) {
      try {
        const keys = await this.redis.keys(`*${pattern}*`);
        if (keys.length > 0) {
          await this.redis.del(keys);
        }
      } catch {}
    }
  }
}

export const cache = new CacheEngine();

