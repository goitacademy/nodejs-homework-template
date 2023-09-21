const Joi = require('joi');

const emailRegexp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing required email field",
    }),
    password: Joi.string().min(6).required().messages({
    "any.required": "Missing required password field",
  }),
})

module.exports = {
    registerSchema,
}