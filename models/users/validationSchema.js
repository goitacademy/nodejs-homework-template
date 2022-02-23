// created by Irina Shushkevych
const Joi = require('joi')

const joiRegisterUser = Joi.object({
  name: Joi.string().min(2).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().optional()
})

const joiLoginUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
})

const joiUpdateSubscription = Joi.object({
  subscription: Joi.string().required()
})

module.exports = { joiLoginUser, joiRegisterUser, joiUpdateSubscription }