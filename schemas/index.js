const Joi = require("joi");

// const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),

  // паттерн не працює - потрібно розібратися
  // email: Joi.string().pattern(emailRegexp).required(),
  // email: Joi.string().required(),
  subscription: Joi.string(),
})

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),

  // паттерн не працює - потрібно розібратися
  // email: Joi.string().pattern(emailRegexp).required(),
})

module.exports = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
}