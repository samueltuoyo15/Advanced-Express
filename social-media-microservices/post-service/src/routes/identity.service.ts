import { Router } from "express"
import { registerUser, loginUser, refreshTokenController, logoutUser } from "@/controllers/identity.controller"
//import sensitiveEndpointsRateLimit from "@/middleware/endpoint.rate.limiter"
const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/lrefresh-token", refreshTokenController)
router.post("/logout", logoutUser)

export default router