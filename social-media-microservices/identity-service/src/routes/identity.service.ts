import { Router } from "express"
import { registerUser } from "@/controllers/identity.controller"
import sensitiveEndpointsRateLimit from "@/middleware/endpoint.rate.limiter"
const router = Router()

router.post("/register", sensitiveEndpointsRateLimit, registerUser)

export default router