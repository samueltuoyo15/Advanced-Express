import mongoose from "mongoose"
import argon2 from "argon2"

const userSchema = new mongoose.Schema({
  username: {
    type: string,
    required: true
  }
})