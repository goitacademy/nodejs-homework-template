const joi = require('joi');

const updateContactSchema = joi
  .object({
    name: joi.string(),
    email: joi.string().email(),
    phone: joi.string(),
  })
  .or('name', 'email', 'phone');

module.exports = updateContactSchema;
