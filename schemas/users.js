const Joi = require("joi");

const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().required(),
});

const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userEmailSchema,
};