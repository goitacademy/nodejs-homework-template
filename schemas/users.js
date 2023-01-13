const bcrypt = require("bcryptjs");
const Joi = require('joi');

const joiRegisterSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string()
})

const joiLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string()
   
})

const verifyEmailSchema = Joi.object({
    email: Joi.string().required(),
})


module.exports = {
    joiRegisterSchema,
    joiLoginSchema,
    verifyEmailSchema
};