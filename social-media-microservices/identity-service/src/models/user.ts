import mongoose from "mongoose"
import argon2 from "argon2"
import { NextFunction } from "express"
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
  full_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
  profile_picture: {
    type: String,
  }
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }
  password: {
    type: String,
    required: true
  }
  created_at: {
    type: Date
    default: Date.now
  },
},{
  timestamp: true 
})

userSchema.pre("save" async (next: NextFunction) => {
  if(this.isModified("password")){
    try{
      this.password = await argon2.hash(this.password)
    } catch(error){
      throw next(error)
    }
  }
})

userSchema.methods.comparePassword = async (candidatePassword) => {
  try{
    return await argon2.verify(this.password, candidatePassword)
  } catch(error){
    throw error
  }
}

userSchema.index({ email: "text" })

const User = mongoose.model("User", userSchema)
export default User