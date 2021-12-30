import { useMiddleware } from '../http/core/middleware'
import { TooManyRequests } from '../utils/http-errors'

interface RateLimitStore {
  [id: string]: {
    [action: string]: [number, number?] // [currentRequests, expireAt]
  }
}

const store: RateLimitStore = {}

export interface RateLimitOptions {
  timeWindow: number
  maxRequests: number
}

export const useRateLimit = ({ timeWindow, maxRequests }: RateLimitOptions) => {
  return useMiddleware(async req => {
    if (req.state.bypassRateLimit) {
      return
    }

    const { routerPath, routerMethod } = req

    const key = req.state.clientId ?? req.ip
    const action = `${routerMethod} ${routerPath}`
    const now = Date.now()

    store[key] ??= {}
    store[key][action] ??= [0]

    const [currentRequests, expireAt] = store[key][action]

    if (currentRequests >= maxRequests) throw new TooManyRequests()
    if (!expireAt || expireAt < now) {
      store[key][action][1] = now + timeWindow
    }
  })
}
