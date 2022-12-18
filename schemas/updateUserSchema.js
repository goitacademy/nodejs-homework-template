const Joi = require("joi");

const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegExp),
  password: Joi.string().min(8),
});

module.exports = { updateUserSchema };
