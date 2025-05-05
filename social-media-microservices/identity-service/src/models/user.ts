import mongoose from "mongoose"
import argon2 from "argon2"

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
})