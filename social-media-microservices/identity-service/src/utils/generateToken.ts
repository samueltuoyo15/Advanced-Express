import jwt from "jsonwebtoken"
import crypto from "crypto"
import RefreshToken from "@/models/refresh.token"

export const generateTokens = async (user) => {
  const accessToken = jwt.sign({ 
    userId: user?._id, 
    username: user?. username
  }, process.env.JWT_SECRET_TOKEN, { expiresIn: "10m"})
  
  const refreshToken = crypto.randomBytes(64).toString("hex")
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)
 
  await RefreshToken.create({
    token: refreshToken,
    user: user?._id,
    expiresAt
  })
  
  return { accessToken, refreshToken } 
}
