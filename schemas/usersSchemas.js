const Joi = require("joi");

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .pattern(emailRegExp)
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required password field" }),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .required()
    .pattern(emailRegExp)
    .messages({ "any.required": "missing required email field" }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .pattern(emailRegExp)
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required password field" }),
});

const updateUserSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "missing field subscription" }),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  updateUserSubscriptionSchema,
};
