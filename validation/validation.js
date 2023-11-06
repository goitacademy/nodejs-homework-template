
const Joi = require('joi');


const contactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});


const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
});

module.exports = {
  contactSchema,
  userSchema,
};

