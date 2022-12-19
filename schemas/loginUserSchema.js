const Joi = require("joi");
const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;
const subscriptionPattern = /^(starter|pro|bisuness)$/;

const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string().pattern(subscriptionPattern),
});

module.exports = { loginUserSchema };
