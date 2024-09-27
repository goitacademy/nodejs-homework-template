const Joi = require("joi");

const { subscriptionList } = require("../constants/users");

const { emailRegexp } = require("../constants/users");

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `missing required "email" field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `missing required "password" field`,
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `missing required "email" field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `missing required "password" field`,
  }),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required()
    .messages({
      "any.required": `missing required "subscription" field`,
    }),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
};
