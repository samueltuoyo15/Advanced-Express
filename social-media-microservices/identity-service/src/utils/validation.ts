import joi from "joi"

export const validateRegistration = (data) => {
  const schema = joi.object({
    username: joi.string().min(5).max(15).required(),
    full_name: joi.string().min(5).max(28).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
  })
  return schema.validate(data)
}

export const validateLogin = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
  })
  return schema.validate(data)
}