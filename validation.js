const Joi = require("joi")

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const patchUserSchema = Joi.object({
    userId: Joi.string().length(24).required(),
    subscription: Joi.string().valid("starter", "pro", "business").required(),
})

module.exports = { signupSchema, loginSchema, patchUserSchema }