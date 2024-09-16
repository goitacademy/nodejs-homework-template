const Joi = require('joi');
const {emailRegexp} = require('../constans/users')
const {subscriptionType} =require('../constans/users')

const userRegisterSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription:Joi.string().valid(...subscriptionType),
})

const userLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),   
})

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userEmailSchema,
}