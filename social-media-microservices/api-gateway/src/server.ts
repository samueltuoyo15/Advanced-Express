import express, { Application, Request, Response, NextFunction} from "express"
import helmet from "helmet"
import cors from "cors"
import logger from "@/utils/logger"
import requestLogger from "@/middleware/request.logger"
import errorHandler from "@/middleware/error.handler"
import ratLimiter from "@/middleware/rate.limit"
import proxy from "express-http-proxy"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(requestLogger)
app.use(ratLimiter)
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const proxyOptions = {
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.replace(/^\/v1/, "/api")
  },
  proxyErrorHandler: (err, res, next) => {
    logger.error(`Proxy Error: ${err.message}`)
    res.status(500).json({ message: "Internal Server Error", error: err.message})
  }
}

app.use("/api/v1", proxy(process.env.IDENTITY_SERVICE_DOMAIN, {
  ...proxyOptions,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers["Content-Type"] === "application/json"
    return proxyReqOpts
  },
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    logger.info(`Response Received from identity service: ${proxyRes.statusCode}`)
    return proxyResData
  },
}))
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Api gateway is running on port ${process.env.API_GATEWAY_DOMAIN}`)
  logger.info(`Identity service is running on:  ${process.env.IDENTITY_SERVICE_DOMAIN}`)
  logger.info(`Redis Url: ${process.env.REDIS_URL}`)
})

process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled Rejection at:", promise, "reason:", reason)
  process.exit(1)
})

process.on("uncaughtException", (error) => {
  logger.error("uncaughtException", error)
  process.exit(1)
})
