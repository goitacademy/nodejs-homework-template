const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const resendVerifySchema = Joi.object({ email: Joi.string().required() });

module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  resendVerifySchema,
};
