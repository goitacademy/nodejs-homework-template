const Joi = require("joi");

const { emailRegexp, subscriptionOptions } = require("../constants/users");

const userCheckSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
  subscription: Joi.string().valid(...subscriptionOptions),
  token: Joi.string(),
});

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .required()
    .messages({
      "any.required": "missing required subscription field",
    }),
});

module.exports = { userCheckSchema, subscriptionUpdateSchema };
