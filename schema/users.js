const Joi = require("joi");

const userRegisterSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const subscriptionSchema = Joi.object({
    subscription : Joi.string().valid('starter', 'pro', 'business').required(),
})

module.exports= {
    userRegisterSchema,
    userLoginSchema,
    subscriptionSchema,
}