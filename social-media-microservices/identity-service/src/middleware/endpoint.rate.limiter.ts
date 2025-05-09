import RedisStore from "rate-limit-redis"
import { redisClient } from "@/middleware/rate.limit"
const sensitiveEndpointsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for ${req?.ip}`)
    res.status(429).message({ success: false, message: "Too many Request. Try again later"})
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.send(...args),
  })
})

export default sensitiveEndpointsRateLimit