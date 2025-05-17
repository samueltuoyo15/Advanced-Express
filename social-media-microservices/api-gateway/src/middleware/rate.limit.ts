import { Request, Response } from "express"
import Redis from "ioredis"
import RedisStore from "rate-limit-redis"
import { rateLimit } from "express-rate-limit"
import logger from "@/utils/logger"

const redisClient = new Redis(process.env.REDIS_URL!)
const ratLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for ${req.ip || req.socket.remoteAddress}`)
    res.status(429).json({ success: false, message: "Too many requests. Try again later"})
  },
  store: new RedisStore({
    // @ts-expect-error - ioredis type workaround (safe to ignore)
    sendCommand: (...args: string[]) => redisClient.call(...args) 
  })
})


export default ratLimiter