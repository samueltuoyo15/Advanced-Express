import wiston from "wiston"
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
    defaultMeta: { service: "identity-service" },
    transports: [
      new wiston.transports.Console({
        format: wiston.format.combine(
        wiston.format.colourize(),
        wiston.format.simple()
      ),
     }),
     new wiston.format.File({filename: "error.log", level: "error"})
     new wiston.format.File({filename: "combined.log" })
   ],l
})

export default logger 