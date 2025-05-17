import wiston from "winston"
import dotenv from "dotenv"
dotenv.config()

const logger = wiston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: wiston.format.combine(
    wiston.format.timestamp(),
    wiston.format.errors({ stack: true }),
    wiston.format.splat(),
    wiston.format.json()
    ),
    defaultMeta: { service: "api-gateway" },
    transports: [
      new wiston.transports.Console({
        format: wiston.format.combine(
        wiston.format.colorize(),
        wiston.format.simple()
      ),
     }),
     new wiston.transports.File({filename: "error.log", level: "error"}),
     new wiston.transports.File({filename: "combined.log" })
   ],
})

export default logger 