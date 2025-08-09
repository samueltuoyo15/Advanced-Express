import express, { Application } from "express"
import helmet from "helmet"
import cors from "cors"
import compression from "compression"
import connectToDb from "@/config/db.config"
import logger from "@/utils/logger"
import requestLogger from "@/middleware/request.logger"
import errorHandler from "@/middleware/error.handler"
import identityService from "@/routes/post.route"
import RateLimitMiddleware from "@/middleware/rate.limiter" 
import { rateLimit } from "express-rate-limit"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(RateLimitMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)
app.use("/api/auth", identityService)
app.use(errorHandler)


app.listen(PORT, () => {
  logger.info(`identity service is running on port ${process.env.IDENTITY_SERVICE_DOMAIN}`)
  logger.info(`Redis Url: ${process.env.REDIS_URL}`)
  connectToDb()
})

process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled Rejection at:", promise, "reason:", reason)
  process.exit(1)
})

process.on("uncaughtException", (error) => {
  logger.error("uncaughtException", error)
  process.exit(1)
})