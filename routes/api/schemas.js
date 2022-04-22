const joi = require('joi');

exports.newContactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
});

exports.updateContactSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().required(),
});
