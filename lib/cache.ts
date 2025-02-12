// lib/cache.ts
import { LRUCache } from "lru-cache"

export type CacheKey = string

const cache = new LRUCache<CacheKey, any>({
  max: 100, // Maximum number of items in the cache
  ttl: 60 * 60 * 1000, // 1 hour (in milliseconds)
})

export const getCached = <T>(key: CacheKey): T | undefined => cache.get(key)

export const setCache = <T>(key: CacheKey, value: T): void => {
  cache.set(key, value)
}

export default cache
