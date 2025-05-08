import { Request, Response } from "express"
import logger from "@/utils/logger"
import { validateRegistration } from "@/utils/validation"

const registerUser = async (req: Request, res: Response) => {
  try {
    const { error } = validateRegistration(req.body)
    if(error){
      logger.warn("Validate Registration Error:", error.details[0].message)
      res.status(422).json({ success: false, message: error.details[0].message })
      return 
    }
    
    const { username, full_name, email, password } = req.body
  } catch (error) {
    
  }
}