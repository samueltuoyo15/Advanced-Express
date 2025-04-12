import express from "express" 
import { corsConfig } from "./config/corsConfig.ts"
import { requestLogger, addTimestamps } from "./middlewares/customMiddleware.ts"
import { globalErrorHandler } from "./middlewares/errorHandler.ts"
import { urlVersioning } from "./middlewares/urlVersioning.ts"
import { createBasicRateLimiter } from "./middlewares/rateLimit.ts"
import itemsRoute from "./routes/items-route.ts"
const app = express()

app.use(requestLogger)
app.use(addTimestamps)

app.use(corsConfig())
// rate limit 100 requests per 10 minutes 
app.use(createBasicRateLimiter(100, 10 * 60 * 1000))
app.use(express.json())
app.use(urlVersioning("v1"))
app.use("/api/v1", itemsRoute)
app.use(globalErrorHandler)


app.listen(5000, () => console.log("app is running at http://localhost:5000"))