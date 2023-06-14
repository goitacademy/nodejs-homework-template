const Joi = require("joi");

const newUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `Invalid email format`,
    "any.required": `Missing required email field`,
  }),
  password: Joi.string().required().messages({
    "any.required": `Missing required password field`,
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifyEmailSchema =  Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `Invalid email format`,
    "any.required": `Missing required email field`,
  }),
});

module.exports = { newUserSchema, updateSubscriptionSchema, verifyEmailSchema };
