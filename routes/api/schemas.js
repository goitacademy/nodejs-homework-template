const joi = require('joi');

exports.newContactSchema = joi.object({
  name: joi
    .string()
    .pattern(/^[a-zA-Z\s'’ʼ-]{3,30}$/)
    .required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^[0-9()+\s-]{10,19}$/)
    .required(),
});

exports.updateContactSchema = joi.object({
  name: joi.string().pattern(/^[a-zA-Z\s'’ʼ-]{3,30}$/),
  phone: joi.string(),
});
