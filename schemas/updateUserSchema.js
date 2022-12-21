const Joi = require("joi");

const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;
const subscriptionPattern = /^(starter|pro|bisuness)$/;

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegExp),
  password: Joi.string().min(8),
  subscription: Joi.string().pattern(subscriptionPattern),
});

module.exports = { updateUserSchema };
