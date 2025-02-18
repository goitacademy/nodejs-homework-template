const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).required(), 
  favorite: Joi.boolean(),
});

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  contactSchema,
  signupSchema,
  loginSchema
};
