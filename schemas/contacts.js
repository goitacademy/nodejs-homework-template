const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.only': 'Missing required name field'}),
  email: Joi.string().required().email().messages({'any.only':'Missing required email field'}),
  phone: Joi.string().required().messages({'any.only':'Missing required phone field'})
});

module.exports = addSchema;