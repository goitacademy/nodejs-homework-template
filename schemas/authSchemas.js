const Joi = require('joi')

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().required().min(3),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailPattern).required(),
    password: Joi.string().min(3).required()
})

const updateSubSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required()
})

module.exports = {signupSchema, loginSchema, updateSubSchema, emailSchema}