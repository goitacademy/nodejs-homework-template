const joi = require('joi');

const contactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
});

module.exports = contactSchema;
