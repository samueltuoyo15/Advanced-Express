import express, { Application } from "express"
import helmet from "helmet"
import cors from "cors"
import logger from "@/utils/logger"
import requestLogger from "@/middleware/request.logger"
import errorHandler from "@/middleware/error.handler"
import rateLimit from "@/middleware/rate.limit"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(requestLogger)
app.usse(rateLimit)
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)


app.listen(PORT, () => {
  logger.info(`Api gateway is running on port ${PORT}`)
})

process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled Rejection at:", promise, "reason:", reason)
  process.exit(1)
})