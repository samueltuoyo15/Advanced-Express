import { Request, Response } from "express"
import { validateRegistration } from "@/utils/validation"
import User from "@/models/User"
import logger from "@/utils/logger"
import generateTokens from "@/utils/generateToken"

export const registerUser = async (req: Request, res: Response) => {
 logger.info("User Refgistration Started")
  try {
    const { error } = validateRegistration(req.body)
    if(error){
      logger.warn("Validate Registration Error:", error.details[0].message)
      res.status(422).json({ success: false, message: error.details[0].message })
      return 
    }
    
    const { username, full_name, email, password } = req.body
    
    let user = await user.findOne({ $or: [{ email }, {username}]})
    if(user){
      logger.warn("user already registered:")
      res.status(409).json({ success: false, message: "user already registered" })
      return 
    }
    user = new User({ username, full_name, email, password })
    user.save()
    logger.warn("user registration successful:", user?._id)
  
    const { accessToken, refreshToken } = await generateTokens(user)
    res.status(201).json({ 
      success: true
      message: "User registration successful"
      accessToken,
      refreshToken
    })
    return 
  } catch (error) {
    logger.error("Internal Server Error", error)
    res.status(409).json({ success: false, message: "Internal Server Error" })
    return 
  }
}