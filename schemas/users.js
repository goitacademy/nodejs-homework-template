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



module.exports = {
    joiRegisterSchema,
    joiLoginSchema
};