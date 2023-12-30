const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const loginSchemaValidation = Joi.object({
  email: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
});

const signupSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
});

module.exports = {
  contactSchema,
  loginSchemaValidation,
  signupSchemaValidation,
};
