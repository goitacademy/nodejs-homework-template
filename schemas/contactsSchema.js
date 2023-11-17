const Joi = require('joi');

const createContactValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
});

const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or('name', 'email', 'phone');

module.exports = {
  createContactValidationSchema,
  updateContactValidationSchema,
};
