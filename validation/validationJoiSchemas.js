const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(4).max(30).email().required(),
  phone: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^\+|\d[\s\d\-\(\)]*\$/),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().min(4).max(30).email(),
  phone: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^\+|\d[\s\d\-\(\)]*\$/),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const signupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().min(4).email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().min(4).email().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
  signupSchema,
  loginSchema,
  updateSubscriptionSchema,
};
