const Joi = require("joi");

const { userSubscription } = require("../subscription");

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(userSubscription))
    .required()
    .messages({
      "any.required": "missing required subscription field",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};
