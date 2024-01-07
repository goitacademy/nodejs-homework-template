const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = { contactSchema, signupSchema, loginSchema };
