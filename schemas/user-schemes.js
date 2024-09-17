const Joi = require('joi');

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const userLogInSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  userRegisterSchema,
  userLogInSchema,
};
