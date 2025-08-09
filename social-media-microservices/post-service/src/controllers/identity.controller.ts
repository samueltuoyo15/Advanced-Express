import { Request, Response } from "express"
import { validateRegistration, validateLogin } from "@/utils/validation"
import User from "@/models/user"
import RefreshToken from "@/models/refresh.token"
import logger from "@/utils/logger"
import { generateTokens } from "@/utils/generateToken"

export const registerUser = async (req: Request, res: Response): Promise<any> => {
 logger.info("User Refgistration hit.....")
  try {
    const { error } = validateRegistration(req.body)
    if(error){
      logger.warn("Validate Registration Error:", error.details[0].message)
      return res.status(422).json({ success: false, message: error.details[0].message })
    }
    
    const { username, full_name, email, password } = req.body
    
    let user = await User.findOne({ $or: [{ email }, {username}]})
    if(user){
      logger.warn("user already registered:")
      return res.status(409).json({ success: false, message: "user already registered" })
      
    }
    user = new User({ username, full_name, email, password })
    user.save()
    logger.warn("user registration successful:", user?._id)
  
    const { accessToken, refreshToken } = await generateTokens(user)
    return res.status(201).json({ 
      success: true,
      message: "User registration successful",
      accessToken,
      refreshToken
    })
  } catch (error) {
    logger.error("register user endpoint Error", error)
    return res.status(409).json({ success: false, message: "Internal Server Error" })
  }
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
 logger.info("User Login endpoint hit....")
  try{
    const { error } = validateLogin(req.body)
      if(error){
      logger.warn("Validate Login Error:", error.details[0].message)
      return res.status(422).json({ success: false, message: error.details[0].message }) 
    }

    const { email, password } = req.body
  
    const user = await User.findOne({ email })
    if(!user){
      logger.warn("failed to login: User does not exist")
      return res.status(404).json({ success: false,  message: "User does not exist"})   
     } 

     const isValidPassword = await user.comparePassword(password)
     if(!isValidPassword) {
     logger.warn("failed to login: User does not exist")
      return res.status(400).json({ success: false,  message: "Invalid Password"})      
     }

     const { accessToken, refreshToken } = await generateTokens(user)
     return res.status(200).json({ 
      success: true,
      message: "Logged In successful",
      userId: user._id,
      accessToken,
      refreshToken
    })
  } catch(error){
    logger.error("Login Endpoint Error", error)
    return res.status(409).json({ success: false, message: "Internal Server Error" })
  }
} 

export const refreshTokenController = async (req: Request, res: Response): Promise<any> => {
  logger.info("Refresh token endpoinit hit....")
  const refreshToken = req.body.refreshToken
  
  try{
    if(!refreshToken){
      logger.warn("Refresh token missing")
      return res.status(400).json({ sucess: false, message: "Refresh token is required"})
    }
    
    const storedToken = await refreshToken.findOne({ token: refreshToken })
    if(!storedToken || storedToken.expiresAt < new Date()) {
      logger.warn("Invalid or expired refresh token")
      return res.status(401).json({ sucess: false, message: "Invalid or expired refresh token"})
    }

    const user = await User.findById(storedToken.user)
    if(!user){
      logger.warn("User not found")
      return res.status(401).json({ sucess: false, message: "User not found"})
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken} = await generateTokens(user)
    await RefreshToken.deleteOne({ _id: storedToken._id })
    res.status(201).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
  } catch(error){
    logger.error("Refresh token endpoint Error", error)
    return res.status(409).json({ success: false, message: "Internal Server Error" })
  }
}

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
  try{
    const refreshToken = req.body
    if(!refreshToken) {
      logger.warn("Invalid or expired refresh token")
      return res.status(400).json({ sucess: false, message: "refresh token is required"})  
    }

    await RefreshToken.deleteOne({ token: refreshToken })
    res.status(200).json({ sucess: true, message: "Logged out succesful"})
  } catch(error){
    logger.error("Error while logging out user", error)
    return res.status(409).json({ success: false, message: "Internal Server Error" })
  }
}