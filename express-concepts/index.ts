import express from "express" 
import { corsConfig } from "./config/corsConfig.ts"
import { requestLogger, addTimestamps } from "./middlewares/customMiddleware.ts"
import { globalErrorHandler } from "./middlewares/errorHandler.ts"
import { urlVersioning } from "./middlewares/urlVersioning.ts"
const app = express()

app.use(requestLogger)
app.use(addTimestamps)

app.use(corsConfig())
app.use(express.json())
app.use("/api/v1", urlVersioning("v1"))
app.use(globalErrorHandler)


app.listen(5000, () => console.log("app is running at http://localhost:5000"))