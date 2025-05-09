import { Request, Response, NextFunction } from "express"
import { RateLimiterRedis } from "rate-limiter-flexible"
import Redis from "ioredis"
import logger from "@/utils/logger"
import dotenv from "dotenv"
dotenv.config()

export const redisClient = new Redis(process.env.REDIS_URL!)
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: 10,
  duration: 1,
  blockDuration: 60
})

const RateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
 try{
  await rateLimiter.consume(req.ip || "")
  next()
  } catch(error){
    logger.warn(`Rate Limit Exceeded for Ip: ${req?.ip}`)
    res.status(429).json({ success: false, message: "Too many Request. Try again later"})
  }
} 

export default RateLimitMiddleware