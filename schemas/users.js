const Joi = require("joi");
const { emailRegexp } = require("../constants/email-constants");
const listSubscription = ["starter", "pro", "business"];

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email(emailRegexp).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email(emailRegexp).required(),
  subscription: Joi.string(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...listSubscription)
    .required(),
});
const emailSchema = Joi.object({
  email: Joi.string().email(emailRegexp).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
};
