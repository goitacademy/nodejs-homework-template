const Joi = require('joi');

const registrationUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(15),
    subscription: Joi.string(),
    token: Joi.string()
});

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(15),
});

module.exports = { registrationUserSchema, loginUserSchema };
