const Joi = require("joi");

const joiRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  subscription: Joi.string(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
});

module.exports = { joiRegisterSchema, joiLoginSchema };
