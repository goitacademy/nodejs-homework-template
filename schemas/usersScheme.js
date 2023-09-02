const Joi = require("joi");

const registerScheme = Joi.object({
  name: Joi.string()
    .pattern(/^\w+(\s+\w+)*$/)
    .min(3)
    .max(30)
    .messages({
      "string.base": "Name should be a string",
      "string.pattern.base": "Invalid name format",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name cannot be more than 30 characters",
      "any.required": "Missing required name field",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.email": "Invalid email format",
      "any.required": "Missing required email field",
    }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Missing required password field",
  }),
});

const logInScheme = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.email": "Invalid email format",
      "any.required": "Missing required email field",
    }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Missing required password field",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "string.base": "Subscription must be a string",
      "any.only":
        "Invalid subscription value, allowed values are: 'starter', 'pro', 'business'",
      "any.required": "Field 'subscription' is required",
    }),
});

module.exports = { registerScheme, logInScheme, updateSubscriptionSchema };
