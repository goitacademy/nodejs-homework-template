const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/\(?([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})/)
    .required(),
});

module.exports = addSchema;