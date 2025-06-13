import { NextFunction } from "express"
import mongoose,  { Document, Model } from "mongoose"
import argon2 from "argon2"

interface IUser extends Document {
  username: string
  full_name: string
  profile_picture?: string
  email: string
  password: string
  created_at: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
},{
  timestamps: true 
})

userSchema.pre("save", async function (next) {
  if(this.isModified("password")){
    try{
      this.password = await argon2.hash(this.password)
      next()
    } catch(error){
      return next(error as Error)
    }
  }
})

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try{
    if(!this.password) return false
    return await argon2.verify(this.password, candidatePassword)
  } catch(error){
    throw error
  }
}

userSchema.index({ username: "text" })


const User = mongoose.model<IUser>("User", userSchema)
export default User



