import { Router } from "express"
import { registerUser, loginUser } from "@/controllers/identity.controller"
import sensitiveEndpointsRateLimit from "@/middleware/endpoint.rate.limiter"
const router = Router()

router.post("/register", sensitiveEndpointsRateLimit, registerUser)
router.post("/login", sensitiveEndpointsRateLimit, loginUser)

export default router