const Joi = require("joi");

const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;
const subscriptionPattern = /^(starter|pro|bisuness)$/;

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string().pattern(subscriptionPattern).required(),
});

module.exports = { registerUserSchema };
