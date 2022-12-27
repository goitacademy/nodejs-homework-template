const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string()
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const shemasLoginRegister = {
    registerSchema,
    loginSchema
}

module.exports = shemasLoginRegister;