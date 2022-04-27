const joi = require('joi');

const contact = joi.object({
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

const updateContact = joi.object({
  name: joi.string().pattern(/^[a-zA-Z\s'’ʼ-]{3,30}$/),
  email: joi.string().email(),
  phone: joi.string(),
});

exports.schema = { contact, updateContact };
