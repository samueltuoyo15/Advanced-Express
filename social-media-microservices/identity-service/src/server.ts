import express, { Application } from "express"
import helmet from "helmet"
import cors from "cors"
import connectToDb from "@/config/connect.db"
import logger from "@/utils/logger"
import requestLogger from "@/middleware/request.logger"
import errorHandler from "@/middleware/error.handler"
import identityService from "@/routes/identity.service"
import { RateLimiterRedis } from "rate-limiter-flexible"
import Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()

const redisClient = new Redis()
const app: Application = express()
const PORT = process.env.PORT!

app.use(requestLogger())
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/auth", identityService)
app.use(errorHandler())

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
  await connectToDb()
})