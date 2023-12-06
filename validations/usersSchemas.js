const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.base": "Email field should be a string",
      "string.email": "Invalid email format. Use 'example@mail.com'",
      "string.empty": "Email field cannot be empty",
      "any.required": "Email field is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password field should be a string",
    "string.empty": "Password field cannot be empty",
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password field is required",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.only": "Invalid subscription type. Choose from 'starter', 'pro', or 'business'",
    "any.required": "Subscription field is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.base": "Email field should be a string",
      "string.email": "Invalid email format. Use 'example@mail.com'",
      "string.empty": "Email field cannot be empty",
      "any.required": "Email field is required",
    }),
  password: Joi.string().required().messages({
    "string.base": "Password field should be a string",
    "string.empty": "Password field cannot be empty",
    "any.required": "Password field is required",
  }),
});

const updateUserSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSubscription,
};
