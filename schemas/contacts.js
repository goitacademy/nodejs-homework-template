const Joi = require('joi');
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^380\d{9}$/)
    .required(),
});

module.exports = { addSchema };
